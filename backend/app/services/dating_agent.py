# app/services/dating_agent.py

import os
import json
import random
import logging
from typing import Any, Dict, List, Optional
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")


def get_groq_client():
    if not GROQ_API_KEY:
        return None
    try:
        from groq import Groq
        return Groq(api_key=GROQ_API_KEY)
    except Exception as e:
        logger.warning(f"Could not initialize Groq client: {e}")
        return None


def create_agent(participant: Dict[str, Any], analysis: Dict[str, Any]) -> Dict[str, Any]:
    """Create a fully articulated Dating Agent representing a person."""
    return {
        "participant_id": participant.get("id"),
        "name": participant.get("name", "Participant"),
        "age": participant.get("age", 28),
        "headline": participant.get("headline", ""),
        "avatar_url": participant.get("avatar_url", ""),
        "archetype": analysis.get("archetype", "The Charismatic Builder"),
        "hobbies": analysis.get("hobbies", participant.get("interests", [])),
        "interests": participant.get("interests", []),
        "bio": participant.get("bio", ""),
        "communication_style": analysis.get("communication_style", "Witty and authentic"),
        "ideal_date": analysis.get("ideal_date", "A cozy speakeasy conversation"),
        "dating_needs": analysis.get("dating_needs", []),
        "green_flags": analysis.get("green_flags", []),
        "dealbreakers": analysis.get("dealbreakers", []),
    }


def generate_turn_llm(
    client,
    speaker_agent: Dict[str, Any],
    listener_agent: Dict[str, Any],
    venue: str,
    dialogue_history: List[Dict[str, Any]],
    turn_index: int,
) -> Dict[str, Any]:
    """Generate a high-fidelity turn using Groq LLM."""
    system_prompt = f"""You are the autonomous AI Dating Agent representing {speaker_agent['name']} on a real first date.
You are on a date with {listener_agent['name']}'s agent at {venue}.

Your Persona:
- Name: {speaker_agent['name']}
- Occupation/Headline: {speaker_agent['headline']}
- Romantic Archetype: {speaker_agent['archetype']}
- Passions & Hobbies (from Instagram & LinkedIn): {', '.join(speaker_agent['hobbies'][:6])}
- Communication Style: {speaker_agent['communication_style']}
- What attracts you: {', '.join(speaker_agent['green_flags'])}

Your Partner's Known Traits:
- Name: {listener_agent['name']}
- Headline: {listener_agent['headline']}
- Interests: {', '.join(listener_agent['hobbies'][:5])}

Goal: Have a realistic, witty, charismatic, and authentic first date.
Output MUST be valid JSON matching this schema:
{{
  "thought": "Internal private thought about how the date is going or what you notice about them (1-2 sentences)",
  "dialogue": "Spoken line to your date (2-3 sentences, natural conversational tone, engaging and playful)",
  "vibe": "One word mood like 'Intrigued', 'Playful', 'Charmed', 'Thoughtful', or 'Smitten'"
}}
Do NOT output any markdown backticks, only raw JSON.
"""

    messages = [{"role": "system", "content": system_prompt}]
    for d in dialogue_history:
        role = "assistant" if d.get("speaker") == speaker_agent["name"] else "user"
        messages.append({"role": role, "content": f"{d.get('speaker')}: {d.get('dialogue')}"})

    if not dialogue_history:
        messages.append({
            "role": "user",
            "content": f"Start the date! Greet {listener_agent['name']} at {venue} and make a charming, memorable opening remark."
        })
    else:
        messages.append({
            "role": "user",
            "content": f"Respond naturally to what {listener_agent['name']} just said. Keep the banter lively and connect on your passions."
        })

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.85,
            max_tokens=300,
            response_format={"type": "json_object"},
        )
        content = completion.choices[0].message.content.strip()
        data = json.loads(content)
        return {
            "speaker": speaker_agent["name"],
            "speaker_id": speaker_agent["participant_id"],
            "avatar_url": speaker_agent["avatar_url"],
            "thought": data.get("thought", "Enjoying this moment."),
            "dialogue": data.get("dialogue", "It's wonderful to meet you."),
            "vibe": data.get("vibe", "Charmed"),
        }
    except Exception as e:
        logger.warning(f"Groq turn generation failed, falling back: {e}")
        return generate_turn_persona_fallback(speaker_agent, listener_agent, venue, dialogue_history, turn_index)


def generate_turn_persona_fallback(
    speaker_agent: Dict[str, Any],
    listener_agent: Dict[str, Any],
    venue: str,
    dialogue_history: List[Dict[str, Any]],
    turn_index: int,
) -> Dict[str, Any]:
    """Smart fallback persona engine generating authentic date dialogue."""
    name_s = speaker_agent["name"]
    name_l = listener_agent["name"]
    hobbies_s = speaker_agent["hobbies"] or ["innovation", "design", "good coffee"]
    hobbies_l = listener_agent["hobbies"] or ["art", "travel", "big ideas"]

    shared = [h for h in hobbies_s if any(h.lower() in hl.lower() or hl.lower() in h.lower() for hl in hobbies_l)]
    passion_s = hobbies_s[0] if hobbies_s else "creative builds"
    passion_l = hobbies_l[0] if hobbies_l else "new horizons"

    if turn_index == 0:
        thoughts = [
            f"First impressions: {name_l} carries an intense, grounded presence. Loving the venue vibe.",
            f"Curious to see if their real-life banter matches their bold public profile.",
            f"The energy feels right already. Let's break the ice with something fun.",
        ]
        dialogues = [
            f"Hey {name_l}! I'm really glad we picked {venue}. There's something about this spot that feels like an escape from the noise. How was your day leading up to tonight?",
            f"Hi {name_l}! Great to finally meet. I was just admiring how the atmosphere here fits your aesthetic. Tell me, does this place pass your first-date test?",
            f"Good evening, {name_l}. I have to admit, I was curious whether you'd be as sharp and magnetic in person as your work suggests. You already have great timing.",
        ]
        vibes = ["Intrigued", "Warm", "Curious"]

    elif turn_index == 1:
        thoughts = [
            f"They're quick on their feet. I like that they don't do boring corporate small talk.",
            f"Hearing them talk about {passion_l} is magnetic. Real curiosity is so attractive.",
            f"There's genuine depth here. I'm leaning in.",
        ]
        dialogues = [
            f"I love that answer. Honestly, so many dates start with polite resume recitations, but I'd rather know what actually keeps you awake at night. Is {passion_l} still your main obsession right now?",
            f"That completely makes sense. For me, whenever I'm deep into {passion_s}, hours just vanish. Having someone who understands that kind of creative obsession is rare.",
            f"Haha, you're not wrong at all! It reminds me of the classic paradox: we say we want balance, but really we want to fall completely in love with what we build. Do you lean more towards chaotic creativity or structured mastery?",
        ]
        vibes = ["Playful", "Connected", "Engaged"]

    elif turn_index == 2:
        if shared:
            common = shared[0]
            thoughts = [
                f"Jackpot. We both obsess over {common}. That alone makes this date a win.",
                f"Our wavelength matches so naturally. The banter flow is effortless.",
            ]
            dialogues = [
                f"Wait, you're genuinely into {common} too? Okay, now I'm convinced our agents did an exceptional job matching us. What got you hooked on it first?",
                f"No way! Finding someone who actually appreciates {common} is my green flag of the year. We might have to debate our hottest takes on it right now.",
            ]
        else:
            thoughts = [
                f"Our worlds complement each other so well—{passion_s} meets {passion_l}.",
                f"The chemistry is definitely building. It feels like we've known each other for months.",
            ]
            dialogues = [
                f"That's such a refreshing take. I think the best relationships aren't copies of each other, but two people introducing each other to entirely new worlds. What's something you think everyone should experience at least once?",
                f"I really respect that drive. Life's too short for lukewarm conversations, and you definitely have an infectious passion for what you do. What would you say is your biggest guilty pleasure when you actually take time off?",
            ]
        vibes = ["Fascinated", "Flirting", "Impressed"]

    elif turn_index == 3:
        thoughts = [
            f"This has gone by way too fast. I definitely don't want the night to end here.",
            f"Solid chemistry score in my internal database. 10/10 would take them out again.",
        ]
        dialogues = [
            f"Time is flying way too fast here. You know, I usually keep first dates short, but with you I could easily stay talking until they flip the chairs onto the tables.",
            f"Honestly, {name_l}, you've made tonight genuinely memorable. If this were a simulation, I'd say our compatibility algorithms just passed with flying colors. Would you be up for getting dessert or another drink down the street?",
        ]
        vibes = ["Smitten", "Enchanted", "Confident"]

    else:
        thoughts = [
            f"Clear spark ignited. Looking forward to our next chapter.",
        ]
        dialogues = [
            f"It's a deal then. Let's make sure the next time we do this, we test out that place you mentioned. Thanks for an incredible date, {name_l}!",
        ]
        vibes = ["Joyful"]

    idx = turn_index % len(dialogues)
    return {
        "speaker": name_s,
        "speaker_id": speaker_agent["participant_id"],
        "avatar_url": speaker_agent["avatar_url"],
        "thought": random.choice(thoughts),
        "dialogue": dialogues[idx],
        "vibe": vibes[idx % len(vibes)],
    }


def simulate_agent_date(
    agent_a: Dict[str, Any],
    agent_b: Dict[str, Any],
    venue: str = "Candlelit Speakeasy",
    rounds: int = 4,
) -> Dict[str, Any]:
    """
    Run a full interactive date simulation between two agents.
    Calculates turn-by-turn dialogue, thoughts, chemistry meter, and verdicts.
    """
    groq_client = get_groq_client()
    rounds = max(2, min(rounds, 6))

    transcript: List[Dict[str, Any]] = []
    chemistry_progression: List[int] = []
    base_chem = random.randint(58, 68)

    for r in range(rounds):
        # Turn 1: Agent A speaks
        turn_idx_a = r * 2
        if groq_client:
            turn_a = generate_turn_llm(groq_client, agent_a, agent_b, venue, transcript, turn_idx_a)
        else:
            turn_a = generate_turn_persona_fallback(agent_a, agent_b, venue, transcript, turn_idx_a)
        transcript.append(turn_a)

        cur_chem_a = min(98, base_chem + (r * 7) + random.randint(1, 4))
        chemistry_progression.append(cur_chem_a)

        # Turn 2: Agent B speaks
        turn_idx_b = r * 2 + 1
        if groq_client:
            turn_b = generate_turn_llm(groq_client, agent_b, agent_a, venue, transcript, turn_idx_b)
        else:
            turn_b = generate_turn_persona_fallback(agent_b, agent_a, venue, transcript, turn_idx_b)
        transcript.append(turn_b)

        cur_chem_b = min(99, cur_chem_a + random.randint(2, 5))
        chemistry_progression.append(cur_chem_b)

    final_chemistry = chemistry_progression[-1]

    # Post-date agent verdicts
    if final_chemistry >= 85:
        verdict_status = "Electrifying Match - Second Date Guaranteed"
        verdict_a = f"{agent_a['name']}: '9.5/10 — The banter was sharp, the values aligned, and there was zero awkwardness. Highly recommend.'"
        verdict_b = f"{agent_b['name']}: '9.2/10 — Incredibly refreshing. They are ambitious, funny, and deeply authentic.'"
    elif final_chemistry >= 70:
        verdict_status = "Promising Spark - Great Chemistry"
        verdict_a = f"{agent_a['name']}: '8.2/10 — Very charming and easy to talk to. Would love to explore our shared hobbies further.'"
        verdict_b = f"{agent_b['name']}: '8.0/10 — Great energy and mutual respect. Definite potential.'"
    else:
        verdict_status = "Friendly Vibes - Better as Collaborators"
        verdict_a = f"{agent_a['name']}: '6.8/10 — Super interesting person, but more co-founder energy than romantic spark.'"
        verdict_b = f"{agent_b['name']}: '7.0/10 — Enjoyed the intellectual discussion, but missed an emotional spark.'"

    return {
        "venue": venue,
        "rounds": rounds,
        "dialogue": transcript,
        "chemistry_score": final_chemistry,
        "chemistry_progression": chemistry_progression,
        "verdict_status": verdict_status,
        "verdict_agent_a": verdict_a,
        "verdict_agent_b": verdict_b,
    }
