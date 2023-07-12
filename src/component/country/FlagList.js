
import React,{useState,useEffect} from "react"
import {useAppState,useAppDispatch} from '../../context/AppContext'
import FlagItem from './FlagItem'
import NoItem from './NoItem'
import {Link} from 'react-router-dom';

const FlagList = (props) => {
	const {list}= props
	const appState= useAppState()
	const appDispatch= useAppDispatch()
	const [filtering,setFiltering]= useState(false)
	const [data,setData]= useState(null)
	const [count,setCount]= useState(null)

	async function handleCountText(){
		try{
			if(appState.visible>1) setCount(`${appState.visible} countries`)
			else if(appState.visible==1) setCount(`1 country`)
			else setCount(null)
		}catch(e){
			console.log(e)
		}
	}
	async function handleSorting(){
		try{	
			return await list?.sort((a, b) => {
				return a.name.common < b.name.common  ? -1 : a.name.common  > b.name.common  ? 1 : 0
			})
		}catch(e){
			console.log(e)
		}
	}
	async function updateContext(param){
		try{
			await appDispatch({
				type: 'VISIBLE',
				data: param
			})
		}catch(e){
			console.log(e)
		}
	}
	useEffect(() => {
		if(list) {
			updateContext(list?.length)
			handleSorting().then((response) => setData(response))
		}else setData([])
	},[list])

	useEffect(() => {
		appState.filterState? setFiltering(true) : setFiltering(false)
	},[appState.filterState])
	
	useEffect(() => {
		handleCountText()
	},[appState.visible])
	
	return (
		<div>
			{count && <h2 className={`${appState.mode}-mode_count count`}>{count}</h2>}
			<div className={`app-body_flag-list ${filtering? 'filtering':'not-filtering'}`} data-testid="flag-list">
			{data?.map((item,index) =>  (
				<div key={index.toString()} >
					<Link to={`/country/${item.name.common.toLowerCase()}`}> 
						<FlagItem data={item} />
					</Link>
				</div>
			))}
			{data?.length==0 && <NoItem />}
			</div>
		</div>
	)
};

export default FlagList;
