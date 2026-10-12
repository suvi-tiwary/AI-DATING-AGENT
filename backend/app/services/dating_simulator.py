# app/services/dating_simulator.py

from typing import Any, Dict
from app.services.dating_agent import create_agent, simulate_agent_date
from app.services.profile_analyzer import analyze_profile
from app.services.ranking_engine import calculate_compatibility
from app.database.db import save_simulation


def run_dating_simulation(
    participant_a: Dict[str, Any],
    participant_b: Dict[str, Any],
    venue: str = "Candlelit Speakeasy Lounge",
    rounds: int = 4,
) -> Dict[str, Any]:
    """
    Run an end-to-end dating simulation between two participants.
    Analyzes their profiles, simulates the live conversation, computes compatibility,
    and persists the result in the database.
    """
    if participant_a.get("id") == participant_b.get("id"):
        raise ValueError("A participant cannot go on a date with themselves.")

    profile_a = participant_a.get("analysis") or analyze_profile(participant_a)
    profile_b = participant_b.get("analysis") or analyze_profile(participant_b)

    profile_a["age"] = participant_a.get("age")
    profile_b["age"] = participant_b.get("age")
    profile_a["avatar_url"] = participant_a.get("avatar_url")
    profile_b["avatar_url"] = participant_b.get("avatar_url")

    compatibility = calculate_compatibility(profile_a, profile_b)

    agent_a = create_agent(participant_a, profile_a)
    agent_b = create_agent(participant_b, profile_b)

    sim_result = simulate_agent_date(
        agent_a=agent_a,
        agent_b=agent_b,
        venue=venue,
        rounds=rounds,
    )

    combined_score = round((compatibility["compatibility_score"] * 0.6) + (sim_result["chemistry_score"] * 0.4))
    compatibility["compatibility_score"] = combined_score

    result_payload = {
        "participants": [
            {
                "id": participant_a.get("id"),
                "name": participant_a.get("name", "Participant A"),
                "avatar_url": participant_a.get("avatar_url"),
                "headline": participant_a.get("headline"),
                "linkedin_url": participant_a.get("linkedin_url"),
                "instagram_url": participant_a.get("instagram_url"),
            },
            {
                "id": participant_b.get("id"),
                "name": participant_b.get("name", "Participant B"),
                "avatar_url": participant_b.get("avatar_url"),
                "headline": participant_b.get("headline"),
                "linkedin_url": participant_b.get("linkedin_url"),
                "instagram_url": participant_b.get("instagram_url"),
            },
        ],
        "venue": venue,
        "compatibility": compatibility,
        "date_simulation": sim_result,
        "dialogue": sim_result["dialogue"],
        "chemistry_score": sim_result["chemistry_score"],
        "chemistry_progression": sim_result["chemistry_progression"],
        "verdict_status": sim_result["verdict_status"],
        "verdict_agent_a": sim_result["verdict_agent_a"],
        "verdict_agent_b": sim_result["verdict_agent_b"],
        "simulation_type": "autonomous_dating_agent",
    }

    try:
        sim_id = save_simulation(result_payload)
        result_payload["simulation_id"] = sim_id
    except Exception:
        pass

    return result_payload
