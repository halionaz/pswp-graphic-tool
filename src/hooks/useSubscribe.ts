import { useEffect } from 'react';

import useUpdateView from '@/hooks/useUpdateView';
import { model } from '@/models/GraphicEditorModel';

/**
 * 해당 훅을 사용한 컴포넌트에서 모델의 상태 변경을 구독합니다.
 */
const useSubscribe = () => {
  const updateView = useUpdateView();

  useEffect(() => {
    const unsubscribe = model.subscribe(updateView);
    return () => unsubscribe();
  }, [updateView]);

  return model.snapshot;
};
export default useSubscribe;
