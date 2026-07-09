import json
from datetime import date

VALID_CATEGORIES = [
    "Food", "Shopping", "Travel", "Bills",
    "Health", "Education", "Entertainment", "Other",
]

VALID_PAYMENT_METHODS = [
    "Cash", "UPI", "Credit Card", "Debit Card", "Net Banking",
]


def build_chat_system_prompt(context):

    return f"""You are SpendSense AI, a personal financial assistant inside the SpendSense app.

Here is the user's real financial data, already calculated by the app. Only use these numbers,
never invent figures that aren't here:

{json.dumps(context, indent=2)}

Rules:
- Answer questions about the user's spending, budget, and goals using ONLY the data above.
- If something is asked that this data can't answer (e.g. a specific month not shown here),
  say you don't have that data yet instead of guessing.
- Keep answers short and conversational, 1-3 sentences unless the user asks for detail.
- Use ₹ for amounts, no markdown formatting.
- Speak directly to the user, warm but concise.
"""


def build_extract_expense_prompt(text):

    today = date.today().isoformat()

    system_prompt = (
        "You are an expense extraction assistant inside an app called SpendSense. "
        "Extract structured expense details from natural language text. "
        "Respond ONLY with valid JSON, no markdown, no explanation."
    )

    user_prompt = f"""
Today's date is {today}.

Extract expense details from this text:

"{text}"

Return JSON in exactly this shape:

{{
  "title": "short expense title, 3-50 characters",
  "amount": 0,
  "category": "one of {VALID_CATEGORIES}",
  "paymentMethod": "one of {VALID_PAYMENT_METHODS}",
  "date": "YYYY-MM-DD, resolve relative words like today/yesterday using today's date above",
  "notes": ""
}}

Rules:
- amount must be a plain number, no currency symbols or commas.
- category must be exactly one value from the list above, pick the closest match.
- Use your knowledge of real brands, restaurants, shops, apps, and services to infer category,
  even if the text only names a product or place and doesn't say the category directly.
  Example: "Thums Up" or "Coke" is a drink -> Food. "Uber" or "Ola" -> Travel.
  "Zomato" or "Swiggy" -> Food. "Netflix" or "BookMyShow" -> Entertainment.
  "Amazon" or "Myntra" -> Shopping. Use this same reasoning for any brand you recognize.
- Only use "Other" if you genuinely cannot infer a category after considering the above.
- paymentMethod must be exactly one value from the list above. If not mentioned, use "Cash".
- If no date is mentioned, use today's date.
- Do not include any text outside the JSON object.
"""

    return system_prompt, user_prompt


def build_goal_prediction_prompt(stats):

    system_prompt = (
        "You are a personal finance assistant inside an app called SpendSense. "
        "You are given accurate goal-tracking statistics that were already calculated by the app. "
        "Do not invent numbers, only use the numbers given. Write one short sentence, plain text, no markdown."
    )

    user_prompt = f"""
Here is the user's savings goal data:

{json.dumps(stats, indent=2)}

Write exactly one short, natural sentence (max 20 words) about how this specific goal is going,
based on the numbers above. Vary your wording and tone based on the actual numbers:
- if successProbability is high, sound confident and specific about it (mention the goal name or remaining amount)
- if it's mid-range, sound encouraging but realistic
- if it's low, sound like a gentle nudge to save more, mentioning requiredPerDay if useful

Do not just restate the successProbability number in the sentence, describe the situation in your own words.
Speak directly to the user.
"""

    return system_prompt, user_prompt


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