import React, { useEffect, useState } from "react"
import {useAppState,useAppDispatch} from '../context/AppContext'
import * as fn from './service/index'
import {HEADER} from '../Constant'

const Header = () => {
	const appState= useAppState()
	const appDispatch= useAppDispatch()
	const [modeText,setModeText]= useState('')

	async function handleChange(){
		try{
			const response= fn.handleModeText(appState.mode)
			setModeText(response)
		}catch(e){
			console.log(e)
		}
	}

	useEffect(()=> {
		if(appState?.mode) handleChange(appState.mode)
	},[appState?.mode])

	return (
		<div className={`app-header ${appState.mode}-mode_header-bg`} data-testid="app-header">
			{HEADER && <h2 className={`${appState.mode}-mode_header-heading`}>{HEADER.TITLE}</h2>}
			{modeText && <h1 
				className={`${appState.mode}-mode_header-heading`} 
				onClick={() => fn.updateMode({state:appState,update:appDispatch})}
			>{modeText}</h1>}
		</div>
	)
};

export default Header;
