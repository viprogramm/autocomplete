import data from "../stub/data";

let timer;

const abort = () => {
  clearTimeout(timer);
};

export const search = query => {
  console.log("search", query);

  abort();
  if (query === "" || query === undefined) {
    return [];
  }
  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      const regex = new RegExp(query, "i");
      const items = data.filter(currency => regex.test(currency.name));
      resolve(items);
    }, 500);
  });
};

// export const search = (time = 500) => {
//   let timers = [];
//
//   const abort = () => {
//     timers.forEach(timer => clearTimeout(timer));
//   };
//
//   return query => {
//     return new Promise((resolve, reject) => {
//       const timer = setTimeout(() => {
//         const regex = new RegExp(query, "i");
//         const items = data.filter(currency => regex.test(currency.name));
//         resolve({ items, abort });
//       }, time);
//
//       timers = [...timers, timer];
//     });
//   };
// };
