export async function fetchConnectToken() {
  const res = await fetch("/api/auth", { method: "POST" });
  if (!res.ok) throw new Error("Erro ao gerar connect token");
  const data = await res.json();
  console.log("[Pluggy] connect_token:", data);
  return data;
}
