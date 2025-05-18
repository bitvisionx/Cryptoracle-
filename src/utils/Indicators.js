// src/utils/indicators.js

// Bereken RSI (Relative Strength Index)
export function calculateRSI(data, period = 14) {
  if (data.length < period) return null;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = data[i] - data[i - 1];
    if (change >= 0) gains += change;
    else losses -= change;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  if (avgLoss === 0) return 100;

  let rs = avgGain / avgLoss;
  let rsi = 100 - (100 / (1 + rs));

  return rsi;
}

// Bereken Bollinger Bands
export function calculateBollingerBands(data, period = 20, multiplier = 2) {
  if (data.length < period) return null;

  const slice = data.slice(-period);
  const mean = slice.reduce((sum, val) => sum + val, 0) / period;

  const variance =
    slice.reduce((sum, val) => sum + (val - mean) ** 2, 0) / period;
  const stdDev = Math.sqrt(variance);

  return {
    upper: mean + multiplier * stdDev,
    middle: mean,
    lower: mean - multiplier * stdDev,
  };
}

// Simple Moving Average (SMA)
export function calculateSMA(data, period = 14) {
  if (data.length < period) return null;

  const slice = data.slice(-period);
  const sum = slice.reduce((acc, val) => acc + val, 0);

  return sum / period;
}

// Exponential Moving Average (EMA)
export function calculateEMA(data, period = 14) {
  if (data.length < period) return null;

  const k = 2 / (period + 1);
  let ema = data.slice(0, period).reduce((acc, val) => acc + val, 0) / period;

  for (let i = period; i < data.length; i++) {
    ema = data[i] * k + ema * (1 - k);
  }

  return ema;
}
