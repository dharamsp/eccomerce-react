import {createStore, applyMiddleware} from "redux";
import { persistStore} from 'redux-persist';
import logger from "redux-logger"; 
import rootReducer from "./root-reducer.js"; 

const middlewares = [logger]; 

const store = createStore(rootReducer , applyMiddleware(...middlewares));

const persistor = persistStore(store); 

export {
    persistor,
}; 

export default store ;



