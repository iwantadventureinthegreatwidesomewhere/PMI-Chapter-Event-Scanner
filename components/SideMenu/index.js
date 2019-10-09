import React from 'react';
import {
    Dimensions,
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import posed, { Transition } from 'react-native-pose';
import normalizeFont from '../../utils/normalizing';
import Constants from 'expo-constants';

const dimensions = Dimensions.get('window');

const MenuView = posed.View({
    enter: { left:0, transition: { duration: 250 } },
    exit: { left:-(dimensions.width*0.66), transition: { duration: 200 } },
});

function SideMenu({ sideMenu: {menuAnimateState, setMenuAnimateState, handleLogout, history }}){
    return(
        <>
        {menuAnimateState && <TouchableOpacity onPress={() => setMenuAnimateState(false)} style={{ position:'absolute', zIndex:100, top:0, left:0, width:'100%', height:'100%' }}/>}
            <Transition>
                {menuAnimateState && <MenuView key={'3'} style={{ justifyContent: 'space-around', flexDirection: 'column', position: 'absolute', left: 0, top: 0, backgroundColor:'white', height:'100%', width: '66%', zIndex: 101, shadowColor: "#333333", shadowOffset: { width: 0, height: 0,}, shadowOpacity: 0.15, shadowRadius: 12, elevation: 19, }}>
                    <View>
                        <TouchableOpacity onPress={() => history.push('/EventPage')} style={{ flexDirection: 'row', height: 60, backgroundColor: 'white', marginTop:50}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{ height: '100%', width:3, backgroundColor: '#646BEB' }}/>
                                <Ionicons name="md-home" size={32} color="#646BEB" style={{ alignSelf:'center', marginHorizontal:20 }}/>
                                <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize: normalizeFont(17), alignSelf:'center' }}>Home</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ borderBottomColor: '#EEF0F2', borderBottomWidth: 1, width:50, marginLeft: (dimensions.width*0.33)-25 }}/>

                        <TouchableOpacity onPress={() => history.push('/ListPage')} style={{ flexDirection: 'row', height: 60, backgroundColor: 'white'}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{ height: '100%', width:3, backgroundColor: '#646BEB' }}/>
                                <Image 
                                    source={require('../../assets/ListForMenu.png')}
                                    style={{ height: 33, width: 25, marginHorizontal:20, alignSelf:'center' }}>
                                </Image>
                                <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize: normalizeFont(17), alignSelf:'center' }}>Guest list</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ borderBottomColor: '#EEF0F2', borderBottomWidth: 1, width:50, marginLeft: (dimensions.width*0.33)-25 }}/>

                        <TouchableOpacity onPress={() => history.push('/ScanPage')} style={{ flexDirection: 'row', height: 60, backgroundColor: 'white'}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{ height: '100%', width:3, backgroundColor: '#646BEB' }}/>
                                <Image 
                                    source={require('../../assets/Scan.png')}
                                    style={{ height: 25, width: 25, marginHorizontal:20, alignSelf:'center' }}>
                                </Image>
                                <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize: normalizeFont(17), alignSelf:'center' }}>Scan</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ borderBottomColor: '#EEF0F2', borderBottomWidth: 1, width:50, marginLeft: (dimensions.width*0.33)-25 }}/>

                        <TouchableOpacity onPress={() => handleLogout()} style={{ flexDirection: 'row', height: 60, backgroundColor: 'white'}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{ height: '100%', width:3, backgroundColor: '#646BEB' }}/>
                                <Ionicons name="ios-power" size={33} color="#646BEB" style={{ alignSelf:'center', marginHorizontal:20 }}/>
                                <Text style={{ fontFamily:'Nunito-Regular', color:'#333333', fontSize: normalizeFont(17), alignSelf:'center' }}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                
                    <View>
                        <Image 
                            source={require('../../assets/logo_black.png')}
                            style={{ height:dimensions.width*0.173, width:dimensions.width*0.35, marginHorizontal:20, }}>
                        </Image>
                        <View style={{ flexDirection:'row', marginTop:30 }}>
                            <Text style={{ marginLeft:20, marginRight:10, alignSelf:'center', color:'#C0CACE', fontFamily:'Nunito-Regular', fontSize:normalizeFont(13) }}>{ Constants.manifest.version }</Text>
                            <TouchableOpacity onPress={() => history.push('/DisclaimerPage')} style={{ alignSelf: 'flex-start', flexDirection: 'row', height: 25, justifyContent:'center' }}>
                                <Text style={{ textDecorationLine:'underline', alignSelf:'center', color:'#C0CACE', fontFamily:'Nunito-Regular', fontSize:normalizeFont(13) }}>Disclaimer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </MenuView>}
            </Transition>
        </>
    )
}

export default SideMenu;