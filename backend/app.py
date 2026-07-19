"""
===========================================================
AgentX Startup Builder
Main Flask Application
===========================================================

Author : Team AgentX
Project: AgentX Startup Builder
Backend: Flask + OpenRouter + Firebase
"""

from flask import Flask, jsonify
from flask_cors import CORS

# --------------------------------------------------------
# Import Route Blueprints
# --------------------------------------------------------

from routes.auth import auth_bp
from routes.startup import startup_bp
from routes.agents import agents_bp
from routes.export import export_bp


# --------------------------------------------------------
# Create Flask App
# --------------------------------------------------------

app = Flask(__name__)

# Secret Key
app.config["SECRET_KEY"] = "agentx_secret_key_change_this"

# Enable CORS
CORS(app)

# Maximum Upload Size (10 MB)
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024


# --------------------------------------------------------
# Register Blueprints
# --------------------------------------------------------

app.register_blueprint(auth_bp, url_prefix="/api/auth")

app.register_blueprint(startup_bp, url_prefix="/api/startup")

app.register_blueprint(agents_bp, url_prefix="/api/agents")

app.register_blueprint(export_bp, url_prefix="/api/export")


# --------------------------------------------------------
# Root Endpoint
# --------------------------------------------------------

@app.route("/")
def home():
    return jsonify({
        "project": "AgentX Startup Builder",
        "version": "1.0",
        "status": "Running",
        "backend": "Flask",
        "team": "AgentX"
    })


# --------------------------------------------------------
# Health Check
# --------------------------------------------------------

@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "server": "running"
    })


# --------------------------------------------------------
# Error Handlers
# --------------------------------------------------------

@app.errorhandler(404)
def page_not_found(error):
    return jsonify({
        "success": False,
        "message": "Endpoint not found"
    }), 404


@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({
        "success": False,
        "message": "Internal Server Error"
    }), 500


@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "success": False,
        "message": "Bad Request"
    }), 400


# --------------------------------------------------------
# Run Server
# --------------------------------------------------------

if __name__ == "__main__":

    print("=" * 55)
    print("🚀 AgentX Startup Builder Backend Started")
    print("=" * 55)
    print("Server : http://127.0.0.1:5000")
    print("Health : http://127.0.0.1:5000/health")
    print("=" * 55)

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )