from flask import Flask, request, jsonify, send_from_directory
from google import genai
from dotenv import load_dotenv
import os

# ==========================================
# LOAD ENVIRONMENT VARIABLES
# ==========================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY was not found in .env")


# ==========================================
# GEMINI CLIENT
# ==========================================

client = None

if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)


# ==========================================
# FLASK APP
# ==========================================

app = Flask(__name__, static_folder="public")


# ==========================================
# FRONTEND FILES
# ==========================================

@app.route("/")
def home():
    return send_from_directory("public", "index.html")


@app.route("/style.css")
def style():
    return send_from_directory("public", "style.css")


@app.route("/script.js")
def script():
    return send_from_directory("public", "script.js")


# ==========================================
# HEALTH CHECK
# ==========================================

@app.route("/api/health", methods=["GET"])
def health():

    return jsonify({
        "success": True,
        "message": "PromptShield AI server is running!"
    })


# ==========================================
# GENERATE AI RESPONSE
# ==========================================

@app.route("/api/generate", methods=["POST"])
def generate():

    try:

        if not client:
            return jsonify({
                "success": False,
                "message": "Gemini API key is not configured."
            }), 500

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No data was received."
            }), 400

        prompt = data.get("prompt", "").strip()

        if not prompt:
            return jsonify({
                "success": False,
                "message": "Please provide a prompt."
            }), 400

        # ======================================
        # SEND PROMPT TO GEMINI
        # ======================================

        response = client.models.generate_content(
            model="gemini-3.7-flash",
            contents=prompt
        )

        # ======================================
        # RETURN GEMINI RESPONSE
        # ======================================

        return jsonify({
            "success": True,
            "message": response.text
        })

    except Exception as error:

        print("Gemini error:", error)

        return jsonify({
            "success": False,
            "message": "Gemini could not generate a response. Please check the server terminal."
        }), 500


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 3000))

    print("")
    print("======================================")
    print("       PROMPTSHIELD AI")
    print("======================================")
    print("")
    print(f"Server running at:")
    print(f"http://localhost:{port}")
    print("")
    print("Gemini AI connection: READY")
    print("")
    print("Press CTRL+C to stop the server.")
    print("")

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )