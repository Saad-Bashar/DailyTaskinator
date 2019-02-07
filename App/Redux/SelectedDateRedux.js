import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'



const { Types, Creators } = createActions({
  setSelectedDate: ['selectedDate'],
})

export const selectedDateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  selectedDate: '',
})

/* ------------- Reducers ------------- */

export const setSelectedDate = (state, { selectedDate }) => {
  return state.merge({ selectedDate })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SELECTED_DATE]: setSelectedDate,
})
