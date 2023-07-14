import React,{useEffect, useState} from "react"
import {CONTINENT_OPTIONS} from '../../Constant'
import OptionList from './OptionList'
import { useAppState,useAppDispatch } from "../../context/AppContext"
import * as fn from '../service/index'

const FilterItem = (props) => {
	const[toggle,setToggle]= useState(false)
	const[filteredContinent,setFilteredContinent]= useState(null)
	const appState= useAppState()
	const appDispatch= useAppDispatch()

	async function handleContinentName(){
		try{
			const response= await fn.capFirstCh(appState.filterCont)
			setFilteredContinent(response)
		}catch(e){
			console.log(e)
		}
	}
	useEffect(() => {
		setToggle(i=>!i)
		handleContinentName()
	},[appState.filterCont])

	useEffect(() => {
		appDispatch({
			type: 'FILTERING',
			data: toggle
		})
	},[toggle])

	return (
		<div className={`${appState.mode}-mode filter-item`} data-testid="filter-item">
			<h1 onClick={() => setToggle(i=>!i)}>{appState.filterCont=='all'? 'Filter By Continent':'Filtered - '+ filteredContinent}</h1>
			{toggle && <OptionList data={CONTINENT_OPTIONS} />}
		</div>
	)
};

export default FilterItem;
