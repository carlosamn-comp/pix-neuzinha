// services/api.ts

// Função para buscar o saldo
export const fetchBalance = async (connectToken: string, accountId: string): Promise<number> => {
  const response = await fetch(`/api/balance?accountId=${accountId}&token=${connectToken}`);
  if (!response.ok) throw new Error('Falha ao buscar saldo');
  const data = await response.json();
  return data.balance ?? 0;
};

// Função para realizar o pagamento
export const makePayment = async (connectToken: string, paymentData: unknown): Promise<string | null> => {
  const response = await fetch('/api/pay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${connectToken}` },
    body: JSON.stringify(paymentData),
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.paymentUrl ?? null;  // URL de pagamento, por exemplo
};
