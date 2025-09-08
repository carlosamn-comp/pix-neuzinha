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
      ctData.connectToken ?? ctData.accessToken ?? ctData.token ?? null;

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

        // Só retorna o saldo e não os dados completos
        return {
          accountId: id,
          balance: d.balance ?? null, // retorna apenas o valor de balance
        };
      })
    );

    return res.status(200).json({
      message: "OK",
      connectToken,
      balances: balances.map(b => b.balance), // Mapeia apenas os saldos
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
