export const getCustomerCount = async (): Promise<number> => {
  const res = await fetch("http://localhost:5270/api/customers/count");
  const data = await res.json();

  return data.total;
};

export const getTransactionVolume = async () => {
  try {
    const response = await fetch(
      "http://localhost:5270/api/dashboard/monthly-customer-count",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Sunucu hatası: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data; // [{ Month: "January", Count: 42 }, ...]
  } catch (error) {
    console.error("İşlem hacmi verisi alınamadı:", error);
    return [];
  }
};

export const data = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

type Segment = {
  name: string;
  value: number;
};

export const getCustomerSegments = async () => {
  const res = await fetch(
    "http://localhost:5270/api/customers/customer-segments"
  );
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Segment fetch failed:", errorText);
    return [];
  }

  const data = await res.json();
  return data.map((item: Segment, index: number) => ({
    ...item,
    color: ["indigo.6", "yellow.6", "teal.6", "gray.6"][index % 4],
  }));
};

export const Areadata = [
  {
    date: "Mar 22",
    Apples: 110,
  },
  {
    date: "Mar 23",
    Apples: 60,
  },
  {
    date: "Mar 24",
    Apples: 80,
  },
  {
    date: "Mar 25",
    Apples: null,
  },
  {
    date: "Mar 26",
    Apples: null,
  },
  {
    date: "Mar 27",
    Apples: 40,
  },
  {
    date: "Mar 28",
    Apples: 120,
  },
  {
    date: "Mar 29",
    Apples: 80,
  },
];

export async function getCustomerGrowth() {
  const res = await fetch(
    "http://localhost:5270/api/dashboard/customer-growth",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await res.json();

  return data;
}

export const getMonthlyTransactionVolume = async () => {
  try {
    const response = await fetch(
      "http://localhost:5270/api/dashboard/monthly-transaction-volume",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Sunucu hatası: " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Aylık işlem hacmi alınamadı: ", error);
    return [];
  }
};

export async function fetchRecentTransactions() {
  const res = await fetch("http://localhost:5270/api/transactions/recent");

  if (!res.ok) {
    console.error("Son işlemler alınamadı:", res.status);
    return [];
  }

  return res.json();
}
