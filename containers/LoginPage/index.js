import React, {memo, useRef, useEffect} from 'react';
import {
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
    Text,
    TextInput,
	ActivityIndicator,
    Keyboard,
	KeyboardAvoidingView,
	Alert
} from 'react-native';

import { withRouter } from "react-router-native";

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { loadLogIn } from './actions';
import makeSelectLogin from './selectors';
import { makeSelectEvent } from '../EventProvider/selectors';

import normalizeFont from '../../utils/normalizing';

const key = 'login';

const dimensions = Dimensions.get('window');

function LoginPage({ login, handleSubmit, event, history }){
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga });

    const inputUsername = useRef(null);
    const inputPassword = useRef(null);
	const inputEventId = useRef(null);
	
	useEffect(() => {
		if(event.uuid != null) {
			history.push('/EventPage');
		}
	}, [event.uuid])

    handleLoginSubmit = () => {
        var username = inputUsername.current._lastNativeText;
        var password = inputPassword.current._lastNativeText;
		var event_id = inputEventId.current._lastNativeText;

        if(username && password && event_id){
            handleSubmit(username, password, event_id);
        } else {
			Alert.alert(
				'The login details you provided are incomplete',
				'Please make sure to enter your username, password, and event ID.',
				[
					{
						text: 'OK'
					}
				],
			)
		}
	}
	
    return(
        <ImageBackground resizeMode='contain' source={require('../../assets/login.png')} style={{ aspectRatio: 1, flex: 1, flexDirection: 'column', height: '100%', justifyContent: 'center', width: '100%' }}>
			<KeyboardAvoidingView behavior="position" enabled>
                <Image
                    style={{ alignSelf:'center', width: dimensions.width*0.85, zIndex:0, alignSelf: 'center', resizeMode:'contain', width:dimensions.width*0.5, height: dimensions.height*0.2 }}
                    source={require('../../assets/logo.png')}>
                </Image>
                <Text style={{ alignSelf:'center', width: dimensions.width*0.85, zIndex:0, fontFamily:'Nunito-SemiBold', fontSize: normalizeFont(30), marginBottom: 25, textAlign: 'center', color:'white' }}>Login</Text>
                <TextInput onSubmitEditing={() => inputPassword.current.focus()} blurOnSubmit={false} ref={inputUsername} autoCorrect={false} clearButtonMode='always' returnKeyType='next' autoCapitalize='none' placeholder='Username' style={{ alignSelf:'center', width: dimensions.width*0.85, zIndex:2, fontFamily:'Nunito-Regular', color: 'rgb(100, 110, 227)', fontSize: normalizeFont(17), paddingLeft: 20, paddingRight: 20, borderRadius: 7, backgroundColor: 'white', height: 50, marginBottom: 15 }}/>
                <TextInput onSubmitEditing={() => inputEventId.current.focus()} ref={inputPassword} blurOnSubmit={false} clearButtonMode='always' returnKeyType='next' autoCapitalize='none' placeholder='Password' secureTextEntry={ true } style={{ alignSelf:'center', width: dimensions.width*0.85, zIndex:2, fontFamily:'Nunito-Regular', color: 'rgb(100, 110, 227)', fontSize: normalizeFont(17), paddingLeft: 20, paddingRight: 20, borderRadius: 7, backgroundColor: 'white', height: 50, marginBottom: 15 }}/>
                <TextInput onSubmitEditing={() => {handleLoginSubmit(); Keyboard.dismiss()}} ref={inputEventId} blurOnSubmit={false} autoCorrect={false} clearButtonMode='always' returnKeyType='go' autoCapitalize='none' placeholder='Event ID' style={{ alignSelf:'center', width: dimensions.width*0.85, zIndex:2, fontFamily:'Nunito-Regular', color: 'rgb(100, 110, 227)', fontSize: normalizeFont(17), paddingLeft: 20, paddingRight: 20, borderRadius: 7, backgroundColor: 'white', height: 50, marginBottom: 30 }}/>
                <TouchableOpacity onPress={() => handleLoginSubmit()} style={{ alignSelf:'center', width: dimensions.width*0.85, zIndex:2, marginBottom:10, borderRadius: 30, backgroundColor: 'rgb(100, 110, 227)' }}>
                    {login.loading ? <ActivityIndicator style={{ color: 'white', padding: 13, textAlign: 'center' }}/> : <Text style={{ fontFamily:'Nunito-Bold', color: 'white', fontSize: normalizeFont(20), padding: 13, textAlign: 'center' }}>Login</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Keyboard.dismiss()} style={{ position:'absolute', zIndex:1, top:0, left:0, width:'100%', height:'100%' }}/>
			</KeyboardAvoidingView>
        </ImageBackground>
    )
}
  
const mapStateToProps = createStructuredSelector({
    login: makeSelectLogin(),
    event: makeSelectEvent()
});
  
export function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (username, password, event_id) => dispatch(loadLogIn(username, password, event_id)),
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
)(LoginPage);
