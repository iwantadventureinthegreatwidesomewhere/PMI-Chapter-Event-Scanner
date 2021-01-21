import React, { memo, useEffect, useState } from "react";
import { View, AsyncStorage } from "react-native";
import { Route, NativeRouter } from "react-router-native";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import i18next from "i18next";

import MyStorage from "../../constants/myStorage";

import { makeSelectLocale } from "../LanguageProvider/selectors";
import { changeLocale } from "../LanguageProvider/actions";

import { styles } from "./styles";

import EventPage from "../EventPage";
import FailurePage from "../FailurePage";
import GuestPage from "../GuestPage";
import ListPage from "../ListPage";
import LoginPage from "../LoginPage";
import ScanPage from "../ScanPage";
import SuccessPage from "../SuccessPage";
import DisclaimerPage from "../DisclaimerPage";
import { useInjectSaga } from "../../utils/injectSaga";
import eventProviderSaga from "../EventProvider/saga";
import scanProviderSaga from "../ScanProvider/saga";
import { useInjectReducer } from "../../utils/injectReducer";
import guestPageReducer from "../GuestPage/reducer";

function App({ lang, handleSetLocale }) {
  const [localized, setLocalized] = useState(false);
  const _handleChangeLang = async (locale) => {
    if (locale !== "") {
      await i18next.changeLanguage(locale);
      setLocalized(!localized);
      await AsyncStorage.setItem(MyStorage.LANG, locale);
    } else {
      const currentLang = await AsyncStorage.getItem(MyStorage.LANG);
      handleSetLocale(currentLang);
    }
  };
  useEffect(() => {
    _handleChangeLang(lang);
  }, [lang]);

  useInjectReducer({ key: "guestPage", reducer: guestPageReducer });

  useInjectSaga({ key: "event", saga: eventProviderSaga });
  useInjectSaga({ key: "scan", saga: scanProviderSaga });

  return (
    <NativeRouter>
      <View style={styles.container}>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/EventPage" component={EventPage} />
        <Route exact path="/FailurePage" component={FailurePage} />
        <Route exact path="/GuestPage" component={GuestPage} />
        <Route exact path="/ListPage" component={ListPage} />
        <Route exact path="/LoginPage" component={LoginPage} />
        <Route exact path="/ScanPage" component={ScanPage} />
        <Route exact path="/SuccessPage" component={SuccessPage} />
        <Route exact path="/DisclaimerPage" component={DisclaimerPage} />
      </View>
    </NativeRouter>
  );
}

const mapStateToProps = createStructuredSelector({
  lang: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleSetLocale: (locale) => dispatch(changeLocale(locale)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(App);
