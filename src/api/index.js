import { holdingsData, capitalGainsData } from './data';

export const fetchHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...holdingsData]);
    }, 500); 
  });
};

export const fetchGains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(capitalGainsData)));
    }, 500);
  });
};
