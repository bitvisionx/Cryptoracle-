import React from "react";

export default function PredictionDisplay({ data }) {
  return (
    <div className="prediction-display">
      <p><strong>Relative Strength Index:</strong> {data.rsi}</p>
      <p><strong>Bollinger Bands:</strong></p>
      <ul>
        <li>Onderste Band: {data.bollinger.lower}</li>
        <li>Middelste Band: {data.bollinger.middle}</li>
        <li>Bovenste Band: {data.bollinger.upper}</li>
      </ul>
      <p><strong>Voorspellingen (Euro):</strong></p>
      <ul>
        <li>Over 1 uur: €{data.predictions["1h"]}</li>
        <li>Over 6 uur: €{data.predictions["6h"]}</li>
        <li>Over 24 uur: €{data.predictions["24h"]}</li>
      </ul>
    </div>
  );
}
