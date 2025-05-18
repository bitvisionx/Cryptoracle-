export function calculateSMA(data, period) {
  const sma = [];
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const avg = slice.reduce((sum, val) => sum + val, 0) / period;
    sma.push(avg);
  }
  return sma;
}

export function calculateRSI(closes, period = 14) {
  let gains = 0,
    losses = 0;
  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }
  let rs = gains / (losses || 1);
  let rsi = 100 - 100 / (1 + rs);
  return rsi.toFixed(2);
}

export function calculateBollingerBands(closes, period = 20) {
  const smaArr = calculateSMA(closes, period);
  const sma = smaArr[smaArr.length - 1];
  const slice = closes.slice(-period);
  const variance =
    slice.reduce((acc, val) => acc + (val - sma) ** 2, 0) / period;
  const stdDev = Math.sqrt(variance);
  return {
    upper: (sma + 2 * stdDev).toFixed(2),
    lower: (sma - 2 * stdDev).toFixed(2),
    middle: sma.toFixed(2),
  };
}
