import axios from 'axios'
import {URL_FETCHALL} from '../../../Constant'

export const fetchAll= async () => {
	try{			
		return axios
			.get(URL_FETCHALL)
			.then(async response => {
				if(response.data){
					return await Promise.all(response.data.map(item=> {
						const {borders,cca3,capital,continents,currencies,flags,languages,name,population,region,subregion,tld}= item
						return {
							borders,cca3,capital,continents,currencies,flags,languages,name,population,region,subregion,tld
						}
					}))		
				}else return null
			})
			.catch(async (error) => {
				return null
			});
		
	}catch(e){
		return null
	}	
}
