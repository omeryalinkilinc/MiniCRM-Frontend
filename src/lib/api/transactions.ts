export async function fetchTransactions(customerId: number) {
  if (!customerId) {
    console.warn("Geçersiz customerId:", customerId);
    return [];
  }

  try {
    const res = await fetch(
      `http://localhost:5270/api/transactions/by-customer/${customerId}`
    );

    if (!res.ok) {
      console.error("İşlem listesi alınamadı:", res.status);
      return [];
    }

    const data = await res.json();
    console.log("Gelen veri:", data);
    return data;
  } catch (err) {
    console.error("İşlem verisi alınırken hata:", err);
    return [];
  }
}
