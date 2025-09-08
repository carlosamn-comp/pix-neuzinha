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
