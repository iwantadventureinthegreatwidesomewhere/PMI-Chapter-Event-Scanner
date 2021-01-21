import React, { useState, useEffect, memo } from "react";
import {
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  FlatList,
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
import makeSelectListPage from "./selectors";
import { makeSelectEvent } from "../EventProvider/selectors";
import normalizeFont from "../../utils/normalizing";
import { loadGuests } from "../EventProvider/actions";
import { loadGuestData } from "../GuestPage/actions";
import posed, { Transition } from "react-native-pose";
import Search from "./search";
import SideMenu from "../../components/SideMenu";
import { logout } from "./../EventProvider/actions";
import { search, dumpSearch } from "./actions";
import layout from "../../constants/layout";

const { dimensions, statusBarHeight } = layout;

const MainView = posed.View({
  visible: { opacity: 1, transition: { duration: 250 } },
  hidden: { opacity: 0.25, transition: { duration: 200 } },
});

const DetailsView = posed.View({
  enter: { opacity: 1, scale: 1, transition: { duration: 250 } },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 200 } },
});

const key = "listPage";

function ListPage({
  listPage,
  eventProvider,
  handleSearch,
  handleSearchDump,
  handleLoadList,
  handleLoadGuestPage,
  handleLogout,
  history,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [latestState, setLatestState] = useState(null);
  const [detailAnimateState, setDetailAnimateState] = useState(false);
  const [searchAnimateState, setSearchAnimateState] = useState(false);
  const [menuAnimateState, setMenuAnimateState] = useState(false);

  useEffect(() => {
    if (eventProvider.uuid == null) {
      history.push("/LoginPage");
    }

    if (eventProvider.uuid != null && eventProvider.event != null) {
      handleLoadList(eventProvider.uuid, eventProvider.event.id);
    }
  }, [eventProvider]);

  useEffect(() => {
    handleSearchChange(listPage.searchValue);
  }, [listPage.searchValue]);

  useEffect(() => {
    return () => {
      handleSearchDump();
    };
  }, []);

  function handleSearchChange(val) {
    handleSearch(val, eventProvider.guests);
  }

  function ItemTapped(item) {
    setDetailAnimateState(true);
    setLatestState(item);
  }

  const shadowStyle = () => {
    switch (Platform.OS) {
      case "ios":
        return {
          shadowColor: "#333333",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 19,
        };
      default:
        return { elevation: 5 };
    }
  };

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
              pose={
                !detailAnimateState && !searchAnimateState && !menuAnimateState
                  ? "visible"
                  : "hidden"
              }
              style={{
                flex: 1,
                flexDirection: "column",
                alignSelf: "center",
                justifyContent: "space-between",
                width: "85%",
                zIndex: 0,
              }}
            >
              <View
                style={{
                  marginTop: Platform.OS === "ios" ? 15 : statusBarHeight,
                  alignSelf: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: 50,
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() => history.push("/EventPage")}
                  style={{ alignSelf: "center", padding: 20, margin: -20 }}
                >
                  <Image
                    source={require("../../assets/BackPurple.png")}
                    style={{ height: 20, width: 12 }}
                  ></Image>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setMenuAnimateState(true)}
                  style={{ alignSelf: "center" }}
                >
                  <Image
                    source={require("../../assets/HamburgerPurple.png")}
                    style={{ height: 30, width: 30 }}
                  ></Image>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 1,
                  alignSelf: "center",
                  height: "100%",
                  width: "100%",
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Nunito-Bold",
                    color: "#646fe3",
                    fontSize: normalizeFont(25),
                  }}
                >
                  Guest list
                </Text>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ paddingVertical: 20, marginHorizontal: -20 }}
                  keyExtractor={(item) => item.id}
                  data={listPage.guestList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => ItemTapped(item)}
                      style={{
                        marginHorizontal: 20,
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                        borderRadius: 10,
                        height: 50,
                        marginVertical: 7,
                        ...shadowStyle(),
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignSelf: "center",
                        }}
                      >
                        <View
                          style={{
                            alignSelf: "center",
                            backgroundColor:
                              item.attended == "true" ? "#00DB9F" : "#C0CACE",
                            borderRadius: 10,
                            height: 15,
                            aspectRatio: 1,
                            marginHorizontal: 15,
                          }}
                        />
                        <Text
                          style={{
                            alignSelf: "center",
                            fontFamily: "Nunito-Bold",
                            color: "#333333",
                            fontSize: normalizeFont(20),
                          }}
                        >
                          {item.firstName} {item.lastName}
                        </Text>
                      </View>

                      <Text
                        style={{
                          alignSelf: "center",
                          marginHorizontal: 15,
                          fontFamily: "Nunito-Regular",
                          color: "#C0CACE",
                          fontSize: normalizeFont(17),
                        }}
                      >
                        {item.pmiNumber}
                      </Text>
                    </TouchableOpacity>
                  )}
                ></FlatList>
              </View>
            </MainView>

            {detailAnimateState && (
              <TouchableOpacity
                onPress={() => setDetailAnimateState(false)}
                style={{
                  position: "absolute",
                  zIndex: 4,
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            )}

            <Transition>
              {latestState && detailAnimateState && (
                <DetailsView
                  key={"1"}
                  style={{
                    shadowColor: "#333333",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.25,
                    shadowRadius: 12,
                    elevation: 19,
                    alignSelf: "center",
                    borderRadius: 10,
                    position: "absolute",
                    top: dimensions.height * 0.3,
                    height: 263,
                    width: "85%",
                    zIndex: 5,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 10,
                      backgroundColor: "white",
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderRadius: 10,
                        height: 60,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignSelf: "center",
                        }}
                      >
                        <View
                          style={{
                            alignSelf: "center",
                            backgroundColor:
                              latestState.attended == "true"
                                ? "#00DB9F"
                                : "#C0CACE",
                            borderRadius: 10,
                            height: 15,
                            aspectRatio: 1,
                            marginHorizontal: 15,
                          }}
                        />
                        <Text
                          style={{
                            alignSelf: "center",
                            fontFamily: "Nunito-Bold",
                            color: "#333333",
                            fontSize: normalizeFont(20),
                          }}
                        >
                          {latestState.firstName} {latestState.lastName}
                        </Text>
                      </View>

                      <Text
                        style={{
                          alignSelf: "center",
                          marginHorizontal: 15,
                          fontFamily: "Nunito-Regular",
                          color: "#C0CACE",
                          fontSize: normalizeFont(17),
                        }}
                      >
                        {latestState.pmiNumber}
                      </Text>
                    </View>

                    <View
                      style={{
                        borderBottomColor: "#EEF0F2",
                        borderBottomWidth: 1,
                      }}
                    />

                    <View
                      style={{
                        height: 75,
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Nunito-SemiBold",
                          color: "#C0CACE",
                          fontSize: normalizeFont(15),
                        }}
                      >
                        Email:
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Nunito-Regular",
                          color: "#333333",
                          fontSize: normalizeFont(15),
                        }}
                      >
                        {latestState.signupEmail != null
                          ? latestState.signupEmail
                          : "N/A"}
                      </Text>
                    </View>

                    <View
                      style={{
                        borderBottomColor: "#EEF0F2",
                        borderBottomWidth: 1,
                      }}
                    />

                    <View
                      style={{
                        height: 75,
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Nunito-SemiBold",
                          color: "#C0CACE",
                          fontSize: normalizeFont(15),
                        }}
                      >
                        Transaction number:
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Nunito-Regular",
                          color: "#333333",
                          fontSize: normalizeFont(15),
                        }}
                      >
                        {latestState.paymentId}
                      </Text>
                    </View>

                    <View
                      style={{
                        borderBottomColor: "#EEF0F2",
                        borderBottomWidth: 1,
                      }}
                    />

                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          handleLoadGuestPage(latestState);
                          history.push("/GuestPage");
                        }}
                        style={{
                          flexDirection: "row",
                          borderRadius: 10,
                          height: 49.5,
                          width: "50%",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../../assets/Plus/Plus.png")}
                            style={{
                              marginHorizontal: 10,
                              alignSelf: "center",
                              height: 30,
                              width: 30,
                            }}
                          ></Image>
                          <Text
                            style={{
                              marginRight: 10,
                              alignSelf: "center",
                              fontFamily: "Nunito-Bold",
                              color: "#C0CACE",
                              fontSize: normalizeFont(20),
                            }}
                          >
                            Details
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <View
                        style={{
                          borderRightColor: "#EEF0F2",
                          borderRightWidth: 1,
                        }}
                      />

                      <TouchableOpacity
                        onPress={() => history.push("/ScanPage")}
                        style={{
                          flexDirection: "row",
                          borderRadius: 10,
                          height: 49.5,
                          width: "50%",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../../assets/Checkmark/Checkmark.png")}
                            style={{
                              marginHorizontal: 10,
                              alignSelf: "center",
                              height: 30,
                              width: 30,
                            }}
                          ></Image>
                          <Text
                            style={{
                              marginRight: 10,
                              alignSelf: "center",
                              fontFamily: "Nunito-Bold",
                              color: "#00DB9F",
                              fontSize: normalizeFont(20),
                            }}
                          >
                            Validate
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </DetailsView>
              )}
            </Transition>

            <SideMenu
              sideMenu={{
                menuAnimateState,
                setMenuAnimateState,
                handleLogout,
                history,
              }}
            />

            <Search
              searchValue={listPage.searchValue}
              search={{
                handleSearchChange,
                searchAnimateState,
                setSearchAnimateState,
                detailAnimateState,
                menuAnimateState,
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  listPage: makeSelectListPage(),
  eventProvider: makeSelectEvent(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSearch: (val, guestList) => dispatch(search(val, guestList)),
    handleSearchDump: () => dispatch(dumpSearch()),
    handleLoadList: (uuid, eventId) => dispatch(loadGuests(uuid, eventId)),
    handleLoadGuestPage: (data) => dispatch(loadGuestData(data)),
    handleLogout: () => dispatch(logout()),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, withRouter)(ListPage);
