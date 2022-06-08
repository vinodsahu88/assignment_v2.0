export const THEME_CHANGE = 'THEME_CHANGE';

export const switchMode = mode => {
  return {
    type: THEME_CHANGE,
    payload: mode,
  };
};
