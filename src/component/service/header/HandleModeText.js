import {HEADER,MODES} from '../../../Constant'

const handleModeText= (param) => {
	switch(param){
		case MODES.DARK:
			return HEADER.DARKMODE
		case MODES.LIGHT:
			return HEADER.LIGHTMODE
	}
}

export { handleModeText }