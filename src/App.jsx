import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { fetchHoldings, fetchGains } from './api';
import CurrentGains from './components/CurrentGains';
import ProjectedGains from './components/ProjectedGains';
import AssetList from './components/AssetList';
import { calcChanges } from './utils/math';
import { MathUtils } from './utils/format';

function App() {
  const [items, setItems] = useState([]);
  const [gains, setGains] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [itemsRes, gainsRes] = await Promise.all([
          fetchHoldings(),
          fetchGains()
        ]);
        setItems(itemsRes);
        setGains(gainsRes.capitalGains);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const projected = useMemo(() => {
    if (!gains || !items) return null;
    return calcChanges(gains, items, selectedIds);
  }, [gains, items, selectedIds]);

  const preTotal = useMemo(() => {
    if (!gains) return 0;
    const netStcg = MathUtils.calculateNetGains(gains.stcg.profits, gains.stcg.losses);
    const netLtcg = MathUtils.calculateNetGains(gains.ltcg.profits, gains.ltcg.losses);
    return netStcg + netLtcg;
  }, [gains]);

  const handleToggle = (coinId, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, coinId]);
    } else {
      setSelectedIds(prev => prev.filter(id => id !== coinId));
    }
  };

  const handleToggleAll = (checked) => {
    if (checked) {
      setSelectedIds(items.map(h => h.coin));
    } else {
      setSelectedIds([]);
    }
  };

  if (loading) {
    return <div className="loading">Loading actual data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="wrap">
      <header className="header">
        <h1>Tax Loss Harvesting</h1>
        <p>Offset your capital gains with capital losses to reduce your tax burden.</p>
      </header>

      <div className="grid">
        <CurrentGains data={gains} />
        <ProjectedGains 
          postData={projected} 
          preTotal={preTotal} 
        />
      </div>

      <div className="table-section">
        <h2>Your Holdings</h2>
        <p>Select assets to sell or harvest</p>
        <AssetList 
          list={items} 
          selected={selectedIds} 
          toggleOne={handleToggle}
          toggleAll={handleToggleAll}
        />
      </div>
    </div>
  );
}

export default App;
