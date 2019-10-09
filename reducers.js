/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ['login', 'scan', 'listPage', 'guestPage']
  // stateReconciler: autoMergeLevel2,
};

import globalReducer from './containers/App/reducer';
import languageProviderReducer from './containers/LanguageProvider/reducer';
import eventProviderReducer from './containers/EventProvider/reducer';
import scanProviderReducer from './containers/ScanProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    event: eventProviderReducer ,
    scan: scanProviderReducer,
    ...injectedReducers,
  });

  return persistReducer(persistConfig ,rootReducer);
}