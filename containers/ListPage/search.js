import React, {useRef, useEffect, useState} from 'react';
import { TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import posed from 'react-native-pose';

import { searchStyle } from './styles';

const SearchView = posed.View({
    visible: { opacity: 1, transition: { duration: 250 }  },
    hidden: { opacity: 0.25, transition: { duration: 200 } },
});

const SearchInputView = posed.View({
    enter: {
		opacity: 1,
		transition: { duration: 250 }
	},
    exit: {
		opacity: 0,
		transition: { duration: 200 }
	},
});

const PosedKeyboard = posed(KeyboardAvoidingView)({
	open: {
		marginBottom: -30,
	},
	close : {
		marginBottom: 0
	}
})

function Search({ searchValue, search: { handleSearchChange, searchAnimateState, setSearchAnimateState, menuAnimateState, detailAnimateState }}) {
	const [keyboard, setKeyboard] = useState(false);
	const input = useRef(null);

	let keyboardDidShowListener;
	let keyboardDidHideListener;
 
	useEffect(() => {
		keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => {
				setKeyboard(true);
			}
		);
		keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				setKeyboard(false);
			}
		);
		return () => {
			keyboardDidShowListener.remove();
    		keyboardDidHideListener.remove();
		}
	},[keyboard]);

	function clickOverlay() {
		setSearchAnimateState(false);
		Keyboard.dismiss();
	}
	function clickButton() {
		setSearchAnimateState(true);
		input.current.focus();
	}
	
	return(
		<>
			{searchAnimateState && <TouchableOpacity onPress={clickOverlay} style={searchStyle.overlay}/>}
			<PosedKeyboard pose={keyboard ? 'open' : 'close'} behavior="height" enabled style={{...searchStyle.container}}>
				<SearchView
					pose={!detailAnimateState && !menuAnimateState ? 'visible' : 'hidden'}
					style={{...searchStyle.searchView, width: searchAnimateState ? '100%' : 70}}>
					
						<SearchInputView
							pose={searchAnimateState ? 'enter': 'exit'}
							style={searchStyle.searchInputView}
						>
							<TextInput
								ref={input}
								placeholder='Search guest name, ID number'
								value={searchValue}
								onChange={e => handleSearchChange(e.nativeEvent.text)}
								style={searchStyle.textInput}
							/>
						</SearchInputView>
						<TouchableOpacity
							onPress={clickButton} 
							style={{...searchStyle.button, elevation: searchAnimateState ? 21 : 0}}
						>
							<Image 
								source={require('../../assets/Search/Search.png')}
								style={searchStyle.image}>
							</Image>
						</TouchableOpacity>
				</SearchView>
			</PosedKeyboard>
		</>

	)
}

export default Search;