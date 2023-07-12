import React from "react"
import {useAppState} from '../../context/AppContext'

const NoItem = () => {
	const appState= useAppState()
	return (
		<div className={`${appState.mode}-mode ${appState.mode}-mode_no-data-item no-item`}>
			<h5>No Countries Found</h5>
		</div>
	)
};

export default NoItem;
