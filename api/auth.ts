// api/auth.ts
export default async function handler(req: any, res: any) {
  try {
    const ACCOUNT_1 = process.env.ACCOUNT_1 || "";
    const ACCOUNT_2 = process.env.ACCOUNT_2 || "";
    if (!ACCOUNT_1 || !ACCOUNT_2) {
      return res.status(500).json({ error: "Missing ACCOUNT_1/ACCOUNT_2 env vars" });
    }

    // 1) AUTH -> apiKey
    const authRes = await fetch("https://api.pluggy.ai/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: process.env.CLIENT_ID || "",
        clientSecret: process.env.CLIENT_SECRET || "",
      }),
    });
    const authData = await authRes.json();
    if (!authRes.ok || !authData.apiKey) {
      return res.status(authRes.status).json({ error: "Auth failed", details: authData });
    }
    const apiKey: string = authData.apiKey;

    // 2) CONNECT TOKEN
    const ctRes = await fetch("https://api.pluggy.ai/connect_token", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-API-KEY": apiKey,
      },
    });
    const ctData = await ctRes.json();
    if (!ctRes.ok) {
      return res.status(ctRes.status).json({ error: "Connect token failed", details: ctData });
    }
    const connectToken: string | null =
      ctData.connectToken ?? null;

    // 3) BALANCES (sempre das duas contas)
    const accountIds = [ACCOUNT_1, ACCOUNT_2];
    const balances = await Promise.all(
      accountIds.map(async (id) => {
        const r = await fetch(`https://api.pluggy.ai/accounts/${id}`, {
          method: "GET",
          headers: { accept: "application/json", "X-API-KEY": apiKey },
        });
        const d = await r.json();
        if (!r.ok) return { accountId: id, error: d };
        return {
          accountId: id,
          balance: d.balance ?? null,
          data: d, // deixe para debug; remova em prod se quiser
        };
      })
    );

    return res.status(200).json({
      message: "OK",
      connectToken,
      balances,
      apiKey, // opcional (remova em produção)
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
