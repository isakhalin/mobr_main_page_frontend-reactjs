import React from "react";
import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from "redux"

import thunk from "redux-thunk"

/** include Api */
import {
    getProfileFromFirebaseApi,
    setProfileToFirebaseApi,
    getAllProfilesFromFirebaseApi,
    updateApplicationToFirebaseApi,
    removeApplicationFromFireBaseApi,
    setApplicationToFirebaseApi,
    getApplicationsFromFireBaseApi,
    sendTicketToFirebaseApi,
    getTicketsFromFirebaseApi,
    changeTicketStatusToFirebaseApi,
} from '../api'

/** include reducers */
import { ProfileReducer } from '../store/profile';
import { TicketReducer } from '../store/tickets';
import { ApplicationReducer } from '../store/applications';

const rootReducers = combineReducers({
    profile: ProfileReducer,
    tickets: TicketReducer,
    applications: ApplicationReducer,
});

const api = {
    getProfileFromFirebaseApi,
    setProfileToFirebaseApi,
    getAllProfilesFromFirebaseApi,
    updateApplicationToFirebaseApi,
    removeApplicationFromFireBaseApi,
    setApplicationToFirebaseApi,
    getApplicationsFromFireBaseApi,
    sendTicketToFirebaseApi,
    getTicketsFromFirebaseApi,
    changeTicketStatusToFirebaseApi,
}

export const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);