import React from "react"
import { FaArrowLeft } from "react-icons/fa";
import {useAppState} from '../../context/AppContext'

const BackButton = ({text,onClick}) => {
	const appState= useAppState()
	return (
		<div className="back-button">
			<FaArrowLeft className="icon" />
			<button className={`${appState.mode}-mode_back-button`} onClick={() => onClick()}>
      	{text}
      </button>
		</div>
	)
};
export default BackButton;
