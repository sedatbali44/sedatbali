const useIsDisabled = () => {
  const marginCalculate = (number, number2) => parseFloat(((number - number2) / number2) * 100).toFixed(2);

  return marginCalculate;
};

export default useIsDisabled;
