import os
import requests
from dotenv import load_dotenv


load_dotenv()


OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


def ask_ai(system_prompt, user_prompt):

    url = "https://openrouter.ai/api/v1/chat/completions"


    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }


    data = {

        "model": "openai/gpt-4o-mini",

        "messages": [

            {
                "role": "system",
                "content": system_prompt
            },

            {
                "role": "user",
                "content": user_prompt
            }

        ],

        "temperature":0.7

    }


    response = requests.post(
        url,
        headers=headers,
        json=data
    )


    result = response.json()


    try:

        return result["choices"][0]["message"]["content"]

    except:

        return {
            "error": result
        }