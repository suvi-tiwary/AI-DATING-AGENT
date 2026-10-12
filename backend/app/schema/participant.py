# app/schema/participant.py

from typing import Any, Optional
from pydantic import BaseModel, Field, HttpUrl, field_validator, model_validator


class ParticipantIngest(BaseModel):
    linkedin_url: str = Field(description="Direct LinkedIn public profile URL")
    instagram_url: str = Field(description="Direct public Instagram profile URL")
    name: Optional[str] = Field(default=None, description="Optional override for name")
    age: Optional[int] = Field(default=None, ge=18, le=100, description="Optional age")
    consent_to_participate: bool = Field(default=True)
    consent_to_ai_simulation: bool = Field(default=True)

    @field_validator("linkedin_url", "instagram_url")
    @classmethod
    def clean_url(cls, v: str) -> str:
        v = v.strip()
        if not v.startswith("http://") and not v.startswith("https://"):
            v = f"https://{v}"
        return v


class ParticipantCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    age: int = Field(ge=18, le=100)
    linkedin_url: str
    instagram_url: str
    avatar_url: str = Field(default="")
    headline: str = Field(default="")
    occupation: str = Field(default="")
    bio: str = Field(default="", max_length=3000)
    interests: list[str] = Field(default_factory=list, max_length=50)
    preferences: dict[str, Any] = Field(default_factory=dict)
    analysis: dict[str, Any] = Field(default_factory=dict)
    consent_to_participate: bool = True
    consent_to_ai_simulation: bool = True


class ParticipantResponse(BaseModel):
    id: int
    name: str
    age: int
    headline: str = ""
    occupation: str = ""
    avatar_url: str = ""
    bio: str
    interests: list[str]
    preferences: dict[str, Any]
    analysis: dict[str, Any]
    linkedin_url: str
    instagram_url: str
    profile_verified: bool = True
    created_at: Optional[str] = None


class DateRequest(BaseModel):
    participant_a_id: int
    participant_b_id: int
    venue: Optional[str] = Field(default="Candlelit Speakeasy", description="Date location")
    rounds: Optional[int] = Field(default=4, ge=2, le=8, description="Number of conversation turns")

    @model_validator(mode="after")
    def require_different_participants(self):
        if self.participant_a_id == self.participant_b_id:
            raise ValueError("A participant cannot date themselves.")
        return self


class RankRequest(BaseModel):
    participant_id: int
