import React, { useState,useEffect } from "react"
import {useAppState} from '../../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import * as fn from '../service/index'
import InfoItem from './InfoItem'
import BackButton from './BackButton'

const Country = () => {
	const navigate = useNavigate()
	const appState= useAppState()
	const {name}= useParams()
	const [data,setData]= useState()

	async function fetchData(countryName,cList){
		try{	
			const countryData= await fn.fetchCountry(countryName,cList)
			setData(countryData)
		}catch(e){
			console.log(e)
		}
	}

	useEffect(() => {
		if(appState.country) fetchData(name,appState.country)
	},[appState.country,name])

	const infoElm=[
		{id:'nativename',title:'Native Name'},
		{id:'population',title:'Population'},
		{id:'region',title:'Region'},
		{id:'subregion',title:'Sub Region'},
		{id: 'capital', title:'Capital'}
	]
	const detailElm=[
		{id:'tld',title:'Top Level Domain'},
		{id:'currencies',title:'Currency'},
		{id:'languages',title:'Language'},
	]

	return (
		<div className={`${appState.mode}-mode country-page`} data-testid={`${name}-detail`}>
			<div className="desktop-detail-left">
				<BackButton text="Back" onClick={() => navigate(-1)} />
				{data && <img className="flag-detail" src={data.flags.png} alt={data.flags.alt} />}
			</div>
			<div className="desktop-detail-right">
				<div className={`${appState.mode}-mode_text`}>
					{data?.name && <h5>{data.name}</h5>}
				</div>
				<div className="desktop-country-part1">
					<div className={`${appState.mode}-mode country-info ${appState.mode}-mode_text`}>
						{data && infoElm.map((item,index) => <InfoItem key={index.toString()} data={{title:item.title,key:data[item.id]}} />)}				
					</div>
					<div className={`${appState.mode}-mode country-info-detail ${appState.mode}-mode_text`}>
						{data && detailElm.map((item,index) => <InfoItem key={index.toString()} data={{title:item.title,key:data[item.id]}} />)}				
					</div>
				</div>
				<div className="desktop-country-part2">
					{data && <h2 className={`${appState.mode}-mode ${appState.mode}-mode_country-border-list ${appState.mode}-mode_text`}>Border Countries</h2>}
					<div className={`${appState.mode}-mode country-border-list ${appState.mode}-mode_text`}>
						{data?.borders?.map(country => <h1 className={`${appState.mode}-mode_element-bg`}key={country}>{country}</h1>)}
					</div>
				</div>
			</div>
		</div>
	)
};
export default Country;
