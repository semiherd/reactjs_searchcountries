import axios from 'axios'
import {URL_FETCHBYCOUNTRY} from '../../../Constant'
import {fetchCountry} from './FetchCountry'

export const byCountry= async (country) => {
	try{		
		const url= `${URL_FETCHBYCOUNTRY}/${country}?fullText=true`
		return axios
			.get(url)
			.then(async response => {
				if(response?.data?.length==1)
					return await fetchCountry(country,response?.data)	
				else return null
			})
			.catch(async (error) => {
				return null
			});
		
	}catch(e){
		return null
	}	
}
