export const appReducer= (prev, action) => {
	switch(action.type){
		case 'CHANGE_MODE':
			return {
				...prev,
				mode: action.data
			}
		case 'FETCH_COUNTRIES':
			return {
				...prev,
				country: action.data
			}
		case 'VISIBLE':
			return {
				...prev,
				visible: action.data
			}
		case 'CONTINENT_FILTER':
			return {
				...prev,
				filterCont: action.data
			}
		case 'FILTERING':
			return {
				...prev,
				filterState: action.data
			}
		default:
			return prev
	}
}