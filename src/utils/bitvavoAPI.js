const BASE_URL = "https://api.bitvavo.com/v2";

export async function fetchOHLC(market, interval = "1h", limit = 50) {
  const response = await fetch(
    `${BASE_URL}/candles?market=${market}&interval=${interval}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Fout bij ophalen candlestick data");
  const data = await response.json();
  return data.map((c) => ({
    time: c[0],
    open: parseFloat(c[1]),
    high: parseFloat(c[2]),
    low: parseFloat(c[3]),
    close: parseFloat(c[4]),
    volume: parseFloat(c[5]),
  }));
}
