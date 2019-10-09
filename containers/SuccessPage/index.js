import React, { useState, useEffect, memo } from 'react';
import {
    TouchableOpacity,
    Dimensions,
    Image,
    Text,
    SafeAreaView,
    View,
    Platform
} from 'react-native';
import { withRouter } from "react-router-native";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectSuccessPage from './selectors';
import normalizeFont from '../../utils/normalizing';
import LayoutConstants from '../../constants/layout'
import posed from 'react-native-pose';
import SideMenu from '../../components/SideMenu'
import {logout} from './../EventProvider/actions';
import {makeSelectEvent} from '../EventProvider/selectors';

const key = 'successPage';

const statusBarHeight = LayoutConstants.statusBarHeight;
const dimensions = Dimensions.get('window');

const MainView = posed.View({
    visible: { opacity: 1, transition: { duration: 250 }  },
    hidden: { opacity: 0.25, transition: { duration: 200 } },
});

function SuccessPage({ eventProvider, handleLogout, history }){
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga });

    const [menuAnimateState, setMenuAnimateState] = useState(false);

    useEffect(() => {
        if(eventProvider.uuid == null) {
            history.push('/LoginPage');
        }
        }, [eventProvider.uuid]
	);

    return(
        <SafeAreaView style={{flex:1, height: '100%', width: '100%'}}>
            <View style={{ flex:1, height: '100%', width: '100%' }}>
                <MainView pose={!menuAnimateState ? 'visible' : 'hidden'} style={{ height: '100%', width: '100%', zIndex: 0}}>
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                        <Image 
                            source={require('../../assets/ValidBackground.jpg')} 
                            style={{alignSelf: 'center', aspectRatio: 1, flex: 8}}>
                        </Image>
                        <View style={{ flex: 1 }}/>
                    </View>

                    <View style={{ flex: 1, flexDirection:'column', alignSelf: 'center', justifyContent:'space-between', width: '85%' }}>
                        <View style={{ marginTop: Platform.OS === 'ios' ? 15 : statusBarHeight, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 50, width: '100%' }}>
                            <TouchableOpacity onPress={() => history.push('/ScanPage')} style={{ alignSelf:'center', padding: 20, margin: -20 }}>
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

                        <View style={{ justifyContent:'center' }}>
                            <View style={{ alignSelf: 'center', justifyContent:'center', backgroundColor: 'white', borderRadius: 10, width: '40%', aspectRatio: 1 }}>
                                <Image 
                                    source={require('../../assets/Checkmark/Checkmark.png')}
                                    style={{ alignSelf: 'center', height: '65%', aspectRatio: 1 }}>
                                </Image>
                            </View>

                            <Text style={{ marginTop:20, alignSelf: 'center', fontFamily:'Nunito-Bold', fontSize:normalizeFont(35), color:'white' }}>Scan valid</Text>
                        </View>
                        
                        <View style={{ alignSelf: 'center', width: '100%', marginBottom: 25 }}>
                            <TouchableOpacity onPress={() => history.push('/ScanPage')} style={{ flexDirection: 'row', marginBottom:15, borderRadius: 10, height:100, backgroundColor: 'white', shadowColor: "#333333", shadowOffset: { width: 0, height: 9,}, shadowOpacity: 0.25, shadowRadius: 12, elevation: 19,}}>
                                <View style={{ flex:1, flexDirection:'row' }}>
                                    <View style={{ borderBottomLeftRadius:10, borderTopLeftRadius:10, height: '100%', width: 10, backgroundColor: 'rgb(100, 110, 227)' }}/>
                                    <Image 
                                        source={require('../../assets/Scan.png')}  
                                        style={{ alignSelf:'center', marginHorizontal:20, height: 40, width: 40 }}>
                                    </Image>
                                    <Text style={{ fontFamily:'Nunito-Bold', alignSelf:'center', color: '#333333', fontSize:normalizeFont(22), textAlign: 'center' }}>New scan</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </MainView>

                <SideMenu sideMenu={{ menuAnimateState, setMenuAnimateState, handleLogout, history }}/>
            </View>
        </SafeAreaView>
    )
}
  
const mapStateToProps = createStructuredSelector({
    successPage: makeSelectSuccessPage(),
    eventProvider: makeSelectEvent()
});
  
export function mapDispatchToProps(dispatch) {
    return {
        handleLogout: () => dispatch(logout()),
        dispatch
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
)(SuccessPage);
