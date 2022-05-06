// export type CB = (value: any) => void;

const setToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
}

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
}

const Store = () => {
  let store = getFromLocalStorage("store") || {};
  let subscriptions: any = {};

  const get = (name: string): any => {
    return store[name];
  }

  const set = (name: string, value: any) => {
    store = { ...store, [name]: value };
    setToLocalStorage("store", store);
    if (subscriptions[name] && subscriptions[name].length) {
      subscriptions[name]
        .filter((callback) => callback !== null)
        .forEach((callback) => {
          callback(value);
        });
    }
  }

  const subscribe = (name: any, callback: (e?: any) => void) => {
    if (!subscriptions[name]) {
      subscriptions[name] = [];
    }

    const existing = subscriptions[name].find((cb) => cb === callback);
    if (existing) {
      return () => {};
    }

    const length = subscriptions[name].push(callback);
    const index = length - 1;

    return () => {
      subscriptions[name][index] = null;
    };
  }

  const reset = () => {
    store = {};
    subscriptions = {};
    removeFromLocalStorage("store");
  }

  return { get, set, subscribe, reset };
}

// let storeInstance = {};
// if (typeof window !== "undefined") {
  // storeInstance = Store();
// }
// 

const storeInstance  = (typeof window !== 'undefined') ? Store() : {
	get: (key: string) => undefined,
	set: (key?: string, value?: any) => null,
	subscribe: (key: string, cb: any) => undefined,
	reset: () => {}, 
};


const { get, set, subscribe, reset } = storeInstance;

export { get, set, subscribe, reset };
