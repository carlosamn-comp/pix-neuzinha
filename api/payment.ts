// api/payment.ts
export default async function handler(req: any, res: any) {
  try {
    // Verifica se a requisição é do tipo POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { selectedValue } = req.body; // Recebe o valor da doação do frontend

    // Valida se o valor foi passado
    if (!selectedValue) {
      return res.status(400).json({ error: "Valor não fornecido" });
    }

    // 1) Autentica para obter a apiKey
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

    // 2) Datas: o 1º Pix é cobrado na autorização, então as mensalidades começam no mês seguinte
    // (a Pluggy não aceita o 1º pagamento no mesmo dia do startDate)
    const hoje = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date()); // YYYY-MM-DD no horário de Brasília
    const [ano, mes, dia] = hoje.split('-').map(Number);
    const ultimoDiaProxMes = new Date(Date.UTC(ano, mes + 1, 0)).getUTCDate(); // Ex.: 31/01 vira 28/02
    const startDate = new Date(Date.UTC(ano, mes, Math.min(dia, ultimoDiaProxMes))).toISOString().split('T')[0];

    // 3) Dados do pagamento
    const paymentData = {
      firstPayment: {
        amount: Number(selectedValue),
        description: 'Primeiro pagamento' // Sem date: é cobrado assim que o doador autoriza
      },
      interval: 'MONTHLY',
      description: 'Este pix é direcionado para a criação de uma aposentadoria digna para a Neuzinha',
      isSandbox: false,
      fixedAmount: Number(selectedValue),
      startDate, // Sem expiresAt: a doação mensal vale até o doador cancelar
      isRetryAccepted: true,
      automaticRetriesConfiguration: {
        retryDays: [1, 3, 7]
      },
      recipientId: process.env.RECIPIENT_ID || "", // Recipiente de destino da doação
      schedulerConfiguration: {
      enabled: true,
      description: "Este pix é direcionado para a criação de uma aposentadoria digna para a Neuzinha"
      }
    };

    // 4) Requisição para o Pluggy API para criar o pagamento
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,  // API key do Pluggy
      },
      body: JSON.stringify(paymentData),
    };

    const paymentRes = await fetch('https://api.pluggy.ai/payments/requests/automatic-pix', options);
    const paymentDataResponse = await paymentRes.json();

    // Verifica se a resposta é bem-sucedida
    if (!paymentRes.ok) {
      return res.status(paymentRes.status).json({ error: "Erro ao criar o pagamento", details: paymentDataResponse });
    }

    // Retorna o paymentUrl que o frontend vai redirecionar
    const paymentUrl = paymentDataResponse.paymentUrl;
    return res.status(200).json({ paymentUrl });

  } catch (err: any) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
