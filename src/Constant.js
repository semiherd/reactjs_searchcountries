export const screenSize={
	desktop: 1440,
	mobile: 375
}
export const HEADER={
	TITLE: "Where in the world",
	DARKMODE: "Dark Mode",
	LIGHTMODE: 'Light Mode'
}
export const MODES= {
	DARK: 'dark',
	LIGHT: 'light'
}
export const CONTINENT_OPTIONS=[
	'all','africa','americas','antarctic','asia','europe','oceania'
]
export const ERROR= [
	{id:'FETCH_ALL_FAILED',text:'Countries can not be fetched from the source.'},
	{id:'MODE_UPDATE_FAILED',text:'Mode can not be updated.'},
	{id:'DETAIL_NAVIGATION_FAILED',text:'Country Detail can not be loaded'},
	{id:'SEARCH_FAILED',text: 'Keyword can not be searched.'},
	{id: 'SEARCH_RESPONSE_NULL',text:'There is no data for the searched keyword.'}
]
export const URL_FETCHALL= 'https://restcountries.com/v3.1/all?status=true&fields=borders,cca3,capital,continents,currencies,flags,languages,name,population,region,subregion,tld'	
export const URL_FETCHBYCOUNTRY= 'https://restcountries.com/v3.1/name'	