import React, { useState,useEffect } from "react"
import { useAppState,useAppDispatch } from "../../context/AppContext"
import * as fn from '../service/index'

const OptionList = (props) => {
	const {data}= props
	const [continents,setContinents]= useState()
	const appState= useAppState()
	const appDispatch= useAppDispatch()
	
	async function capitalizedItems(){
		try{
			const response= await Promise.all(data.map( async item => {
				const cap= await fn.capFirstCh(item)
				return {
					id: item,
					name: cap
				}
			}))
			setContinents(response)
		}catch(e){
			console.log(e)
		}
	}
	useEffect(() => {
		capitalizedItems()
	},[data])
	
	async function optionSelect(item){
		try{
			await appDispatch({
				type: 'CONTINENT_FILTER',
				data: item
			})
		}catch(e){
			console.log(e)
		}
	}
	return (
		<div className={`${appState.mode}-mode ${appState.mode}-mode_option-list`} data-testid="continent-options">
			{continents?.map((option,index) => <h1 key={index.toString()} onClick={() => optionSelect(option.id)}>{option.name}</h1>)}
		</div>
	)
};

export default OptionList;
