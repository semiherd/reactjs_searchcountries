import React , {useState,useEffect} from "react"
import FlagList from './country/FlagList'
import SearchBar from './search/SearchBar'
import {useAppState,useAppDispatch} from '../context/AppContext'
import * as fn from './service/index'

const Home= () => {
	const appState= useAppState()
	const appDispatch= useAppDispatch()
	const [countries,setCountries]= useState()
	const [visible,setVisible]= useState()
	const [searchText,setSearchText]= useState('')

	async function handleFilter(searchKey){
		try{
			if(searchKey==''){
				if(appState.filterCont=='all') return countries
				else
					return await countries?.filter(item=>item.region.toLowerCase()==appState.filterCont.toLowerCase())
			}else{
				if(appState.filterCont=='all')
					return await countries?.filter(item=> item.name.common.toLowerCase().includes(searchKey) || item.region.toLowerCase().includes(searchKey))
				else
					return await countries?.filter(item=>item.region.toLowerCase()==appState.filterCont.toLowerCase() && item.name.common.toLowerCase().includes(searchKey))
			}		
		}catch(e){
			console.log(e)
		}
	}
	
	async function fetchCountries(){
		try{
			const countries= await fn.fetchAll()
			await appDispatch({
				type: 'FETCH_COUNTRIES',
				data: countries
			})
			setCountries(countries)
		}catch(e){
			console.log(e)
		}
	}

	useEffect(() => { fetchCountries() },[])
	useEffect(() => {
		if(!countries) setVisible([])
		else setVisible(countries)
	},[countries])

	useEffect(() => { 
		handleFilter(searchText).then((response)=> setVisible(response)) 
	},[appState.filterCont,searchText])

	return (
		<div className={`app-body ${appState.mode}-mode`} data-testid="app-body">		
			<SearchBar setSearchText={setSearchText} />
			{visible && <FlagList list={visible}/>}
		</div>
	)
}
export default Home


