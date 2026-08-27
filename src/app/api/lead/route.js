const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function POST(req) {
  const leadData = await req.json();

  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to send lead to n8n:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}