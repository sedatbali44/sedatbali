export const getAllByAllIds = (byId, arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  return arr
    .map((id) => {
      if (id in byId) {
        return byId[id];
      }
      return undefined;
    })
    .filter((message) => typeof message !== 'undefined');
};

export const getIdsObject = (array) => {
  const idsObj = {};
  array.map((item) => {
    idsObj[item.id] = item;
    return item;
  });
  return idsObj;
};
