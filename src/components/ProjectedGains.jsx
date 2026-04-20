import React from 'react';
import { formatCurrency, MathUtils } from '../utils/format';

const ProjectedGains = ({ postData, preTotal }) => {
  if (!postData) return <div>Loading...</div>;

  const { stcg, ltcg } = postData;
  
  const netStcg = MathUtils.calculateNetGains(stcg.profits, stcg.losses);
  const netLtcg = MathUtils.calculateNetGains(ltcg.profits, ltcg.losses);
  const total = netStcg + netLtcg;

  const reduced = preTotal > total;
  const savings = preTotal - total;

  return (
    <div className="card blue-card">
      <h2>After Harvesting</h2>
      
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

      {reduced && savings > 0 && (
        <div className="alert-box">
          🎉 You're going to save <strong>{formatCurrency(savings)}</strong> in taxes!
        </div>
      )}
    </div>
  );
};

export default ProjectedGains;
