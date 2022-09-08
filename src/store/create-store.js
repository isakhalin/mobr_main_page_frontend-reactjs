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
    removeUserProfileFromFBApi,
    updateApplicationToFirebaseApi,
    removeApplicationFromFireBaseApi,
    setApplicationToFirebaseApi,
    getApplicationsFromFireBaseApi,
    getApplicationsFromMongoDBApi,
    sendTicketToFirebaseApi,
    getTicketsFromFirebaseApi,
    changeTicketStatusToFirebaseApi,
    removeUserTicketsFromFBApi,
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
    removeUserProfileFromFBApi,
    updateApplicationToFirebaseApi,
    removeApplicationFromFireBaseApi,
    setApplicationToFirebaseApi,
    getApplicationsFromFireBaseApi,
    getApplicationsFromMongoDBApi,
    sendTicketToFirebaseApi,
    getTicketsFromFirebaseApi,
    changeTicketStatusToFirebaseApi,
    removeUserTicketsFromFBApi,
}

export const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);