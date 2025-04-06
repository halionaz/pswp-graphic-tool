export const getTranslateValues = (element: HTMLElement) => {
  const style = getComputedStyle(element);
  const transform = style.transform;

  if (transform === 'none') {
    return { x: 0, y: 0 };
  }

  const match = transform.match(/matrix\(([^)]+)\)/);
  if (match) {
    const values = match[1].split(',').map(Number);
    return {
      x: values[4],
      y: values[5],
    };
  }

  return { x: 0, y: 0 }; // fallback
};
