import React, {useState, useEffect} from 'react';
import { Dimensions, Image, TouchableOpacity, ActivityIndicator, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { handleScan } from '../ScanProvider/actions';

import saga from '../ScanProvider/saga';
import { useInjectSaga } from '../../utils/injectSaga';

import { createStructuredSelector } from 'reselect';

import {makeSelectEvent} from '../EventProvider/selectors';

const dimensions = Dimensions.get('window');

function Scanner({dispatch, eventProvider}){
	useInjectSaga({ key: 'scan', saga });

	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		getPermissionsAsync();
	},[hasCameraPermission]);

	const getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		setHasCameraPermission(status === 'granted');
	};

	const handleBarCodeScanned = ({ data }) => {
		if(!scanned) {
			dispatch(handleScan(eventProvider.uuid, data));
			setScanned(true)
		}
	};

	if (hasCameraPermission === null) {
		
		return (
			<View
				style={{
				backgroundColor: 'black',
				flex: 4,
				overflow: 'hidden',
				flexDirection: 'column',
				}}>
				<ActivityIndicator size='large' color='white' style={{ marginTop:15, alignSelf:'center' }}/>
			</View>
		);
	}

	if (hasCameraPermission === false) {
		return (
			<View
				style={{
				backgroundColor: 'black',
				flex: 4,
				overflow: 'hidden',
				flexDirection: 'column',
				}}>
				<TouchableOpacity style={{ borderRadius:10, marginTop:15, height:35, width:'85%', justifyContent:'center', alignSelf:'center', backgroundColor:'white' }} onPress={() => getPermissionsAsync()}>
					<Text style={{ fontFamily:'Nunito-Bold', color: '#333333', fontSize: 13, textAlign: 'center' }}>ENABLE CAMERA</Text>
				</TouchableOpacity>	
			</View>
		);
		return ;
	}

	return (
		<View
		  style={{
			backgroundColor: 'black',
			flex: 4,
			overflow: 'hidden',
			flexDirection: 'column',
			justifyContent: 'center',
		  }}>
		  <BarCodeScanner
			barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
			onBarCodeScanned={handleBarCodeScanned}
			style={{ position:'absolute', left:0, top:0, height:'100%', width:'100%' }}
		  />
		  <Image 
			style={{alignSelf: 'center', width:dimensions.width*0.75, height:dimensions.width*0.75 }}
			source={require('../../assets/crosshairs.png')}/>
		</View>
	  );
}

const mapStateToProps = createStructuredSelector({
    eventProvider: makeSelectEvent()
});

export function mapDispatchToProps(dispatch) {
  return {
	dispatch,
  };
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
  withConnect,
)(Scanner);