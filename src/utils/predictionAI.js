import { fetchOHLC } from "./bitvavoAPI";
import { calculateRSI, calculateBollingerBands } from "./indicators";

export async function predictPricesReal(market) {
  const candles = await fetchOHLC(market, "1h", 50);
  const closes = candles.map((c) => c.close);

  const rsi = calculateRSI(closes);
  const bollinger = calculateBollingerBands(closes);
  const latest = closes[closes.length - 1];

  let changeFactor = 0;

  if (rsi < 30) changeFactor += 0.03;
  else if (rsi > 70) changeFactor -= 0.03;

  if (latest < bollinger.lower) changeFactor += 0.02;
  else if (latest > bollinger.upper) changeFactor -= 0.02;

  const calc = (factor) => (latest * (1 + changeFactor * factor)).toFixed(2);

  return {
    rsi,
    bollinger,
    predictions: {
      "1h": calc(1),
      "6h": calc(1.8),
      "24h": calc(2.5),
    },
  };
}
