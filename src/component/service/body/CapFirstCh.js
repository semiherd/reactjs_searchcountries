export const capFirstCh= async (str) => {
	let newStr=[]; 
	if(str && str.length>0){
			await Promise.all(str.split(' ').map((item) => {
					newStr.push(item.charAt(0).toUpperCase() + item.slice(1));
			}))
			const response= newStr.join(' ')
			return response
	}else return null
}