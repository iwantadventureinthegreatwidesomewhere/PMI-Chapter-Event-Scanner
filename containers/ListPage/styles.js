import { StyleSheet } from 'react-native';
import Layout from '../../constants/layout';

import normalizeFont from '../../utils/normalizing';

export const searchStyle = StyleSheet.create({
    searchInputView: {
		justifyContent: 'center', 
		backgroundColor: 'white', 
		position: 'absolute', 
		left: 40, 
		bottom: 0,
		right: 0, 
		borderRadius: 35, 
		height: 70, 
		zIndex: 1, 
		shadowColor: "#333333", 
		shadowOffset: { width: 0, height: 0,}, 
		shadowOpacity: 0.15, 
		shadowRadius: 12, 
		elevation: 20, 
	},
	container :{
		zIndex:9,
		position: 'absolute',
		height: 70,
		width: '100%',
		aspectRatio: 1,
		bottom: 20,
		right: 0,
	},
	searchView: {
		zIndex:10,
		position: 'absolute',
		height: 70,
		width: 70,
		aspectRatio: 1,
		top: 0,
		right: 20,
	},
	button: {
		position: 'absolute',
		zIndex: 2,
		justifyContent: 'center',
		backgroundColor:'rgb(100, 110, 227)',
		borderRadius: 35,
		height: 70,
		width: 70,
		elevation: 1,
		bottom: 0,
		right: 0,
	},
	image : {
		alignSelf: 'center',
		height: '45%',
		aspectRatio: 1
	},
	textInput : {
		fontFamily:'Nunito-Regular',
		fontSize: normalizeFont(15),
		paddingLeft: 20, 
		paddingRight: 20,
		borderRadius: 35,
		backgroundColor: 'white',
		height: 50,
		marginRight: 70
	},
	overlay: {
		position:'absolute',
		zIndex:1,
		top:0,
		left:0,
		width:'100%',
		height:'100%'
	},
});