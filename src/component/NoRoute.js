import React from "react"
import {useAppState} from '../context/AppContext'
import {Link} from 'react-router-dom';

const NoRoute = () => {
	const appState= useAppState()

	return (
		<div className={`${appState.mode}-mode ${appState.mode}-mode_no-route`}>
			<Link to={`/`}> 
				<span>Country details can not be found, click to refresh.</span>
			</Link>
		</div>
	)
};
export default NoRoute;
