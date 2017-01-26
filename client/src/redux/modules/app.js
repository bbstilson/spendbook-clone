import View from '../../constants/View';

// Constants
const CHANGE_VIEW = 'CHANGE_VIEW';

export function changeView(view) {
  return {
    view,
    type: CHANGE_VIEW
  };
}

const initialState = {
  activeView: View.OVERVIEW
};

export default (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        activeView: action.view
      };
    default:
      return state;
  }
}
