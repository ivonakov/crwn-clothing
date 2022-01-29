import { createStore, applyMiddleware } from 'redux'

import logger from 'redux-logger';
import rootReducer from './root-reducer';

const middleweares = [ logger ]

const store = createStore( rootReducer, applyMiddleware( ...middleweares ) )

export default store