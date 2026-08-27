import OpenAI from "openai";
import { properties } from "@/data/properties";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/2983ed8e-e1e2-4841-9ae0-948ffa9dc469";

const propertyContext = properties
  .map(
    (p) =>
      `- ${p.title}, ${p.location}. Price: ${p.price}. Type: ${p.type}. Status: ${p.status}. ${p.description}`
  )
  .join("\n");

const systemPrompt = `You are a helpful assistant for Meridian Estates, a real estate agency specializing in verified plots and homes in Islamabad and Rawalpindi's new housing societies. You primarily help overseas Pakistani buyers and first-time local buyers.

Always Start by Asking their Name in a fun friendly tone
Here are our current listings:
${propertyContext}

Answer questions about these properties, pricing, and the buying process. Be warm but professional. Keep responses concise — this is a chat widget, not an essay !

If the conversation naturally reveals the visitor is interested in buying and you learn their name and ask them in what way they are confortable Call or email and contact info email or phone, call the capture_lead function with whatever details you have. Don't force this — only call it once you genuinely have at least a name and a way to contact them.`;

const tools = [
  {
    type: "function",
    function: {
      name: "capture_lead",
      description: "Save a potential buyer's contact info and interest for the sales team to follow up.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "The visitor's name" },
          phone: { type: "string", description: "Phone number" },
          email: { type: "string", description: "Email address" },
          budget: { type: "string", description: "Their stated budget, if mentioned" },
          interest: { type: "string", description: "What property or type they're interested in" },
        },
        required: ["name"],
        anyOf: [
          { required: ["phone"] },
          { required: ["email"] },
        ],
      },
    },
  },
];

async function sendLeadToN8n(leadData) {
  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: leadData.name,
        phone: leadData.phone,
        email:leadData.email,
        source: "Chatbot",
        property: leadData.interest || "",
        budget: leadData.budget || "",
      }),
    });
  } catch (error) {
    console.error("Failed to send lead to n8n:", error);
  }
}

export async function POST(req) {
  const { messages } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gemini-3.5-flash-lite",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    tools,
  });

  const responseMessage = completion.choices[0].message;

  if (responseMessage.tool_calls) {
    const leadData = JSON.parse(responseMessage.tool_calls[0].function.arguments);
    sendLeadToN8n(leadData);

    return Response.json({
      reply:
        "Thank you! I've passed your details to our team — someone will reach out to you shortly.",
    });
  }

  return Response.json({ reply: responseMessage.content });
}