const KEYS = {
  'ESC': 27
};

export const testKeyPressed = (key, flag) => {
  switch (flag) {
    case 'ESC':
      return key === KEYS[flag];
  }
  return false;
}
