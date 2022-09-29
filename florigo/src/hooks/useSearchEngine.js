const useSearchEngine = () => {
  const recursion = (val = [], search = '') => {
    let arr = [];

    if (Array.isArray(val)) {
      if (val !== null) {
        // eslint-disable-next-line
        val.map((item) => {
          if (item) {
            arr = [...arr, recursion(item, search)];
            return item;
          }
        });
      }
    } else if (typeof val === 'object') {
      if (val !== null) {
        Object.values(val).map((item) => {
          if (item) {
            arr = [...arr, recursion(item, search)];
          }
          return item;
        });
      }
    } else if (typeof val === 'string' || typeof val === 'number') {
      if (val) {
        arr.push(String(val).toLowerCase());
      }
    }

    return String(arr).match(search.toLowerCase());
  };

  const searchEngine = (arr, search = '') => {
    if (search.trim() === '' || search.length < 3) {
      return arr;
    }

    search = search.replace(/[&\\#,+()$~%'":*?<>{}]/gim, '');
    // eslint-disable-next-line
    const filtered = arr.filter((item) => {
      if (recursion(item, search)?.length > 0) {
        return item;
      }
    });

    return filtered;
  };

  return searchEngine;
};

export default useSearchEngine;
