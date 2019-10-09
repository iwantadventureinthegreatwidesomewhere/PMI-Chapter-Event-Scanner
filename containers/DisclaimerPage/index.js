import React, {useState, memo} from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    SafeAreaView,
    View,
    ScrollView,
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
import normalizeFont from '../../utils/normalizing';
import posed from 'react-native-pose';
import SideMenu from '../../components/SideMenu'
import {logout} from './../EventProvider/actions';
import layout from '../../constants/layout';
import {makeSelectEvent} from '../EventProvider/selectors';

const { statusBarHeight } = layout;

const key = 'disclaimerPage';

const MainView = posed.View({
    visible: { opacity: 1, transition: { duration: 250 }  },
    hidden: { opacity: 0.25, transition: { duration: 200 } },
});

function DisclaimerPage({ handleLogout, history }){
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga });

    const [menuAnimateState, setMenuAnimateState] = useState(false);
    
    return(
        <SafeAreaView style={{flex:1, height: '100%', width: '100%'}}>
            <View style={{ flex:1, flexDirection:'column', height: '100%', width: '100%' }}>
                <MainView pose={!menuAnimateState ? 'visible' : 'hidden'} style={{ flex: 1, flexDirection:'column', alignSelf: 'center', justifyContent:'space-between', width: '85%', zIndex: 0 }}>
                    <View style={{ marginTop: Platform.OS === 'ios' ? 15 : statusBarHeight, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 50, width: '100%' }}>
                        <View style={{ flex:1, flexDirection:'row', alignSelf:'center', justifyContent:'flex-start' }}>
                            <TouchableOpacity onPress={() => history.goBack()} style={{ alignSelf:'center', padding: 20, margin: -20 }}>
                                <Image
                                    source={require('../../assets/BackPurple.png')}
                                    style={{ height: 20, width: 12 }}>
                                </Image>
                            </TouchableOpacity>

                            <View style={{height: 50, paddingHorizontal: 10, justifyContent: 'center', flex: 1}}>
                                <Text style={{ fontFamily:'Nunito-Bold', fontSize: normalizeFont(23), color:'#646fe3' }}>Disclaimer</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => setMenuAnimateState(true)} style={{ alignSelf:'center'}}>
                            <Image 
                                source={require('../../assets/HamburgerPurple.png')}
                                style={{ height: 30, width: 30 }}>
                            </Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, alignSelf: 'center', height: '100%', width: '100%', marginTop: 15 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{ fontFamily:'Nunito-Bold', color:'#646fe3', fontSize:normalizeFont(33), marginBottom:20 }}>PMI Chapter Event Scanner</Text>
                            
                            <Text style={{ fontFamily:'Nunito-Bold', color:'#C0CACE', fontSize:normalizeFont(24), marginBottom:15 }}>Production</Text>
                            
                            <View style={{ alignSelf: 'center', justifyContent:'center', backgroundColor: '#C0CACE', borderRadius: 10, width:'100%', height:100, marginBottom:15 }}>
                                <Image 
                                    source={require('../../assets/logo.png')}
                                    style={{ alignSelf: 'center', height:'65%', aspectRatio:2.07 }}>
                                </Image>
                            </View>

                            <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize:normalizeFont(16), marginBottom:20 }}>Well-established since 2008, MG2 Media specializes in strategy, development and design of customized web platforms to help our clients achieve their goals.</Text>
                            <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize:normalizeFont(16), marginBottom:20 }}>The success of MG2 Media lies in the way we handle turnkey projects, as well as, in our innovative and unique content management system enabling our clients to manage their website in a flexible and simplified way.</Text>
                            <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize:normalizeFont(16), marginBottom:20 }}>Our team is always there for you: from the preliminary strategic analysis to the launch of the project, we will make sure that your business objectives are met. We also provide complete training on the MG2 Manager, our content management system.</Text>

                            <Text style={{ fontFamily:'Nunito-Bold', color:'#C0CACE', fontSize:normalizeFont(24), marginBottom:10 }}>Team</Text>

                            <Text style={{ fontFamily:'Nunito-Bold', color:'#333333', fontSize:normalizeFont(22), marginBottom:3 }}>Geoffrey Blanc</Text>
                            <Text style={{ fontFamily:'Nunito-Bold', color:'#C0CACE', fontSize:normalizeFont(16), marginBottom:20 }}>Product owner</Text>

                            <Text style={{ fontFamily:'Nunito-Bold', color:'#333333', fontSize:normalizeFont(22), marginBottom:3 }}>Mathieu Castonguay</Text>
                            <Text style={{ fontFamily:'Nunito-Bold', color:'#C0CACE', fontSize:normalizeFont(16), marginBottom:20 }}>CTO</Text>

                            <Text style={{ fontFamily:'Nunito-Bold', color:'#333333', fontSize:normalizeFont(22), marginBottom:3 }}>Mathilde Paccoud</Text>
                            <Text style={{ fontFamily:'Nunito-Bold', color:'#C0CACE', fontSize:normalizeFont(16), marginBottom:20 }}>Backend Developer</Text>

                            <Text style={{ fontFamily:'Nunito-Bold', color:'#333333', fontSize:normalizeFont(22), marginBottom:3 }}>Fabien Lesina</Text>
                            <Text style={{ fontFamily:'Nunito-Bold', color:'#C0CACE', fontSize:normalizeFont(16), marginBottom:20 }}>UI/UX Designer</Text>

                            <Text style={{ fontFamily:'Nunito-Bold', color:'#333333', fontSize:normalizeFont(22), marginBottom:3 }}>Julien Bonté</Text>
                            <Text style={{ fontFamily:'Nunito-Bold', color:'#C0CACE', fontSize:normalizeFont(16), marginBottom:20 }}>Frontend Developer</Text>

                            <Text style={{ fontFamily:'Nunito-Bold', color:'#333333', fontSize:normalizeFont(22), marginBottom:3 }}>Marco Guida</Text>
                            <Text style={{ fontFamily:'Nunito-Bold', color:'#C0CACE', fontSize:normalizeFont(16), marginBottom:20 }}>Super Intern Frontend Developer</Text>
                        </ScrollView>
                    </View>
                </MainView>

                <SideMenu sideMenu={{ menuAnimateState, setMenuAnimateState, handleLogout, history }}/>

            </View>
        </SafeAreaView>
    )
}
  
const mapStateToProps = createStructuredSelector({
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
)(DisclaimerPage);
