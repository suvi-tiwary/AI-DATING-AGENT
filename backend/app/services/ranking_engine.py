# app/services/ranking_engine.py

from typing import Any, Dict, List


def _normalize(value: Any) -> str:
    return str(value).strip().lower()


def _jaccard_similarity(first: set[str], second: set[str]) -> float:
    """Return the overlap between two sets, from 0.0 to 1.0."""
    if not first and not second:
        return 0.0
    union = first | second
    if not union:
        return 0.0
    return len(first & second) / len(union)


def calculate_compatibility(
    profile_a: Dict[str, Any],
    profile_b: Dict[str, Any],
) -> Dict[str, Any]:
    """
    Score two analyzed profiles on a 0–100 scale using LinkedIn career synergy,
    Instagram lifestyle alignment, vibe radar harmony, and mutual interests.
    """
    interests_a = {
        _normalize(item)
        for item in profile_a.get("interests", [])
        if _normalize(item)
    }
    interests_b = {
        _normalize(item)
        for item in profile_b.get("interests", [])
        if _normalize(item)
    }

    categories_a = {
        _normalize(item)
        for item in profile_a.get("interest_categories", [])
        if _normalize(item)
    }
    categories_b = {
        _normalize(item)
        for item in profile_b.get("interest_categories", [])
        if _normalize(item)
    }

    interest_sim = _jaccard_similarity(interests_a, interests_b)
    category_sim = _jaccard_similarity(categories_a, categories_b)

    # Radar harmony check
    radar_a = profile_a.get("radar", {})
    radar_b = profile_b.get("radar", {})

    radar_diff_sum = 0
    radar_dims = ["ambition", "creativity", "intellectual_depth", "playfulness", "spontaneity", "romanticism"]
    for dim in radar_dims:
        val_a = radar_a.get(dim, 75)
        val_b = radar_b.get(dim, 75)
        radar_diff_sum += abs(val_a - val_b)

    # Smaller difference in core values = higher harmony
    radar_harmony = max(0.0, 1.0 - (radar_diff_sum / (len(radar_dims) * 60)))

    # Archetype synergy bonus
    archetype_a = profile_a.get("archetype", "")
    archetype_b = profile_b.get("archetype", "")
    synergy_bonus = 0.05 if archetype_a != archetype_b else 0.02

    # Overall weighted score
    raw_score = (
        0.45 * (interest_sim * 1.5 if interest_sim > 0 else 0.3)
        + 0.30 * (category_sim * 1.3 if category_sim > 0 else 0.4)
        + 0.20 * radar_harmony
        + 0.05 + synergy_bonus
    )

    score = min(99, max(52, round(raw_score * 100)))

    shared_interests = sorted(list(interests_a & interests_b))
    shared_categories = sorted(list(categories_a & categories_b))

    reasons = []
    if shared_interests:
        reasons.append(f"Strong passion overlap in: {', '.join(shared_interests[:4])}.")
    if shared_categories:
        reasons.append(f"Complementary lifestyle domains across: {', '.join(shared_categories[:3])}.")

    reasons.append(
        f"Vibe synergy: {profile_a.get('name', 'Agent A')} ({archetype_a}) balances {profile_b.get('name', 'Agent B')} ({archetype_b}) with aligned values."
    )

    friction_points = []
    if abs(radar_a.get("spontaneity", 70) - radar_b.get("spontaneity", 70)) > 20:
        friction_points.append("Differing levels of spontaneity vs structured planning.")
    if abs(radar_a.get("ambition", 80) - radar_b.get("ambition", 80)) > 25:
        friction_points.append("Pace of career commitments may require intentional time boundaries.")
    if not friction_points:
        friction_points.append("Minimal friction predicted; strong baseline chemistry.")

    return {
        "participant_a_id": profile_a.get("participant_id"),
        "participant_b_id": profile_b.get("participant_id"),
        "compatibility_score": score,
        "shared_interests": shared_interests,
        "shared_categories": shared_categories,
        "radar_harmony": round(radar_harmony * 100),
        "reasons": reasons,
        "friction_points": friction_points,
    }


def rank_matches_for_participant(
    target: Dict[str, Any],
    all_participants: List[Dict[str, Any]],
) -> List[Dict[str, Any]]:
    """Rank all potential matches for a target participant from highest to lowest score."""
    target_profile = target.get("analysis") or target
    target_id = target.get("id")

    ranked = []
    for candidate in all_participants:
        cand_id = candidate.get("id")
        if cand_id == target_id:
            continue

        cand_profile = candidate.get("analysis") or candidate
        comp = calculate_compatibility(target_profile, cand_profile)
        ranked.append({
            "candidate_id": cand_id,
            "candidate_name": candidate.get("name"),
            "candidate_avatar": candidate.get("avatar_url"),
            "candidate_headline": candidate.get("headline"),
            "candidate_linkedin": candidate.get("linkedin_url"),
            "candidate_instagram": candidate.get("instagram_url"),
            "compatibility_score": comp["compatibility_score"],
            "shared_interests": comp["shared_interests"],
            "reasons": comp["reasons"],
            "friction_points": comp["friction_points"],
        })

    return sorted(ranked, key=lambda x: x["compatibility_score"], reverse=True)


def build_full_compatibility_matrix(participants: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Compute the full pairwise compatibility matrix for all participants."""
    matrix = {}
    participant_meta = []

    for p in participants:
        p_id = p.get("id")
        participant_meta.append({
            "id": p_id,
            "name": p.get("name"),
            "avatar_url": p.get("avatar_url"),
            "headline": p.get("headline"),
            "archetype": (p.get("analysis") or {}).get("archetype", "Builder"),
        })

    for p1 in participants:
        id1 = str(p1.get("id"))
        matrix[id1] = {}
        for p2 in participants:
            id2 = str(p2.get("id"))
            if id1 == id2:
                matrix[id1][id2] = 100
            else:
                profile1 = p1.get("analysis") or p1
                profile2 = p2.get("analysis") or p2
                comp = calculate_compatibility(profile1, profile2)
                matrix[id1][id2] = comp["compatibility_score"]

    return {
        "participants": participant_meta,
        "matrix": matrix,
    }
