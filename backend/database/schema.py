"""
schema.py
Defines the data models used throughout AgentX Startup Builder.
"""

from dataclasses import dataclass, field
from typing import Dict, List
from datetime import datetime


# ==========================
# USER MODEL
# ==========================

@dataclass
class User:
    uid: str
    name: str
    email: str
    password: str

    created_at: str = field(
        default_factory=lambda: datetime.utcnow().isoformat()
    )

    startups: List[str] = field(default_factory=list)

    def to_dict(self):
        return {
            "uid": self.uid,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "created_at": self.created_at,
            "startups": self.startups
        }


# ==========================
# STARTUP MODEL
# ==========================

@dataclass
class Startup:

    startup_id: str

    owner_id: str

    prompt: str

    startup_name: str

    overview: Dict = field(default_factory=dict)

    market: Dict = field(default_factory=dict)

    branding: Dict = field(default_factory=dict)

    finance: Dict = field(default_factory=dict)

    legal: Dict = field(default_factory=dict)

    website: Dict = field(default_factory=dict)

    social_media: Dict = field(default_factory=dict)

    competitors: Dict = field(default_factory=dict)

    pitchdeck: Dict = field(default_factory=dict)

    created_at: str = field(
        default_factory=lambda: datetime.utcnow().isoformat()
    )

    def to_dict(self):
        return {
            "startup_id": self.startup_id,
            "owner_id": self.owner_id,
            "prompt": self.prompt,
            "startup_name": self.startup_name,
            "overview": self.overview,
            "market": self.market,
            "branding": self.branding,
            "finance": self.finance,
            "legal": self.legal,
            "website": self.website,
            "social_media": self.social_media,
            "competitors": self.competitors,
            "pitchdeck": self.pitchdeck,
            "created_at": self.created_at
        }