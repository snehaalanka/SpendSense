import os
import json
import re

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from groq_client import ask_groq
from prompts import build_tips_prompt, build_report_prompt

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route("/tips", methods=["POST"])
def tips():

    try:

        stats = request.json.get("stats")

        if not stats:
            return jsonify({"message": "stats is required."}), 400

        system_prompt, user_prompt = build_tips_prompt(stats)

        raw = ask_groq(system_prompt, user_prompt)

        cleaned = re.sub(r"```json|```", "", raw).strip()

        parsed = json.loads(cleaned)

        return jsonify(parsed)

    except Exception as error:
        print("ai-service /tips error:", str(error))
        return jsonify({"message": "Failed to generate saving tips."}), 500


@app.route("/report", methods=["POST"])
def report():

    try:

        stats = request.json.get("stats")

        if not stats:
            return jsonify({"message": "stats is required."}), 400

        system_prompt, user_prompt = build_report_prompt(stats)

        report_text = ask_groq(system_prompt, user_prompt)

        return jsonify({"report": report_text})

    except Exception as error:
        print("ai-service /report error:", str(error))
        return jsonify({"message": "Failed to generate report."}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5050))
    app.run(port=port, debug=True)