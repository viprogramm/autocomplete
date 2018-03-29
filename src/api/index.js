import data from "../stub/data";

let lastReject;

export const search = query => {
  const promise = new Promise((resolve, reject) => {
    if (query === "" || query === undefined) {
      return resolve([]);
    }

    lastReject = reject;

    setTimeout(() => {
      const regex = new RegExp(query, "i");
      const items = data.filter(currency => regex.test(currency.name));
      resolve(items);
    }, 200);
  });

  promise.abort = () => {
    if (typeof lastReject === "function") {
      lastReject("Previous request was canceled");
    }
  };

  return promise;
};
