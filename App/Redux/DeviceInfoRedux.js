import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  deviceInfoRequest: ['data'],
  deviceInfoSuccess: ['payload'],
  deviceInfoFailure: null,

  deviceInfoSet: ['data'],
});

export const DeviceInfoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  id: null,
});

/* ------------- Selectors ------------- */

export const DeviceInfoSelectors = {
  getData: state => state.data,
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) => state.merge({ fetching: true, data, payload: null });

// successful api lookup
export const success = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, payload });
};

// Something went wrong somewhere.
export const failure = state => state.merge({ fetching: false, error: true, payload: null });

export const deviceInfoSet = (state, { data }) => {
  return state.merge({ id: data });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEVICE_INFO_SET]: deviceInfoSet,
});
