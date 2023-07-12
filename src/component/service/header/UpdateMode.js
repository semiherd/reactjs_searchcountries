import {MODES} from '../../../Constant'

async function updateMode(param){
	await param.update({
		type: 'CHANGE_MODE',
		data: param.state.mode==MODES.DARK? MODES.LIGHT:MODES.DARK
	})
}
export {updateMode}