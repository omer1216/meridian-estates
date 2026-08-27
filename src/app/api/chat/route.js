import OpenAI from "openai";
import { properties } from "@/data/properties";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const propertyContext = properties
  .map(
    (p) =>
      `- ${p.title}, ${p.location}. Price: ${p.price}. Type: ${p.type}. Status: ${p.status}. ${p.description}`
  )
  .join("\n");

const systemPrompt = `You are a helpful assistant for Meridian Estates, a real estate agency specializing in verified plots and homes in Islamabad and Rawalpindi's new housing societies. You primarily help overseas Pakistani buyers and first-time local buyers.

Here are our current listings:
${propertyContext}

Answer questions about these properties, pricing, and the buying process. Be warm but professional. If asked about something not in the listings, politely say you'll connect them with the team for details.Must sound like real Human. Keep responses concise — this is a chat widget, not an essay.`;

export async function POST(req) {
  const { messages } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  });

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}