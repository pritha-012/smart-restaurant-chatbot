import express from "express"
import dotenv from "dotenv";
import path from "path";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { z } from "zod";

dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());
const __dirname = path.resolve();

const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.8-flash",
    maxOutputTokens: 2048,
    temperature: 0.7,
    apiKey: process.env.GOOGLE_API_KEY,
});

const getMenuTool = new DynamicStructuredTool({
    name: "getMenu",
    description: "Returns the final answer for today's menu for the given category (breakfast, lunch, or dinner). Use this tool to answer the user's menu question directly.", 
    schema: z.object({
        category: z.string().describe("The category of the menu to retrieve (breakfast, lunch, or dinner)."),
    }),
    func: async ({category}) => {
         const menus = { 
      breakfast: "Aloo Paratha, Poha, Masala Chai", 
      lunch: "Paneer Butter Masala, Dal Fry, Jeera Rice, Roti", 
      dinner: "Veg Biryani, Raita, Salad, Gulab Jamun", 
    }; 
     return menus[category.toLowerCase()] || "No menu found for that category."; 
    },
});

const executor = createReactAgent({ 
    llm: model, 
    tools: [getMenuTool], 
    messageModifier: "You are a helpful assistant that uses tools when needed." ,
    verbose: true,
    maxIterations: 10
});

app.get("/",(req,res)=>{
    return res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.input;
    console.log("Received user input:", userInput);
    
    try {
        // 1. LangGraph expects a 'messages' array, not 'input'
        const response = await executor.invoke({ 
            messages: [["human", userInput]] 
        });
        
        console.log("Agent full response:", response);
        
        // 2. The final answer is the content of the last message in the array
        const agentMessages = response.messages;
        const finalReply = agentMessages[agentMessages.length - 1].content;
        
        if (finalReply){
            // Return 'output' to match what your frontend is likely expecting
            return res.json({ output: finalReply });
        }
        
        res.status(500).json({ output: "No output from the agent." });
    
    } catch (err) {
        console.log("Error processing chat request:", err);
        res.status(500).json({ output: "An error occurred while processing your request." });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});