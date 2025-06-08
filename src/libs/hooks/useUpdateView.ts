import { useState } from 'react';

/**
 * 컴포넌트를 재렌더링 하는 함수를 반환합니다.
 */
const useUpdateView = () => {
  const [, setState] = useState(0);

  const updateView = () => {
    setState(prev => prev + 1);
  };

  return updateView;
};

export default useUpdateView;
