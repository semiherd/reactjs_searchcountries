import React,{useEffect, useState} from "react"
import {CONTINENT_OPTIONS} from '../../Constant'
import OptionList from './OptionList'
import { useAppState,useAppDispatch } from "../../context/AppContext"
import * as fn from '../service/index'

const FilterItem = () => {
	const appState= useAppState()
	const appDispatch= useAppDispatch()
	const[filteredContinent,setFilteredContinent]= useState(null)

	async function handleContinentName(){
		try{
			const response= await fn.capFirstCh(appState.filterCont)
			setFilteredContinent(response)
		}catch(e){
			console.log(e)
		}
	}
	async function handleFilterState(){
		try{
			const data= appState.filterState?false:true
			await appDispatch({
				type: 'FILTERING',
				data
			})
		}catch(e){
			console.log(e)
		}
	}
	
	useEffect(() => {
		handleContinentName()
	},[appState?.filterCont])

	return (
		<div className={`${appState.mode}-mode filter-item`} data-testid="filter-item">
			<h1 onClick={() => handleFilterState()}>{appState.filterCont=='all'? 'Filter By Continent':'Filtered - '+ filteredContinent}</h1>
			{appState?.filterState && <OptionList data={CONTINENT_OPTIONS} />}
		</div>
	)
};

export default FilterItem;
