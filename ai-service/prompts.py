import json


def build_tips_prompt(stats):

    system_prompt = (
        "You are a personal finance assistant inside an expense tracking app called SpendSense. "
        "You are given accurate spending statistics that were already calculated by the app. "
        "Do not invent numbers. Respond ONLY with valid JSON, no markdown, no explanation."
    )

    user_prompt = f"""
Here is the user's spending data for this month:

{json.dumps(stats, indent=2)}

Return JSON in exactly this shape:

{{
  "savingTips": ["tip 1", "tip 2", "tip 3"],
  "healthScore": 0
}}

Rules:
- savingTips must be an array of exactly 3 short, practical, specific tips based on the data above.
- healthScore is a number from 0 to 100 representing overall financial health this month.
- Base the score on budget usage, category balance, and weekend spending ratio.
- Do not include any text outside the JSON object.
"""

    return system_prompt, user_prompt


def build_report_prompt(stats):

    system_prompt = (
        "You are a personal finance assistant inside an expense tracking app called SpendSense. "
        "You are given accurate spending statistics that were already calculated by the app. "
        "Do not invent numbers. Write in plain text, no markdown symbols."
    )

    user_prompt = f"""
Here is the user's spending data for this month:

{json.dumps(stats, indent=2)}

Write a short financial report, around 150-200 words, covering:
- Overall spending summary
- Category-wise observations
- Budget performance
- 2-3 saving suggestions

Write it directly to the user in second person. Keep it warm but concise.
"""

    return system_prompt, user_prompt