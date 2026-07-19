"""
db.py
Simple JSON database layer for AgentX Startup Builder.
"""

import json
import uuid
from pathlib import Path

from schema import User, Startup


# ==========================================
# DATABASE FILE PATHS
# ==========================================

BASE_DIR = Path(__file__).resolve().parent

USERS_FILE = BASE_DIR / "users.json"
STARTUPS_FILE = BASE_DIR / "startups.json"


# ==========================================
# FILE INITIALIZATION
# ==========================================

def initialize_database():
    """
    Creates database files if they don't exist.
    """

    if not USERS_FILE.exists():
        USERS_FILE.write_text("[]", encoding="utf-8")

    if not STARTUPS_FILE.exists():
        STARTUPS_FILE.write_text("[]", encoding="utf-8")


initialize_database()


# ==========================================
# INTERNAL HELPERS
# ==========================================

def _read_json(file_path):

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)

    except Exception:
        return []


def _write_json(file_path, data):

    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)


# ==========================================
# USER FUNCTIONS
# ==========================================

def create_user(name, email, password):

    users = _read_json(USERS_FILE)

    for user in users:
        if user["email"].lower() == email.lower():
            return None

    new_user = User(
        uid=str(uuid.uuid4()),
        name=name,
        email=email,
        password=password
    )

    users.append(new_user.to_dict())

    _write_json(USERS_FILE, users)

    return new_user.to_dict()


def get_user_by_email(email):

    users = _read_json(USERS_FILE)

    for user in users:

        if user["email"].lower() == email.lower():

            return user

    return None


def get_user_by_id(uid):

    users = _read_json(USERS_FILE)

    for user in users:

        if user["uid"] == uid:

            return user

    return None


def update_user(user_object):

    users = _read_json(USERS_FILE)

    for index, user in enumerate(users):

        if user["uid"] == user_object["uid"]:

            users[index] = user_object

            _write_json(USERS_FILE, users)

            return True

    return False


# ==========================================
# STARTUP FUNCTIONS
# ==========================================

def create_startup(owner_id, prompt, startup_name):

    startups = _read_json(STARTUPS_FILE)

    startup = Startup(
        startup_id=str(uuid.uuid4()),
        owner_id=owner_id,
        prompt=prompt,
        startup_name=startup_name
    )

    startups.append(startup.to_dict())

    _write_json(STARTUPS_FILE, startups)

    return startup.to_dict()


def get_startup(startup_id):

    startups = _read_json(STARTUPS_FILE)

    for startup in startups:

        if startup["startup_id"] == startup_id:

            return startup

    return None


def get_user_startups(owner_id):

    startups = _read_json(STARTUPS_FILE)

    return [

        startup

        for startup in startups

        if startup["owner_id"] == owner_id

    ]


def update_startup(updated_startup):

    startups = _read_json(STARTUPS_FILE)

    for index, startup in enumerate(startups):

        if startup["startup_id"] == updated_startup["startup_id"]:

            startups[index] = updated_startup

            _write_json(STARTUPS_FILE, startups)

            return True

    return False


def delete_startup(startup_id):

    startups = _read_json(STARTUPS_FILE)

    filtered = [

        startup

        for startup in startups

        if startup["startup_id"] != startup_id

    ]

    _write_json(STARTUPS_FILE, filtered)


# ==========================================
# DASHBOARD FUNCTIONS
# ==========================================

def total_users():

    return len(_read_json(USERS_FILE))


def total_startups():

    return len(_read_json(STARTUPS_FILE))