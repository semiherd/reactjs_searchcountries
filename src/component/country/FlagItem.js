import React from "react"
import {useAppState} from '../../context/AppContext'

const FlagItem = (props) => {
	const {data}= props
	const appState= useAppState()

	return (
		<div className={`${appState.mode}-mode_flag-item`} data-testid='flag-item'>
			<img
				className="flag"
				src={data.flags.png}
				alt={data.flags.alt}
			/>
			<div className={`${appState.mode}-mode_flag-info`}>
				<h1 className={`${appState.mode}-mode_flag-heading name`}>{data.name.common}</h1>
				<h1 className={`${appState.mode}-mode_flag-heading`}><span>Population: </span>{data.population}</h1>
				<h1 className={`${appState.mode}-mode_flag-heading`}><span>Region: </span>{data.region}</h1>
				{data?.capital?.map(city => <h1 key={city} className={`${appState.mode}-mode_flag-heading`}><span>Capital: </span>{city}</h1>)}
			</div>
		</div>
	)
};

export default FlagItem;
