async function arrangeByKey(item){
	try{
		const {id,data,key}=item
		let response=[]
		const keys= Object.keys(data)
		
		if(key) response= await Promise.all(keys.map(i => data[i][key]))
		else response= await Promise.all(keys.map(i => data[i]))			
		
		return {id,response}	
	}catch(e){
		console.log(e)
	}
}
export {arrangeByKey}