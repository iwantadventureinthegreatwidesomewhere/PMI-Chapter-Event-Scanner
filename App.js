import "@babel/polyfill";

import React, { useState } from "react";
import { Text, TouchableOpacity, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { Updates } from "expo";

import { PersistGate } from "redux-persist/integration/react";

import i18n from "./services/i18n";
import configureStore from "./configureStore";

const initialState = {};
const store = configureStore(initialState);

import App from "./containers/App";

function Root() {
  const [appReady, setAppReady] = useState(false);
  const _cachRessourceAsync = async () => {
    const bg = require("./assets/login.png");
    const logo = require("./assets/logo.png");
    try {
      await Promise.all([
        Asset.fromModule(bg).downloadAsync(),
        Asset.fromModule(logo).downloadAsync(),
        Font.loadAsync({
          "Nunito-Bold": require("./assets/Nunito-Bold.ttf"),
          "Nunito-SemiBold": require("./assets/Nunito-SemiBold.ttf"),
          "Nunito-Regular": require("./assets/Nunito-Regular.ttf"),
        }),
        i18n.init(),
      ]);
    } catch (error) {
      throw error;
    }
  };
  if (!appReady) {
    return (
      <AppLoading
        startAsync={_cachRessourceAsync}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  const _purgePersitor = async () => {
    await AsyncStorage.clear();
    await store.persistor.purge();
    Updates.reloadFromCache();
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

export default Root;
