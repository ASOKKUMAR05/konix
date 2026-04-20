import React from 'react';
import { formatCurrency, MathUtils } from '../utils/format';

const CurrentGains = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  const { stcg, ltcg } = data;
  
  const netStcg = MathUtils.calculateNetGains(stcg.profits, stcg.losses);
  const netLtcg = MathUtils.calculateNetGains(ltcg.profits, ltcg.losses);
  const total = netStcg + netLtcg;

  return (
    <div className="card dark-card">
      <h2>Pre-Harvesting</h2>
      
      <div className="group">
        <div className="row">
          <span>Short-term Capital Gains</span>
          <span className="val">{formatCurrency(netStcg)}</span>
        </div>
        <div className="small-row">
          <span>Profits: {formatCurrency(stcg.profits)}</span>
          <span>Losses: {formatCurrency(stcg.losses)}</span>
        </div>
      </div>

      <div className="group">
        <div className="row">
          <span>Long-term Capital Gains</span>
          <span className="val">{formatCurrency(netLtcg)}</span>
        </div>
        <div className="small-row">
          <span>Profits: {formatCurrency(ltcg.profits)}</span>
          <span>Losses: {formatCurrency(ltcg.losses)}</span>
        </div>
      </div>

      <div className="line"></div>

      <div className="row bold-row">
        <span>Realised Capital Gains</span>
        <span className="val">{formatCurrency(total)}</span>
      </div>
    </div>
  );
};

export default CurrentGains;
