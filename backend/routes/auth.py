"""
===========================================================
AgentX Startup Builder
File: backend/routes/auth.py

Purpose:
Handles Firebase Authentication verification.

Author: AgentX Team
===========================================================
"""

from flask import Blueprint, request, jsonify
from firebase_admin import auth
from functools import wraps

# --------------------------------------------
# Blueprint
# --------------------------------------------

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


# --------------------------------------------
# Verify Firebase Token Decorator
# --------------------------------------------

def verify_token(f):
    """
    Decorator to verify Firebase ID Token
    before allowing access to protected routes.
    """

    @wraps(f)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({
                "success": False,
                "message": "Authorization header missing."
            }), 401

        if not auth_header.startswith("Bearer "):
            return jsonify({
                "success": False,
                "message": "Invalid authorization format."
            }), 401

        token = auth_header.split("Bearer ")[1]

        try:
            decoded_token = auth.verify_id_token(token)

            request.user = decoded_token

        except Exception as e:

            return jsonify({
                "success": False,
                "message": "Invalid or expired token.",
                "error": str(e)
            }), 401

        return f(*args, **kwargs)

    return decorated


# --------------------------------------------
# Verify Current User
# --------------------------------------------

@auth_bp.route("/verify", methods=["GET"])
@verify_token
def verify():

    user = request.user

    return jsonify({

        "success": True,

        "user": {

            "uid": user.get("uid"),

            "email": user.get("email"),

            "name": user.get("name"),

            "picture": user.get("picture")

        }

    })


# --------------------------------------------
# User Profile
# --------------------------------------------

@auth_bp.route("/profile", methods=["GET"])
@verify_token
def profile():

    user = request.user

    return jsonify({

        "success": True,

        "profile": {

            "uid": user.get("uid"),

            "email": user.get("email"),

            "displayName": user.get("name"),

            "photoURL": user.get("picture"),

            "emailVerified": user.get("email_verified")

        }

    })


# --------------------------------------------
# Protected Test Route
# --------------------------------------------

@auth_bp.route("/protected", methods=["GET"])
@verify_token
def protected():

    return jsonify({

        "success": True,

        "message": "Authentication Successful",

        "user": request.user

    })


# --------------------------------------------
# Logout
# --------------------------------------------

@auth_bp.route("/logout", methods=["POST"])
@verify_token
def logout():

    """
    Firebase logout happens on frontend.

    This endpoint exists for future logging,
    analytics, audit, etc.
    """

    return jsonify({

        "success": True,

        "message": "Logout successful."

    })


# --------------------------------------------
# Health Check
# --------------------------------------------

@auth_bp.route("/health", methods=["GET"])
def health():

    return jsonify({

        "success": True,

        "service": "Authentication API",

        "status": "Running"

    })