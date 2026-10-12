# app/services/profile_ingestion.py

import re
from urllib.parse import urlparse


ALLOWED_DOMAINS = {
    "linkedin": {"linkedin.com", "www.linkedin.com"},
    "instagram": {"instagram.com", "www.instagram.com"},
}


def validate_profile_url(url: str, platform: str) -> str:
    """Validate and normalize a LinkedIn or Instagram profile URL."""

    if platform not in ALLOWED_DOMAINS:
        raise ValueError("Unsupported social platform.")

    parsed = urlparse(url.strip())
    hostname = (parsed.hostname or "").lower()

    if parsed.scheme != "https":
        raise ValueError("Profile URLs must use HTTPS.")

    if hostname not in ALLOWED_DOMAINS[platform]:
        raise ValueError(
            f"Please provide a valid {platform.title()} URL."
        )

    if parsed.username or parsed.password:
        raise ValueError("URLs containing credentials are not allowed.")

    path = parsed.path.rstrip("/")

    if platform == "linkedin":
        valid_path = bool(
            re.fullmatch(r"/in/[^/]+|/pub/[^/]+", path)
        )
    else:
        valid_path = bool(
            re.fullmatch(r"/[A-Za-z0-9._]+", path)
        )

    if not valid_path:
        raise ValueError(
            f"Please provide a direct {platform.title()} profile URL."
        )

    return f"https://{hostname}{path}"


def prepare_profile(data: dict) -> dict:
    """Prepare participant-provided data for downstream AI services."""

    linkedin_url = validate_profile_url(
        str(data["linkedin_url"]),
        "linkedin",
    )

    instagram_url = validate_profile_url(
        str(data["instagram_url"]),
        "instagram",
    )

    interests = list(
        dict.fromkeys(
            interest.strip().lower()
            for interest in data.get("interests", [])
            if isinstance(interest, str) and interest.strip()
        )
    )

    return {
        **data,
        "linkedin_url": linkedin_url,
        "instagram_url": instagram_url,
        "interests": interests,
        "bio": data.get("bio", "").strip(),
        "preferences": data.get("preferences", {}),
        "profile_source": "participant_submitted",
        "profile_verified": False,
    }