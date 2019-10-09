import React, {useEffect, useState, memo} from 'react';
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
import {makeSelectEvent} from '../EventProvider/selectors';
import {makeSelectScan} from '../ScanProvider/selectors';
import Scanner from '../Scanner';
import { reset } from '../ScanProvider/actions';
import normalizeFont from '../../utils/normalizing';
import LayoutConstants from '../../constants/layout'
import Striptags from 'striptags';
import posed from 'react-native-pose';
import SideMenu from '../../components/SideMenu'
import {logout} from './../EventProvider/actions';

const key = 'scanPage';

const statusBarHeight = LayoutConstants.statusBarHeight;
const dimensions = Dimensions.get('window');

const MainView = posed.View({
    visible: { opacity: 1, transition: { duration: 250 }  },
    hidden: { opacity: 0.25, transition: { duration: 200 } },
});

function ScanPage({ eventProvider, scanProvider, handleReset, handleLogout, history }){
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga });
    
    const [menuAnimateState, setMenuAnimateState] = useState(false);

    useEffect(() => {
        if(eventProvider.uuid == null) {
            history.push('/LoginPage');
        }
        }, [eventProvider]
	);
    
    if(scanProvider.successful) {
        handleReset();
        history.push('/SuccessPage');
    }

    if(scanProvider.failure) {
        handleReset();
        history.push('/FailurePage');
    }

    return(
        <>
            {eventProvider.uuid != null && <SafeAreaView style={{flex:1, height: '100%', width: '100%'}}>
                <View style={{flex:1, flexDirection:'column', height: '100%', width: '100%'}}>
                    <MainView pose={!menuAnimateState ? 'visible' : 'hidden'} style={{ flex: 1, flexDirection:'column', alignSelf: 'center', justifyContent:'space-between', width: '100%', zIndex: 0 }}>
                        <View style={{ flex: 1, backgroundColor: 'rgb(100, 110, 227)' }}>
                            <View style={{ marginTop: Platform.OS === 'ios' ? 15 : statusBarHeight, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 50, width: '85%' }}>
                                <TouchableOpacity style={{ alignSelf:'center', padding: 20, margin: -20 }} onPress={() => history.push('/EventPage')}>
                                    <Image
                                        source={require('../../assets/Back.png')}
                                        style={{ height: 20, width: 12 }}>
                                    </Image>
                                </TouchableOpacity>
								<View style={{height: 50, alignItems: 'center', paddingHorizontal: 8, justifyContent: 'center', flex: 1}}>
                                	<Text style={{ fontFamily:'Nunito-Bold', fontSize: normalizeFont(14), color:'white' }}>PMI CHAPTER EVENT SCANNER</Text>
								</View>
                                <TouchableOpacity onPress={() => setMenuAnimateState(true)} style={{ alignSelf:'center'}}>
                                    <Image 
                                        source={require('../../assets/Hamburger.png')}
                                        style={{ height: 30, width: 30 }}>
                                    </Image>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, alignSelf:'center', flexDirection:'column', justifyContent:'flex-end', width:dimensions.width*0.85, paddingBottom:15 }}>
                                <Text style={{ fontFamily:'Nunito-Bold', fontSize: normalizeFont(23), color:'white' }}>Scan your code</Text>
                            </View>
                        </View>

                        <View style={{ flex: 5, flexDirection:'column', justifyContent:'center', height: '100%', width: '100%' }}>
                            <View style={{ flex: 5 }}>
                                <Scanner/>
                            </View>

                            <View style={{ width:dimensions.width*0.85 , flex: 1, alignSelf:'center' }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 15, alignSelf: 'center', width: '100%' }}>
                                    <View style={{ justifyContent:'center', shadowColor: "#333333", shadowOffset: { width: 0, height: 9,}, shadowOpacity: 0.25, shadowRadius: 12, elevation: 19, minHeight:100, flexDirection: 'column', marginBottom:15, borderRadius: 10, paddingHorizontal: 15, backgroundColor: 'white'}}>
                                        <Text style={{ fontFamily:'Nunito-Bold', marginVertical:15, color: '#333333', fontSize: normalizeFont(15),  textAlign: 'center' }}>{ Striptags(eventProvider.event.description) }</Text>
                                        <Text style={{ fontFamily:'Nunito-Bold', marginBottom:15, color: 'lightgray', fontSize: normalizeFont(15), textAlign: 'center' }}>{eventProvider.event.timeStart} to {eventProvider.event.timeEnd}</Text>
                                    </View>
                                </View>
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
    eventProvider: makeSelectEvent(),
    scanProvider: makeSelectScan(),
});
  
export function mapDispatchToProps(dispatch) {
    return {
        handleReset: () => dispatch(reset()),
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
	withRouter,
)(ScanPage);
