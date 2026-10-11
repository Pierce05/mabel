export const fmt=n=>'₹'+Math.round(n).toLocaleString('en-IN');
export const EMO={Shopping:'🛍️',Bills:'🧾','Food & chai':'☕','Food delivery':'🛵','Fun & outings':'🎬',Subscriptions:'📺',Transport:'🚇','Money in':'💸'};
export const CATS=Object.keys(EMO).filter(k=>k!=='Money in');
