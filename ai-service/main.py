import os
import json
import re

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from groq_client import ask_groq, ask_groq_chat, transcribe_audio
from prompts import (
    build_tips_prompt,
    build_report_prompt,
    build_extract_expense_prompt,
    build_goal_prediction_prompt,
    build_chat_system_prompt,
)

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


@app.route("/extract-expense", methods=["POST"])
def extract_expense():

    try:

        text = request.json.get("text")

        if not text:
            return jsonify({"message": "text is required."}), 400

        system_prompt, user_prompt = build_extract_expense_prompt(text)

        raw = ask_groq(system_prompt, user_prompt)

        cleaned = re.sub(r"```json|```", "", raw).strip()

        parsed = json.loads(cleaned)

        return jsonify(parsed)

    except Exception as error:
        print("ai-service /extract-expense error:", str(error))
        return jsonify({"message": "Failed to extract expense details."}), 500


@app.route("/transcribe", methods=["POST"])
def transcribe():

    try:

        if "audio" not in request.files:
            return jsonify({"message": "audio file is required."}), 400

        audio_file = request.files["audio"]

        text = transcribe_audio(audio_file.read(), audio_file.filename)

        return jsonify({"text": text})

    except Exception as error:
        print("ai-service /transcribe error:", str(error))
        return jsonify({"message": "Failed to transcribe audio."}), 500


@app.route("/goal-prediction", methods=["POST"])
def goal_prediction():

    try:

        stats = request.json.get("stats")

        if not stats:
            return jsonify({"message": "stats is required."}), 400

        system_prompt, user_prompt = build_goal_prediction_prompt(stats)

        prediction = ask_groq(system_prompt, user_prompt)

        return jsonify({"prediction": prediction.strip()})

    except Exception as error:
        print("ai-service /goal-prediction error:", str(error))
        return jsonify({"message": "Failed to generate prediction."}), 500


@app.route("/chat", methods=["POST"])
def chat():

    try:

        message = request.json.get("message")
        history = request.json.get("history", [])
        context = request.json.get("context")

        if not message:
            return jsonify({"message": "message is required."}), 400

        if not context:
            return jsonify({"message": "context is required."}), 400

        system_prompt = build_chat_system_prompt(context)

        messages = [{"role": "system", "content": system_prompt}]

        messages.extend(history)

        messages.append({"role": "user", "content": message})

        reply = ask_groq_chat(messages)

        return jsonify({"reply": reply})

    except Exception as error:
        print("ai-service /chat error:", str(error))
        return jsonify({"message": "Failed to get a reply."}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5050))
    app.run(port=port, debug=True)