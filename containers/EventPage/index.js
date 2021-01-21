import React, { useState, useEffect, memo } from "react";
import {
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  SafeAreaView,
  View,
  Platform,
} from "react-native";

import { withRouter } from "react-router-native";

import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { useInjectReducer } from "../../utils/injectReducer";
import { useInjectSaga } from "../../utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";
import { makeSelectEvent } from "../EventProvider/selectors";
import normalizeFont from "../../utils/normalizing";
import { t } from "../../services/i18n";
import Striptags from "striptags";
import posed from "react-native-pose";
import SideMenu from "../../components/SideMenu";
import { logout } from "./../EventProvider/actions";
import layout from "../../constants/layout";
import { loadGuests } from "../EventProvider/actions";

const key = "eventPage";

const dimensions = Dimensions.get("window");

const MainView = posed.View({
  visible: { opacity: 1, transition: { duration: 250 } },
  hidden: { opacity: 0.25, transition: { duration: 200 } },
});

function EventPage({ eventProvider, handleLoadList, handleLogout, history }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [menuAnimateState, setMenuAnimateState] = useState(false);

  useEffect(() => {
    if (eventProvider.uuid == null) {
      history.push("/LoginPage");
    }

    if (eventProvider.uuid != null && eventProvider.event != null) {
      handleLoadList(eventProvider.uuid, eventProvider.event.id);
    }
  }, [eventProvider]);

  return (
    <>
      {eventProvider.uuid != null && (
        <SafeAreaView style={{ flex: 1, height: "100%", width: "100%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            <MainView
              pose={!menuAnimateState ? "visible" : "hidden"}
              style={{ height: "100%", width: "100%", zIndex: 0 }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 0,
                }}
              >
                <Image
                  source={require("../../assets/iStock-597940046.jpg")}
                  style={{ alignSelf: "center", aspectRatio: 1, flex: 7 }}
                ></Image>
                <View style={{ flex: 4 }} />
              </View>

              <View
                style={{
                  alignSelf: "center",
                  height: "100%",
                  width: dimensions.width * 0.85,
                  zIndex: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => setMenuAnimateState(true)}
                  style={{
                    alignSelf: "flex-end",
                    marginTop:
                      Platform.OS === "ios" ? 25 : layout.statusBarHeight + 10,
                  }}
                >
                  <Image
                    source={require("../../assets/Hamburger.png")}
                    style={{ height: 30, width: 30 }}
                  ></Image>
                </TouchableOpacity>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    marginBottom: 25,
                    alignSelf: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      padding: 20,
                      shadowColor: "#333333",
                      shadowOffset: { width: 0, height: 9 },
                      shadowOpacity: 0.25,
                      shadowRadius: 12,
                      elevation: 19,
                      borderRadius: 10,
                      marginBottom: 25,
                      backgroundColor: "white",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Nunito-Bold",
                        marginBottom: 3,
                        fontSize: normalizeFont(22),
                        color: "rgb(100, 110, 227)",
                      }}
                    >
                      Your event on
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Nunito-Bold",
                        marginBottom: 15,
                        fontSize: normalizeFont(28),
                        color: "rgb(100, 110, 227)",
                      }}
                    >
                      {t("date", { date: eventProvider.event.listDate })}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Nunito-Bold",
                        marginBottom: 10,
                        fontSize: normalizeFont(15),
                        color: "#333333",
                      }}
                    >
                      {Striptags(eventProvider.event.description)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => history.push("/ListPage")}
                    style={{
                      flexDirection: "row",
                      marginBottom: 15,
                      borderRadius: 10,
                      height: 100,
                      backgroundColor: "white",
                      shadowColor: "#333333",
                      shadowOffset: { width: 0, height: 9 },
                      shadowOpacity: 0.25,
                      shadowRadius: 12,
                      elevation: 19,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        height: "100%",
                      }}
                    >
                      <View
                        style={{
                          borderBottomLeftRadius: 10,
                          borderTopLeftRadius: 10,
                          height: "100%",
                          width: 10,
                          backgroundColor: "rgb(96, 213, 234)",
                        }}
                      />
                      <Image
                        source={require("../../assets/List.png")}
                        style={{
                          marginHorizontal: 20,
                          alignSelf: "center",
                          height: 52,
                          width: 40,
                        }}
                      ></Image>
                      <Text
                        allowFontScaling={true}
                        style={{
                          fontFamily: "Nunito-Bold",
                          alignSelf: "center",
                          color: "#333333",
                          fontSize: normalizeFont(22),
                          textAlign: "center",
                        }}
                      >
                        Browse guest list
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => history.push("/ScanPage")}
                    style={{
                      flexDirection: "row",
                      marginBottom: 15,
                      borderRadius: 10,
                      height: 100,
                      backgroundColor: "white",
                      shadowColor: "#333333",
                      shadowOffset: { width: 0, height: 9 },
                      shadowOpacity: 0.25,
                      shadowRadius: 12,
                      elevation: 19,
                    }}
                  >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View
                        style={{
                          borderBottomLeftRadius: 10,
                          borderTopLeftRadius: 10,
                          height: "100%",
                          width: 10,
                          backgroundColor: "rgb(100, 110, 227)",
                        }}
                      />
                      <Image
                        source={require("../../assets/Scan.png")}
                        style={{
                          alignSelf: "center",
                          marginHorizontal: 20,
                          height: 40,
                          width: 40,
                        }}
                      ></Image>
                      <Text
                        style={{
                          fontFamily: "Nunito-Bold",
                          alignSelf: "center",
                          color: "#333333",
                          fontSize: normalizeFont(22),
                          textAlign: "center",
                        }}
                      >
                        New scan
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </MainView>

            <SideMenu
              sideMenu={{
                menuAnimateState,
                setMenuAnimateState,
                handleLogout,
                history,
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  eventProvider: makeSelectEvent(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadList: (uuid, eventId) => dispatch(loadGuests(uuid, eventId)),
    handleLogout: () => dispatch(logout()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, withRouter)(EventPage);
