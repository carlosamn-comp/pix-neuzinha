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

    // 3) BALANCES (somente saldo de cada conta)
    const accountIds = [ACCOUNT_1, ACCOUNT_2];
    const balances = await Promise.all(
      accountIds.map(async (id) => {
        const r = await fetch(`https://api.pluggy.ai/accounts/${id}`, {
          method: "GET",
          headers: { accept: "application/json", "X-API-KEY": apiKey },
        });
        const d = await r.json();
        if (!r.ok) return { accountId: id, error: d };

        // Retorna apenas o saldo
        return d.balance ?? 0;
      })
    );

    return res.status(200).json({
      message: "OK",
      balances,  // Retorna a lista apenas com os saldos
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
