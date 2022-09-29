const useNumberToAmount = () => {
  const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return numberWithCommas;
};

export default useNumberToAmount;
