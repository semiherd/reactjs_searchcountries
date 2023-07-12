import {arrangeByKey} from './ArrangeByKey'

export const fetchCountry= async (country,list) => {
	try{			
		let res={}
		const data= await list.filter(i=> i.name.common.toLowerCase()==country)
		if(data.length==1){	
			const countryData= data[0]
			const {borders,capital,continents,flags,name,population,region,subregion,tld} = countryData
			const keyNames=[
				{id: 'currency',data: countryData.currencies,key:'name'},
				{id: 'language',data: countryData.languages,key:null},
				{id: 'nativeName',data: countryData.name.nativeName,key:'common'}
			]
			await Promise.all(keyNames.map(async (item) => {
				const itemData= await arrangeByKey(item)
				res= {...res,
					[itemData.id]: itemData.response
				}
			}))				
			const borderCountries= await list
				.filter(i=> borders.includes(i.cca3))
				.map(i=> i.name.common)
			return {
				borders: borderCountries,
				capital,continents,flags,
				currencies: res.currency,
				languages: res.language,
				name: name.common,
				nativename: res.nativeName,
				population,region,subregion,tld
			}
		}else return null		
	}catch(e){
		return null
	}	
}
