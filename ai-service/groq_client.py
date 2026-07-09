import os
import requests

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"


def ask_groq(system_prompt, user_prompt):

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ.get('GROQ_API_KEY')}",
    }

    payload = {
        "model": os.environ.get("GROQ_MODEL"),
        "temperature": 0.4,
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