import { useContext, useEffect } from 'react';

import useUpdateView from '@/libs/hooks/useUpdateView';
import { ModelContext } from '@/viewModel/GraphicEditorContext';

/**
 * 해당 훅을 사용한 컴포넌트에서 모델의 상태 변경을 구독합니다.
 */
const useSubscribe = () => {
  const updateView = useUpdateView();
  const model = useContext(ModelContext);

  if (model === null) {
    throw new Error('Model is not found');
  }

  useEffect(() => {
    const unsubscribe = model.subscribe(updateView);
    return () => unsubscribe();
  }, [model, updateView]);

  return model.snapshot;
};
export default useSubscribe;
