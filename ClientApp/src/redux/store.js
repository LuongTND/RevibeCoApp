﻿import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
),);

export default store;