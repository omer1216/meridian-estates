const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/2983ed8e-e1e2-4841-9ae0-948ffa9dc469";

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