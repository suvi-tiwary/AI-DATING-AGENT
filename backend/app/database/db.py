# app/database/db.py

import json
import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator


BACKEND_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BACKEND_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

DATABASE_PATH = DATA_DIR / "dating.db"


def get_connection() -> sqlite3.Connection:
    """Create a database connection with dictionary-like rows."""
    connection = sqlite3.connect(DATABASE_PATH, timeout=30)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


@contextmanager
def get_db() -> Iterator[sqlite3.Connection]:
    """Provide a connection and safely commit or roll back transactions."""
    connection = get_connection()
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def init_db() -> None:
    """Create the database tables if they do not already exist."""
    with get_db() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS participants (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                age INTEGER NOT NULL CHECK (age >= 18),
                linkedin_url TEXT NOT NULL,
                instagram_url TEXT NOT NULL,
                avatar_url TEXT NOT NULL DEFAULT '',
                headline TEXT NOT NULL DEFAULT '',
                occupation TEXT NOT NULL DEFAULT '',
                bio TEXT NOT NULL DEFAULT '',
                interests TEXT NOT NULL DEFAULT '[]',
                preferences TEXT NOT NULL DEFAULT '{}',
                analysis_json TEXT NOT NULL DEFAULT '{}',
                consent_to_participate INTEGER NOT NULL DEFAULT 1,
                consent_to_ai_simulation INTEGER NOT NULL DEFAULT 1,
                profile_verified INTEGER NOT NULL DEFAULT 1,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)

        connection.execute("""
            CREATE TABLE IF NOT EXISTS simulations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                participant_a_id INTEGER NOT NULL,
                participant_b_id INTEGER NOT NULL,
                venue TEXT NOT NULL DEFAULT 'Speakeasy Lounge',
                compatibility_score INTEGER NOT NULL,
                result_json TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (participant_a_id)
                    REFERENCES participants(id) ON DELETE CASCADE,
                FOREIGN KEY (participant_b_id)
                    REFERENCES participants(id) ON DELETE CASCADE,
                CHECK (participant_a_id != participant_b_id)
            )
        """)

        connection.execute("""
            CREATE INDEX IF NOT EXISTS idx_simulations_participants
            ON simulations(participant_a_id, participant_b_id)
        """)


def row_to_participant(row: sqlite3.Row) -> dict[str, Any]:
    """Convert a database row into a Python participant dictionary."""
    participant = dict(row)
    participant["interests"] = json.loads(participant["interests"] or "[]")
    participant["preferences"] = json.loads(participant["preferences"] or "{}")
    participant["analysis"] = json.loads(participant.get("analysis_json") or "{}")
    participant["consent_to_participate"] = bool(participant["consent_to_participate"])
    participant["consent_to_ai_simulation"] = bool(participant["consent_to_ai_simulation"])
    participant["profile_verified"] = bool(participant["profile_verified"])
    return participant


def create_participant(data: dict[str, Any]) -> dict[str, Any]:
    """Save a participant and return their stored profile."""
    name = str(data.get("name", "Anonymous")).strip()
    age = int(data.get("age", 25))
    if age < 18:
        age = 18

    with get_db() as connection:
        cursor = connection.execute(
            """
            INSERT INTO participants (
                name, age, linkedin_url, instagram_url, avatar_url,
                headline, occupation, bio, interests, preferences,
                analysis_json, consent_to_participate,
                consent_to_ai_simulation, profile_verified
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                name,
                age,
                str(data["linkedin_url"]),
                str(data["instagram_url"]),
                str(data.get("avatar_url", "")),
                str(data.get("headline", "")),
                str(data.get("occupation", "")),
                str(data.get("bio", "")).strip(),
                json.dumps(data.get("interests", [])),
                json.dumps(data.get("preferences", {})),
                json.dumps(data.get("analysis", {})),
                1 if data.get("consent_to_participate", True) else 0,
                1 if data.get("consent_to_ai_simulation", True) else 0,
                1 if data.get("profile_verified", True) else 0,
            ),
        )

        participant_id = cursor.lastrowid
        row = connection.execute(
            "SELECT * FROM participants WHERE id = ?",
            (participant_id,),
        ).fetchone()

        return row_to_participant(row)


def update_participant_analysis(participant_id: int, analysis: dict[str, Any]) -> None:
    """Update analyzed data for a participant."""
    with get_db() as connection:
        connection.execute(
            "UPDATE participants SET analysis_json = ? WHERE id = ?",
            (json.dumps(analysis), participant_id),
        )


def get_participant(participant_id: int) -> dict[str, Any] | None:
    """Retrieve one participant by ID."""
    with get_db() as connection:
        row = connection.execute(
            "SELECT * FROM participants WHERE id = ?",
            (participant_id,),
        ).fetchone()

        return row_to_participant(row) if row else None


def list_participants(limit: int = 100) -> list[dict[str, Any]]:
    """List participants ordered by ID ascending."""
    limit = max(1, min(int(limit), 500))

    with get_db() as connection:
        rows = connection.execute(
            """
            SELECT * FROM participants
            ORDER BY id ASC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()

        return [row_to_participant(row) for row in rows]


def count_participants() -> int:
    """Get total participant count."""
    with get_db() as connection:
        cursor = connection.execute("SELECT COUNT(*) FROM participants")
        return cursor.fetchone()[0]


def save_simulation(result: dict[str, Any]) -> int:
    """Persist a simulation result and return its database ID."""
    participants = result["participants"]
    compatibility = result["compatibility"]

    participant_a_id = int(participants[0]["id"])
    participant_b_id = int(participants[1]["id"])
    score = int(compatibility.get("compatibility_score", 50))
    venue = str(result.get("venue", "Speakeasy Lounge"))

    if participant_a_id == participant_b_id:
        raise ValueError("A participant cannot date themselves.")

    with get_db() as connection:
        cursor = connection.execute(
            """
            INSERT INTO simulations (
                participant_a_id, participant_b_id,
                venue, compatibility_score, result_json
            )
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                participant_a_id,
                participant_b_id,
                venue,
                score,
                json.dumps(result),
            ),
        )
        return int(cursor.lastrowid)


def list_simulations(limit: int = 100) -> list[dict[str, Any]]:
    """Retrieve saved simulations, newest first."""
    limit = max(1, min(int(limit), 500))

    with get_db() as connection:
        rows = connection.execute(
            """
            SELECT * FROM simulations
            ORDER BY created_at DESC, id DESC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()

        results = []
        for row in rows:
            item = dict(row)
            item["result"] = json.loads(item.pop("result_json"))
            results.append(item)

        return results


def get_latest_simulation_between(participant_a_id: int, participant_b_id: int) -> dict[str, Any] | None:
    """Find the most recent simulation between two participants if any."""
    with get_db() as connection:
        row = connection.execute(
            """
            SELECT * FROM simulations
            WHERE (participant_a_id = ? AND participant_b_id = ?)
               OR (participant_a_id = ? AND participant_b_id = ?)
            ORDER BY id DESC LIMIT 1
            """,
            (participant_a_id, participant_b_id, participant_b_id, participant_a_id),
        ).fetchone()

        if row:
            item = dict(row)
            item["result"] = json.loads(item.pop("result_json"))
            return item
        return None


def get_simulation_by_id(simulation_id: int) -> dict[str, Any] | None:
    """Retrieve one specific simulation by its ID for replay."""
    with get_db() as connection:
        row = connection.execute(
            "SELECT * FROM simulations WHERE id = ?",
            (simulation_id,),
        ).fetchone()

        if row:
            item = dict(row)
            item["result"] = json.loads(item.pop("result_json"))
            return item
        return None

