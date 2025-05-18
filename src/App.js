import React, { useEffect, useState } from "react";
import CoinSelector from "./components/CoinSelector";
import PredictionDisplay from "./components/PredictionDisplay";
import Header from "./components/Header";
import { predictPricesReal } from "./utils/predictionAI";
import "./App.css";

const COINS = [
  "BTC-EUR",
  "ETH-EUR",
  "LTC-EUR",
  "LIVE-EUR"
];

function App() {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPredictions() {
      setLoading(true);
      setError(null);
      try {
        const preds = await predictPricesReal(selectedCoin);
        setPredictions(preds);
      } catch (e) {
        setError("Kon voorspellingen niet laden.");
      }
      setLoading(false);
    }
    fetchPredictions();
  }, [selectedCoin]);

  return (
    <div className="App">
      <Header />
      <CoinSelector
        coins={COINS}
        selected={selectedCoin}
        onChange={setSelectedCoin}
      />
      {loading && <p className="loading">Laden...</p>}
      {error && <p className="error">{error}</p>}
      {predictions && !loading && !error && (
        <PredictionDisplay data={predictions} />
      )}
    </div>
  );
}

export default App;
