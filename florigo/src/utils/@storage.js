class Storage {
  constructor(storage) {
    if (storage === 'session') {
      this.storage = sessionStorage;
    } else {
      this.storage = localStorage;
      this.session = new Storage('session');
    }
  }

  get(key) {
    const value = this.storage.getItem(key);

    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  set(key, value) {
    value = JSON.stringify(value);
    return this.storage.setItem(key, value);
  }

  remove(key) {
    return this.storage.removeItem(key);
  }

  clear() {
    return this.storage.clear();
  }

  update(key, value) {
    const cache = this.get(key);
    if (!typeof cache === 'object' || cache === null) {
      console.error('storage update: only apply to object');
      return;
    }
    if (!typeof value === 'object' || value === null) {
      console.error('storage update: only accepts object');
      return;
    }

    const newValue = {
      ...cache,
      ...value,
    };

    return this.set(key, newValue); // eslint-disable-line
  }

  clearWithout(arr) {
    if (!Array.isArray(arr)) {
      this.storage.clear();
    }

    const cache = {};
    arr.forEach((val) => (cache[val] = this.get(val)));
    this.clear();
    arr.forEach((val) => this.set(val, cache[val]));
  }
}

const instance = new Storage();
export default instance;
