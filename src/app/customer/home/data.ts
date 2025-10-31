export const data = [
  {
    date: "Mar 22",
    Apples: 50,
  },
  {
    date: "Mar 23",
    Apples: 60,
  },
  {
    date: "Mar 24",
    Apples: 40,
  },
  {
    date: "Mar 25",
    Apples: 30,
  },
  {
    date: "Mar 26",
    Apples: 0,
  },
  {
    date: "Mar 27",
    Apples: 20,
  },
  {
    date: "Mar 28",
    Apples: 20,
  },
  {
    date: "Mar 29",
    Apples: 10,
  },
];

export const getCurrencyRates = async () => {
  try {
    const [usdRes, eurRes, gbpRes] = await Promise.all([
      fetch("https://api.frankfurter.app/latest?from=USD&to=TRY"),
      fetch("https://api.frankfurter.app/latest?from=EUR&to=TRY"),
      fetch("https://api.frankfurter.app/latest?from=GBP&to=TRY"),
    ]);

    const [usdData, eurData, gbpData] = await Promise.all([
      usdRes.json(),
      eurRes.json(),
      gbpRes.json(),
    ]);

    return {
      USD: usdData.rates.TRY,
      EUR: eurData.rates.TRY,
      GBP: gbpData.rates.TRY,
      date: usdData.date,
    };
  } catch (error) {
    console.error("Döviz verisi alınamadı:", error);
    return null;
  }
};

export const Linedata = [
  {
    date: "Mar 22",
    Apples: 2890,
    Oranges: 2338,
  },
  {
    date: "Mar 23",
    Apples: 2756,
    Oranges: 2103,
  },
  {
    date: "Mar 24",
    Apples: 3322,
    Oranges: 986,
  },
  {
    date: "Mar 25",
    Apples: 3470,
    Oranges: 2108,
  },
  {
    date: "Mar 26",
    Apples: 3129,
    Oranges: 1726,
  },
];
