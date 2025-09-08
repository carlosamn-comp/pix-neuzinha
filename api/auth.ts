export default async function handler(req: any, res: any) {
  try {
    // 1) Autentica para pegar apiKey
    const auth = await fetch("https://api.pluggy.ai/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: process.env.CLIENT_ID || "",
        clientSecret: process.env.CLIENT_SECRET || "",
      }),
    });

    const authData = await auth.json();
    if (!auth.ok || !authData.apiKey) {
      return res.status(auth.status).json({ error: "Auth failed", details: authData });
    }

    const apiKey = authData.apiKey;

    // 2) Usa a apiKey no header da segunda requisição
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-API-KEY": apiKey,
      },
    };

    const tokenRes = await fetch("https://api.pluggy.ai/connect_token", options);
    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      return res.status(tokenRes.status).json({ error: "Connect token failed", details: tokenData });
    }
    
    res.status(200).json({ message: 'BACKEND EBAAA!' });
    return res.status(200).json(tokenData);
  } catch (err: any) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
  
}
