import {
  GET_APPLICATIONS_START,
  GET_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_ERROR,
  UPDATE_APPLICATION_START,
  UPDATE_APPLICATION_SUCCESS,
  UPDATE_APPLICATION_ERROR,
  REMOVE_APPLICATION_START,
  REMOVE_APPLICATION_SUCCESS,
  REMOVE_APPLICATION_ERROR
} from './types';

const ApplicationState = {
  applications: [],
  status: {
    pendingGet: false,
    errorGet: null,
    pendingUpdate: false,
    errorUpdate: null,
    pendingRemove: false,
    errorRemove: null,
  }
}

export const ApplicationReducer = (state = ApplicationState, action) => {
  switch (action.type) {
    case GET_APPLICATIONS_START:
      return {
        ...state,
        status: {pendingGet: true, errorGet: null}
      };
    case GET_APPLICATIONS_SUCCESS:
      return {
        ...state,
        applications: [...action.payload],
        status: {...state.status, pendingGet: false}
      };
    case GET_APPLICATIONS_ERROR:
      return {
        ...state,
        status: {...state.status, pendingGet: false, errorGet: action.payload}
      };
    case UPDATE_APPLICATION_START:
      return {
        ...state,
        status: {...state.status, pendingUpdate: true, errorUpdate: null}
      };
    case UPDATE_APPLICATION_SUCCESS:
      state.applications.map((el) => {
        if (el._id === action.payload.partOfApplication._id) {
          el.isComplete = action.payload.partOfApplication.isComplete;
        }
      });
      return {
        ...state,
        status: {...state.status, pendingUpdate: false}
      };
    case UPDATE_APPLICATION_ERROR:
      return {
        ...state,
        status: {...state.status, pendingUpdate: false, errorUpdate: action.payload}
      };
    case REMOVE_APPLICATION_START:
      return {
        ...state,
        status: {...state.status, pendingRemove: true, errorRemove: null}
      };
    case REMOVE_APPLICATION_SUCCESS:
      state.applications.map((application) => {
        if (application._id === action.payload) {
          state.applications.splice(state.applications.indexOf(application), 1);
        }
      });
      return {
        ...state,
        status: {...state.status, pendingRemove: false}
      };
    case REMOVE_APPLICATION_ERROR:
      return {
        ...state,
        status: {...state.status, pendingRemove: false, errorRemove: action.payload}
      };
    default:
      return state;
  }
}
