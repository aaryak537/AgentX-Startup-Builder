"""
===========================================================
AgentX Startup Builder
Startup Generation Route
===========================================================

Handles:
POST /api/startup/generate

Receives:
{
    "idea": "I want to start an AI bakery in Pune"
}

Returns:
{
   success: true,
   startup: {...}
}

Author: AgentX
"""

from flask import Blueprint, request, jsonify

# AI Orchestrator
from agents.orchestrator import generate_complete_startup

startup_bp = Blueprint("startup", __name__)


# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------
@startup_bp.route("/", methods=["GET"])
def startup_home():
    return jsonify({
        "success": True,
        "message": "Startup Generation API Running"
    })


# ---------------------------------------------------------
# Generate Complete Startup
# ---------------------------------------------------------
@startup_bp.route("/generate", methods=["POST"])
def generate_startup():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No JSON data received."
            }), 400

        startup_idea = data.get("idea", "").strip()

        if startup_idea == "":
            return jsonify({
                "success": False,
                "message": "Startup idea is required."
            }), 400

        # ----------------------------------------
        # Call Multi-Agent Orchestrator
        # ----------------------------------------

        result = generate_complete_startup(startup_idea)

        return jsonify({
            "success": True,
            "startup": result
        }), 200

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ---------------------------------------------------------
# Generate Demo Startup
# ---------------------------------------------------------
@startup_bp.route("/demo", methods=["GET"])
def demo():

    demo_data = {

        "startupName": "FreshVerse",

        "tagline": "Healthy Food Delivered Smarter",

        "industry": "FoodTech",

        "problem":
            "Busy professionals struggle to access healthy meals.",

        "solution":
            "AI-powered meal planning and instant healthy food delivery.",

        "targetAudience":
            "Students, Professionals, Fitness Enthusiasts",

        "businessModel":
            "Subscription + Marketplace",

        "estimatedInvestment":
            "₹8,00,000",

        "monthlyRevenue":
            "₹3,50,000",

        "profitMargin":
            "28%",

        "startupScore": 91
    }

    return jsonify({
        "success": True,
        "startup": demo_data
    })


# ---------------------------------------------------------
# Validate Startup Idea
# ---------------------------------------------------------
@startup_bp.route("/validate", methods=["POST"])
def validate_startup():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "valid": False,
                "message": "Missing JSON."
            }), 400

        idea = data.get("idea", "").strip()

        if len(idea) < 10:

            return jsonify({
                "valid": False,
                "message":
                "Startup idea is too short."
            })

        return jsonify({
            "valid": True,
            "message":
            "Startup idea looks good."
        })

    except Exception as e:

        return jsonify({
            "valid": False,
            "message": str(e)
        }), 500


# ---------------------------------------------------------
# Startup Suggestions
# ---------------------------------------------------------
@startup_bp.route("/examples", methods=["GET"])
def startup_examples():

    examples = [

        "AI-powered Bakery in Pune",

        "Electric Vehicle Charging Startup",

        "Online Grocery Delivery",

        "Pet Care Marketplace",

        "AI Resume Builder",

        "Medical Appointment Platform",

        "Drone Farming Service",

        "AI Interior Designer",

        "Fitness Subscription App",

        "Digital Marketing Agency"
    ]

    return jsonify({
        "success": True,
        "examples": examples
    })


# ---------------------------------------------------------
# Startup Categories
# ---------------------------------------------------------
@startup_bp.route("/categories", methods=["GET"])
def startup_categories():

    categories = [

        "Healthcare",

        "Education",

        "Agriculture",

        "AI",

        "Blockchain",

        "Food",

        "Finance",

        "Travel",

        "Retail",

        "Fashion",

        "E-Commerce",

        "SaaS"
    ]

    return jsonify({
        "success": True,
        "categories": categories
    })