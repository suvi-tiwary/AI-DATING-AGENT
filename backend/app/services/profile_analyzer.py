# app/services/profile_analyzer.py

import re
from typing import Any, Dict, List


INTEREST_CATEGORIES = {
    "technology_ai": {
        "ai", "artificial intelligence", "machine learning", "coding", "software",
        "startups", "robotics", "algorithms", "crypto", "tech", "hardware", "engineering"
    },
    "fitness_athletics": {
        "gym", "fitness", "running", "workout", "yoga", "jiu-jitsu", "frisbee",
        "sports", "hiking", "cycling", "bouldering", "athletics", "marathon"
    },
    "arts_creativity": {
        "music", "painting", "art", "photography", "dance", "design", "cinematography",
        "violin", "guitar", "movies", "cyberpunk", "fashion", "typography", "watercolor"
    },
    "gastronomy_travel": {
        "coffee", "espresso", "cooking", "food", "restaurants", "wine", "travel",
        "nomad", "exploring", "street food", "culinary", "baking"
    },
    "philosophy_reading": {
        "reading", "books", "philosophy", "history", "writing", "scifi", "sci-fi",
        "neuroscience", "physics", "literature", "dostoyevsky", "space"
    },
    "entrepreneurship_venture": {
        "founder", "ceo", "investing", "venture capital", "startups", "bootstrapping",
        "scaling", "leadership", "innovation", "product", "business"
    },
}


def infer_archetype(categories: List[str], headline: str, bio: str) -> str:
    """Infer a distinctive romantic archetype from career and lifestyle attributes."""
    combined = f"{headline} {bio} {' '.join(categories)}".lower()

    if "ai" in combined or "robotics" in combined or "founder" in combined:
        return "The Visionary Architect"
    if "art" in combined or "music" in combined or "cyberpunk" in combined:
        return "The Avant-Garde Maverick"
    if "jiu-jitsu" in combined or "philosophy" in combined or "dostoyevsky" in combined:
        return "The Thoughtful Polymath"
    if "ultimate frisbee" in combined or "cinematography" in combined or "cars" in combined:
        return "The Dynamic High-Performer"
    if "nomad" in combined or "bootstrapping" in combined:
        return "The Free-Spirited Builder"
    if "design" in combined or "typography" in combined or "minimalist" in combined:
        return "The Aesthetic Purist"
    return "The Passionate Innovator"


def generate_vibe_radar(categories: List[str], interests: List[str]) -> Dict[str, int]:
    """Generate normalized 0-100 radar scores for dating personality dimensions."""
    all_text = " ".join(interests).lower()

    ambition = 85
    if any(k in all_text for k in ["founder", "ceo", "ai", "scale", "investing", "billionaire"]):
        ambition = 96

    creativity = 75
    if any(k in all_text for k in ["music", "art", "design", "cinematography", "cyberpunk", "writing"]):
        creativity = 95
    elif "technology_ai" in categories:
        creativity = 84

    intellect = 88
    if any(k in all_text for k in ["philosophy", "math", "neuroscience", "ai", "physics", "dostoyevsky"]):
        intellect = 98

    playfulness = 70
    if any(k in all_text for k in ["frisbee", "comedy", "laugh", "sneakers", "dj", "arcade", "travel"]):
        playfulness = 92

    spontaneity = 72
    if any(k in all_text for k in ["nomad", "travel", "road trips", "hiking", "spontaneous"]):
        spontaneity = 90

    romanticism = 78
    if any(k in all_text for k in ["espresso", "cinema", "guitar", "poetry", "stargazing", "vinyl"]):
        romanticism = 92

    return {
        "ambition": min(ambition, 100),
        "creativity": min(creativity, 100),
        "intellectual_depth": min(intellect, 100),
        "playfulness": min(playfulness, 100),
        "spontaneity": min(spontaneity, 100),
        "romanticism": min(romanticism, 100),
    }


def analyze_profile(participant: Dict[str, Any]) -> Dict[str, Any]:
    """
    Build a comprehensive dating intelligence analysis combining
    the participant's LinkedIn and public Instagram profiles.
    """
    name = participant.get("name", "Participant")
    bio = str(participant.get("bio", "")).strip()
    headline = str(participant.get("headline", "")).strip()
    raw_interests = participant.get("interests", [])
    if isinstance(raw_interests, str):
        try:
            import json
            raw_interests = json.loads(raw_interests)
        except Exception:
            raw_interests = [i.strip() for i in raw_interests.split(",") if i.strip()]

    interests = list(dict.fromkeys([str(i).strip() for i in raw_interests if str(i).strip()]))
    combined_text = f"{headline} {bio} {' '.join(interests)}".lower()

    # Determine matched categories
    matched_categories = []
    for cat_name, keywords in INTEREST_CATEGORIES.items():
        if any(re.search(rf"\b{re.escape(k)}\b", combined_text) for k in keywords):
            matched_categories.append(cat_name)

    if not matched_categories:
        matched_categories = ["technology_ai", "gastronomy_travel"]

    archetype = infer_archetype(matched_categories, headline, bio)
    radar = generate_vibe_radar(matched_categories, interests)

    # Inferred dating parameters
    hobbies = [i for i in interests if not any(w in i.lower() for w in ["founder", "ceo", "company", "director"])]
    if not hobbies:
        hobbies = ["Exploring specialty coffee", "Weekend trail walks", "Curating playlists", "Reading philosophy"]

    dating_needs = [
        "A partner who has their own fierce ambitions and independent passions",
        "Intellectual curiosity and the ability to hold deep 2 AM conversations",
        "Witty banter with emotional grounding and mutual authenticity",
    ]

    ideal_date = (
        f"A quiet corner at a dimly lit speakeasy or vinyl listening lounge, discussing "
        f"{interests[0] if interests else 'big ideas'} over artisan drinks, followed by an unplanned evening stroll."
    )

    communication_style = (
        "Articulate and intellectually playful. Enjoys fast-paced repartee, thoughtful pauses, "
        "and exchanging unconventional perspectives rather than small talk."
    )

    green_flags = [
        "Passionate about creating things that matter",
        "Has high taste in music, design, or literature",
        "Can laugh at absurd situations without taking themselves too seriously",
    ]

    dealbreakers = [
        "Cynicism or lack of ambition",
        "Superficial small talk that never goes below the surface",
        "Inability to respect intense focus on work and passions",
    ]

    conversation_starters = [
        f"What is a conviction you hold about {interests[0] if interests else 'the future'} that few people agree with?",
        "If you had 48 hours in a city with zero obligations, what's your exact itinerary?",
        "What piece of art, music, or technology recently gave you genuine goosebumps?",
    ]

    return {
        "participant_id": participant.get("id"),
        "name": name,
        "archetype": archetype,
        "headline": headline or participant.get("occupation", "Visionary Leader"),
        "hobbies": hobbies[:8],
        "interests": interests[:10],
        "interest_categories": matched_categories,
        "radar": radar,
        "dating_needs": dating_needs,
        "ideal_date": ideal_date,
        "communication_style": communication_style,
        "green_flags": green_flags,
        "dealbreakers": dealbreakers,
        "conversation_starters": conversation_starters,
        "sources": {
            "linkedin": participant.get("linkedin_url"),
            "instagram": participant.get("instagram_url"),
            "data_extract": "Synthesized exclusively from public LinkedIn and public Instagram profiles.",
        },
    }
