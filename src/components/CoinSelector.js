import React from "react";

export default function CoinSelector({ coins, selected, onChange }) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Selecteer cryptocurrency"
    >
      {coins.map((coin) => (
        <option key={coin} value={coin}>
          {coin}
        </option>
      ))}
    </select>
  );
}
