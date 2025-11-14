export const getCustomerInfo = async () => {
  const res = await fetch("http://localhost:5270/api/customer/info", {
    credentials: "include",
    method: "GET",
  });

  if (!res.ok) throw new Error("Müşteri bilgisi alınamadı");

  return res.json();
};

// yeni müşteri fonksiyonu parametreli
export const getNewCustomers = async () => {
  const res = await fetch("http://localhost:5270/api/reports/new-customers", {
    credentials: "include",
    method: "GET",
  });

  if (!res.ok) throw new Error("Yeni müşteri bilgisi alınamadı");

  return res.json(); // DTO: { weeklyCount, monthlyCount, weeklyList, monthlyList }
};
