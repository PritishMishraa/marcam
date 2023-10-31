/**
 * Credits: Fast Nguyen
 * Blog Link: https://fastnguyen.medium.com/build-otp-input-with-reactjs-hooks-5699eb58b427
 * Github Link: https://github.com/phatnguyenuit/react-otp-input-scratch
 */

import { useRef, useEffect } from 'react';

function usePrevious<T>(value?: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;