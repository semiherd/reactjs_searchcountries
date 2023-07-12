import React from "react"
import {useAppState} from '../../context/AppContext'

const InfoItem = ({data}) => {
	const appState= useAppState()

	const {title,key} = data
	const checkType= Array.isArray(key)	
	return (
		<div className={`${appState.mode}-mode info-item`}>
			<h2>{title}: </h2>
			{checkType? key.map(i => <h1 key={i}>{i}</h1>):<h1>{key}</h1>}
		</div>
	)
}
export default InfoItem;