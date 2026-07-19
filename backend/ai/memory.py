"""
memory.py
----------------------------------------
Shared memory for AgentX Startup Builder.

Purpose:
- Store the startup context during one generation session.
- Allow all AI agents to read/write shared information.
- Prevent agents from repeating work.
"""

from copy import deepcopy


class AgentMemory:
    def __init__(self):
        self.clear()

    def clear(self):
        """Reset memory for a new startup."""
        self._memory = {
            "user_prompt": "",
            "startup_name": "",
            "industry": "",
            "location": "",
            "target_audience": "",
            "business_model": "",
            "market_research": {},
            "branding": {},
            "finance": {},
            "legal": {},
            "business_plan": {},
            "website": {},
            "social_media": {},
            "competitors": {},
            "pitchdeck": {}
        }

    # -----------------------------
    # Generic Operations
    # -----------------------------

    def set(self, key, value):
        """Store a value."""
        self._memory[key] = value

    def get(self, key, default=None):
        """Retrieve a value."""
        return self._memory.get(key, default)

    def update(self, key, value):
        """
        Update dictionaries.
        """
        if key not in self._memory:
            self._memory[key] = value
            return

        if isinstance(self._memory[key], dict) and isinstance(value, dict):
            self._memory[key].update(value)
        else:
            self._memory[key] = value

    def get_all(self):
        """Return complete memory."""
        return deepcopy(self._memory)

    # -----------------------------
    # Agent Helpers
    # -----------------------------

    def save_market(self, data):
        self.update("market_research", data)

    def save_branding(self, data):
        self.update("branding", data)

    def save_finance(self, data):
        self.update("finance", data)

    def save_legal(self, data):
        self.update("legal", data)

    def save_business_plan(self, data):
        self.update("business_plan", data)

    def save_website(self, data):
        self.update("website", data)

    def save_social_media(self, data):
        self.update("social_media", data)

    def save_competitors(self, data):
        self.update("competitors", data)

    def save_pitchdeck(self, data):
        self.update("pitchdeck", data)

    # -----------------------------
    # Final Startup Report
    # -----------------------------

    def build_final_report(self):
        """
        Returns the complete startup report.
        """
        return deepcopy(self._memory)


# ----------------------------------------------------
# Singleton Memory Instance
# ----------------------------------------------------

memory = AgentMemory()