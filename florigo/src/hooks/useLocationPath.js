import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useLocationInfo = () => {
  const info = useLocation();
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(info.pathname?.split('/').pop());
  }, [info]);

  return path;
};

export default useLocationInfo;
