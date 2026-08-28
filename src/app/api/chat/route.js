import OpenAI from "openai";
import { properties } from "@/data/properties";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

const propertyContext = properties
  .map(
    (p) =>
      `- ${p.title}, ${p.location}. Price: ${p.price}. Type: ${p.type}. Status: ${p.status}. ${p.description}`
  )
  .join("\n");

const systemPrompt = `You are a helpful assistant for Meridian Estates, a real estate agency specializing in verified plots and homes in Islamabad and Rawalpindi's new housing societies. You primarily help overseas Pakistani buyers and first-time local buyers.

      Start by asking their name in a fun, friendly tone.

      Here are our current listings:
      ${propertyContext}

      Answer questions about these properties, pricing, and the buying process.

      RESPONSE STYLE — follow strictly:
      - Keep every reply to 2-3 short sentences maximum. This is a chat widget, not an essay.
      - No long paragraphs. No bullet lists unless the visitor explicitly asks you to compare multiple properties.
      - Be warm but brief. Get to the point fast.

      LEAD CAPTURE — follow strictly:
      - Do NOT call capture_lead just because you know their name. A name alone is never enough.
      - Only call capture_lead once the visitor has given you an actual way to reach them, their budget and interest — an email address or a phone number, not just a preference like "call me."
      - If they haven't offered contact info yet, ask for their email specifically as the first choice. Only fall back to asking for a phone number if they say they'd prefer that instead.
      - Never call capture_lead with a name and no real contact detail attached.`;
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