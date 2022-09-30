import useSettings from './useSettings';

// get selected theme color
const useSelectedColor = () => {
  const { colorOption, themeColorPresets } = useSettings();

  return colorOption.find((item) => item.name === themeColorPresets).value;
};

export default useSelectedColor;
