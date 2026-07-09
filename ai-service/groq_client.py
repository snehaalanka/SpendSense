import os
import requests

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_WHISPER_URL = "https://api.groq.com/openai/v1/audio/transcriptions"


def transcribe_audio(file_bytes, filename):

    headers = {
        "Authorization": f"Bearer {os.environ.get('GROQ_API_KEY')}",
    }

    files = {
        "file": (filename, file_bytes),
    }

    data = {
        "model": "whisper-large-v3-turbo",
    }

    response = requests.post(GROQ_WHISPER_URL, headers=headers, files=files, data=data)

    if response.status_code != 200:
        raise Exception(f"Groq transcription failed: {response.status_code} {response.text}")

    result = response.json()

    text = result.get("text")

    if not text:
        raise Exception("Groq returned an empty transcription.")

    return text


def ask_groq_chat(messages):

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ.get('GROQ_API_KEY')}",
    }

    payload = {
        "model": os.environ.get("GROQ_MODEL"),
        "temperature": 0.5,
        "messages": messages,
    }

    response = requests.post(GROQ_URL, headers=headers, json=payload)

    if response.status_code != 200:
        raise Exception(f"Groq request failed: {response.status_code} {response.text}")

    data = response.json()

    text = data["choices"][0]["message"]["content"]

    if not text:
        raise Exception("Groq returned an empty response.")

    return text


def ask_groq(system_prompt, user_prompt):

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ.get('GROQ_API_KEY')}",
    }

    payload = {
        "model": os.environ.get("GROQ_MODEL"),
        "temperature": 0.6,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    }

    response = requests.post(GROQ_URL, headers=headers, json=payload)

    if response.status_code != 200:
        raise Exception(f"Groq request failed: {response.status_code} {response.text}")

    data = response.json()

    text = data["choices"][0]["message"]["content"]

    if not text:
        raise Exception("Groq returned an empty response.")

    return text