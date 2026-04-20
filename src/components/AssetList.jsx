import React, { useState, useMemo } from 'react';
import { formatCurrency } from '../utils/format';

const AssetList = ({ list, selected, toggleOne, toggleAll }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showAll, setShowAll] = useState(false);

  if (!list) return <div>Loading Table...</div>;

  const allChecked = list.length > 0 && selected.length === list.length;
  const someChecked = selected.length > 0 && selected.length < list.length;

  const handleAll = (e) => {
    toggleAll(e.target.checked);
  };

  const handleSort = (key) => {
    let direction = 'desc'; // Default first click to descending for gains
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    } else if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = null; // reset
      key = null;
    }
    setSortConfig({ key, direction });
  };

  const sortedList = useMemo(() => {
    let sortableItems = [...list];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key]?.gain !== undefined ? a[sortConfig.key].gain : a[sortConfig.key];
        let bValue = b[sortConfig.key]?.gain !== undefined ? b[sortConfig.key].gain : b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [list, sortConfig]);

  const displayedList = showAll ? sortedList : sortedList.slice(0, 4);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <span className="sort-icon inactive">↕</span>;
    return sortConfig.direction === 'asc' ? <span className="sort-icon active">↑</span> : <span className="sort-icon active">↓</span>;
  };

  return (
    <div className="table-wrap">
      <table className="main-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                checked={allChecked} 
                ref={input => {
                  if (input) input.indeterminate = someChecked;
                }}
                onChange={handleAll} 
              />
            </th>
            <th>Asset</th>
            <th>Holdings<br/><span className="tiny-head">Avg Buy Price</span></th>
            <th>Current Price</th>
            <th className="sortable-header" onClick={() => handleSort('stcg')}>
              Short-Term Gain {getSortIcon('stcg')}
            </th>
            <th className="sortable-header" onClick={() => handleSort('ltcg')}>
              Long-Term Gain {getSortIcon('ltcg')}
            </th>
            <th>Amount to Sell</th>
          </tr>
        </thead>
        <tbody>
          {displayedList.map((item) => {
            const isChecked = selected.includes(item.coin);
            return (
              <tr key={item.coin} className={isChecked ? 'active-row' : ''}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e) => toggleOne(item.coin, e.target.checked)}
                  />
                </td>
                <td>
                  <div className="flex-cell">
                    <img src={item.logo} alt={item.coinName} className="logo" />
                    <div>
                      <div className="symbol">{item.coin}</div>
                      <div className="name">{item.coinName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>{item.totalHolding.toFixed(4)}</div>
                  <div className="sub">{formatCurrency(item.averageBuyPrice)}</div>
                </td>
                <td>{formatCurrency(item.currentPrice)}</td>
                <td>
                  <div className={item.stcg.gain > 0 ? 'green-text' : item.stcg.gain < 0 ? 'red-text' : ''}>
                    {formatCurrency(item.stcg.gain)}
                  </div>
                  <div className="sub">{item.stcg.balance.toFixed(4)}</div>
                </td>
                <td>
                  <div className={item.ltcg.gain > 0 ? 'green-text' : item.ltcg.gain < 0 ? 'red-text' : ''}>
                    {formatCurrency(item.ltcg.gain)}
                  </div>
                  <div className="sub">{item.ltcg.balance.toFixed(4)}</div>
                </td>
                <td>
                  {isChecked ? item.totalHolding.toFixed(4) : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {list.length > 4 && (
        <div className="view-all-container">
          <button className="view-all-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'View Less' : 'View All'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetList;
