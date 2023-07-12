export const sortByKey= async (arr,key) => {
	return await arr?.sort((a, b) => {
		return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0
	})
}
