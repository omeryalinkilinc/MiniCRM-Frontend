export const getTransactionCount = async () => {
  try {
    const response = await fetch(
      "http://localhost:5270/api/customers/transaction-count",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Sunucu hatası:" + response.status);
    }

    const data = await response.json();

    return data.total;
  } catch (error) {
    console.error("İşlem sayısı alınamadı: ", error);
  }
};
