import React, { useContext,useReducer } from 'react'
import {appReducer} from './AppReducer'
import { MODES } from '../Constant'
const AppStateContext= React.createContext()
const AppDispatchContext= React.createContext()

function AppProvider({children}){

	const [state, dispatch]= useReducer(
		appReducer, 
		{
			mode: MODES.LIGHT,
			filterCont: 'all',
			country: null,
			filtering: false
		}
	)

	return (
		<AppStateContext.Provider value={state} >
		<AppDispatchContext.Provider value={dispatch} >
			{children}	
		</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	)
}

function useAppState(){
	const context= useContext(AppStateContext)
	if(context===undefined)
		throw new Error("useAppState must be used within a AppProvider")

	return context
}
function useAppDispatch(){
	const context= useContext(AppDispatchContext)
	if(context===undefined)
		throw new Error("useAppDispatch must be used within a AppProvider")
	return context
}

export {AppProvider, useAppState, useAppDispatch}