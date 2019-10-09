import React, { useEffect, useState, memo } from 'react';
import {
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
    Text,
    TextInput,
    FlatList,
    SafeAreaView,
    View,
    Button
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { withRouter } from "react-router-native";

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import makeSelectGuestPage from './selectors';
import Scanner from '../Scanner';
import {logout} from './../EventProvider/actions';
import LayoutConstants from '../../constants/layout'
import { makeSelectEvent } from '../EventProvider/selectors';
import normalizeFont from '../../utils/normalizing';
import SideMenu from '../../components/SideMenu';
import posed from 'react-native-pose';
import Striptags from 'striptags';

const key = 'guestPage';

const statusBarHeight = LayoutConstants.statusBarHeight;
const dimensions = Dimensions.get('window');

const MainView = posed.View({
    visible: { opacity: 1, transition: { duration: 250 }  },
    hidden: { opacity: 0.25, transition: { duration: 200 } },
});

function GuestPage({ guestPage, eventProvider, handleLogout, history }){
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga });
    
    const [menuAnimateState, setMenuAnimateState] = useState(false);

	useEffect(() => {
        if(eventProvider.uuid == null) {
            history.push('/LoginPage');
        }
        }, [eventProvider]
	);

    return(
        <>
            {eventProvider.uuid != null && <SafeAreaView style={{flex:1, height: '100%', width: '100%'}}>
                <View style={{ backgroundColor:'#C0CACE', flex:1, flexDirection:'column', height: '100%', width: '100%' }}>
                    <MainView pose={!menuAnimateState ? 'visible' : 'hidden'} style={{ flex: 1, flexDirection:'column', alignSelf: 'center', justifyContent:'space-between', width: '85%', zIndex: 0 }}>
                        <View style={{ marginTop:15, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 50, width: '100%' }}>
                            <TouchableOpacity onPress={() => history.push('/ListPage')} style={{ alignSelf:'center', padding: 20, margin: -20 }}>
                                <Image
                                    source={require('../../assets/Back.png')}
                                    style={{ height: 20, width: 12 }}>
                                </Image>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setMenuAnimateState(true)} style={{ alignSelf:'center'}}>
                                <Image 
                                    source={require('../../assets/Hamburger.png')}
                                    style={{ height: 30, width: 30 }}>
                                </Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1,  alignSelf: 'center', height: '100%', width: '100%', marginTop: 15 }}>
                            <Text style={{ fontFamily:'Nunito-Bold', color:'white', fontSize: normalizeFont(23) }}>Information</Text>
                            <View style={{ flex: 1, borderTopLeftRadius:10, borderTopRightRadius:10, backgroundColor: 'white', alignSelf: 'center', height: '100%', width: '100%', marginTop: 15 }}>
                                <View style={{ height: 75, flexDirection:'column', justifyContent:'center', paddingHorizontal:20 }}>
                                    <Text style={{ fontFamily:'Nunito-SemiBold', color:'#C0CACE', fontSize: normalizeFont(15) }}>ID number:</Text>
                                    <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize: normalizeFont(15) }}>{ guestPage.data.pmiNumber }</Text>
                                </View>

                                <View style={{ borderBottomColor: '#EEF0F2', borderBottomWidth: 1}}/>

                                <View style={{ height: 75, flexDirection:'column', justifyContent:'center', paddingHorizontal:20 }}>
                                    <Text style={{ fontFamily:'Nunito-SemiBold', color:'#C0CACE', fontSize: normalizeFont(15) }}>Name:</Text>
                                    <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize: normalizeFont(15) }}>{guestPage.data.firstName} {guestPage.data.lastName}</Text>
                                </View>

                                <View style={{ borderBottomColor: '#EEF0F2', borderBottomWidth: 1}}/>

                                <View style={{ height: 75, flexDirection:'column', justifyContent:'center', paddingHorizontal:20 }}>
                                    <Text style={{ fontFamily:'Nunito-SemiBold', color:'#C0CACE', fontSize: normalizeFont(15) }}>Email:</Text>
                                    <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize: normalizeFont(15) }}>{ guestPage.data.signupEmail != null ? guestPage.data.signupEmail : 'N/A' }</Text>
                                </View>

                                <View style={{ borderBottomColor: '#EEF0F2', borderBottomWidth: 1}}/>

                                <View style={{ height: 100, flexDirection:'column', justifyContent:'center', paddingHorizontal:20 }}>
                                    <Text style={{ fontFamily:'Nunito-SemiBold', color:'#C0CACE', fontSize: normalizeFont(15) }}>Event name:</Text>
                                    <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize: normalizeFont(15) }}>{Striptags(eventProvider.event.description)}</Text>
                                </View>

                                <View style={{ borderBottomColor: '#EEF0F2', borderBottomWidth: 1}}/>

                                <View style={{ height: 75, flexDirection:'column', justifyContent:'center', paddingHorizontal:20 }}>
                                    <Text style={{ fontFamily:'Nunito-SemiBold', color:'#C0CACE', fontSize: normalizeFont(15) }}>Transaction number:</Text>
                                    <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize: normalizeFont(15) }}>{guestPage.data.paymentId}</Text>
                                </View>

                                <View style={{ borderBottomColor: '#EEF0F2', borderBottomWidth: 1}}/>

                                <View style={{ height: 100, flexDirection:'column', justifyContent:'center', paddingHorizontal:20 }}>
                                    <Text style={{ fontFamily:'Nunito-SemiBold', color:'#C0CACE', fontSize: normalizeFont(15), marginBottom:10 }}>Status:</Text>
                                    <View style={{ borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', height: 50, shadowColor: "#333333", shadowOffset: { width: 0, height: 0,}, shadowOpacity: 0.10, shadowRadius: 12, elevation: 20, }}>
                                        <View style={{ alignSelf:'center', backgroundColor: guestPage.data.attended == 'true' ? '#00DB9F' : '#C0CACE', borderRadius: 10, height: 15, aspectRatio: 1, marginHorizontal: 15 }}/>
                                        <Text style={{ fontFamily:'Nunito-Bold', fontSize: normalizeFont(15), alignSelf:'center' }}>{guestPage.data.attended == 'true' ? 'Valid' : 'Invalid'}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', backgroundColor: '#646BEB', position: 'absolute', right: 20, borderRadius: 30, height: 60, aspectRatio: 1, zIndex: 1 }}>
                                <Image 
                                    source={require('../../assets/Profile/Profile.png')}
                                    style={{ alignSelf: 'center', height: '60%', aspectRatio: 1 }}>
                                </Image>
                            </View>
                        </View>
                    </MainView>

                    <SideMenu sideMenu={{ menuAnimateState, setMenuAnimateState, handleLogout, history }}/>
                </View>
            </SafeAreaView>}
        </>
    )
}
  
const mapStateToProps = createStructuredSelector({
	guestPage: makeSelectGuestPage(),
	eventProvider: makeSelectEvent(),
});
  
export function mapDispatchToProps(dispatch) {
    return {
		dispatch,
		handleLogout: () => dispatch(logout()),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
    withRouter
)(GuestPage);
