import {THEME_CHANGE} from './ThemeAction';

export type Mode = 'dark' | 'light';

interface ThemeStore {
  mode: Mode;
}

const initialState: ThemeStore = {
  mode: 'light',
};

const ThemeReducer = (
  state = initialState,
  action: {payload: any; type: any},
) => {
  console.log('Theme :::::::', action.payload);
  switch (action.type) {
    case THEME_CHANGE:
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
