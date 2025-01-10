import {SET_MODAL_DATA} from '../reducers/system.reducer'
import {store} from '../store'

export function onToggleModal(modalData = null, event = null) {
  if (event) {
    const { top, left, width, height } = event.target.getBoundingClientRect();
    modalData = {
      ...modalData,
      position: { top, left, width, height }, // Store the button's position
    };
  }
  
  store.dispatch({
    type: SET_MODAL_DATA,
    modalData,
  })
}
