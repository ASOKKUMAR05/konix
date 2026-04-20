export const calcChanges = (initialGains, items, selectedIds) => {
  if (!initialGains) return null;

  const res = {
    stcg: { ...initialGains.stcg },
    ltcg: { ...initialGains.ltcg }
  };

  const selected = items.filter(h => selectedIds.includes(h.coin));

  selected.forEach(item => {
    // Process STCG
    if (item.stcg && item.stcg.gain !== undefined) {
      if (item.stcg.gain > 0) {
        res.stcg.profits += item.stcg.gain;
      } else if (item.stcg.gain < 0) {
        res.stcg.losses += Math.abs(item.stcg.gain);
      }
    }

    // Process LTCG
    if (item.ltcg && item.ltcg.gain !== undefined) {
      if (item.ltcg.gain > 0) {
        res.ltcg.profits += item.ltcg.gain;
      } else if (item.ltcg.gain < 0) {
        res.ltcg.losses += Math.abs(item.ltcg.gain);
      }
    }
  });

  return res;
};
