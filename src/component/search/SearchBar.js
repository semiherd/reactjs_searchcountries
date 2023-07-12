import React from "react"
import {useAppState} from '../../context/AppContext'
import { FaSearch } from "react-icons/fa";
import FilterItem from './FilterItem'

const SearchBar = (props) => {
	const {setSearchText}= props
	const appState= useAppState()

	const searchHandler= (e) => {
		const lowerCase= e.target.value.toLowerCase()
		setSearchText(lowerCase)
	}
	return (
		<div className={`${appState.mode}-mode search-filter-bar`} data-testid="search-filter-bar">
			<div className={`${appState.mode}-mode search-bar`} data-testid="search-bar">
				<span><FaSearch className="icon" /></span>
				<input 
					id="search" 
					type="text"
					onChange={searchHandler} 
					placeholder="Search for a country"
				/>
			</div>
			<div className={`${appState.mode}-mode filter-bar`} data-testid="filter-bar">
				<FilterItem />
			</div>
		</div>
	)
};

export default SearchBar
