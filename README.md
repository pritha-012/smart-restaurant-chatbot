# Smart Restaurant AI Chatbot 🍔🤖

A full-stack, conversational AI assistant for a restaurant. This chatbot uses natural language processing to understand customer queries and dynamically retrieves today's menu using LangGraph and the Google Gemini API.

## Features
* **Conversational Interface:** A clean, responsive frontend built with HTML, CSS, and vanilla JavaScript.
* **Agentic Workflow:** Utilizes LangGraph's `createReactAgent` to process user input and determine when to call external tools.
* **Dynamic Function Calling:** Features a custom tool built with Zod validation to fetch specific menu categories (breakfast, lunch, or dinner) based on the context of the user's question.
* **REST API:** Express.js backend that securely handles communication between the client and the Gemini AI model.

## Tech Stack
* **Backend:** Node.js, Express.js
* **AI & Orchestration:** Google Gemini API (`gemini-3.8-flash`), LangGraph, LangChain
* **Schema Validation:** Zod
* **Frontend:** HTML, CSS, JavaScript (Fetch API)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/smart-restaurant-chatbot.git](https://github.com/pritha-012/smart-restaurant-chatbot.git)
   cd smart-restaurant-chatbot

Install dependencies:
npm install

Set up environment variables:
Create a .env file in the root directory and add your Google API Key:
GOOGLE_API_KEY=your_google_api_key_here

Run the server:
node server.js
The application will be running at http://localhost:3000.

Usage
Open the application in your browser and ask the chatbot questions like:

"What do you have for lunch?"

"I am hungry for breakfast, what's on the menu?"

"What's for dinner today?"