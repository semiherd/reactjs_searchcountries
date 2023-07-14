import App from '../App'
import Home from '../component/Home'
import {AppProvider} from '../context/AppContext'
import { act,render,screen,waitFor,within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const continentOptions= [
	{name:'All',count:250},
	{name:'Africa',count:59},
	{name:'Americas',count:56},
	{name:'Antarctic',count:5},
	{name:'Asia',count:50},
	{name:'Europe',count:53},
	{name:'Oceania',count:27},
] 

function checkCssClass(item,classItem){
  expect(item).toBeInTheDocument()
  expect(item).toHaveClass(classItem)
}

async function checkHeadingRole(item,level,state){
	const component= state? screen.getByRole('heading',{level,name: item.name}):screen.queryByRole('heading',{level,name: item.name})
	state? expect(component).toBeInTheDocument():expect(component).not.toBeInTheDocument()
}

test.only('clicks on Filter By Continent to see options', async () => {

	await act( async () => render(
		<AppProvider>
			<Router>
				<Home />
			</Router>
		</AppProvider>)
	);
	waitFor(async () => {
		const flagList=  await screen.findByTestId('flag-list')
		const expectedCss= 'app-body_flag-list not-filtering'
		checkCssClass(flagList,expectedCss)
	})

	//confirm filter component is displayed on the page
	const filterH1= await screen.findByRole('heading',{level:1,name:'Filter By Continent'})
	expect(filterH1).toBeInTheDocument()
	
	// Expected: All options are displayed on the page 
	let filtering=true
	await Promise.all(continentOptions.map(async (item) => await checkHeadingRole(item,1,filtering)))
	

	// Filter-By-Continent clicked 
	await act( async () => userEvent.click(filterH1))
	// Expected: All options are displayed on the page
	await Promise.all(continentOptions.map(async (item) => await checkHeadingRole(item,1,!filtering)))


	// Filter-By-Continent clicked again
	await act( async () => userEvent.click(filterH1))
	// Expected: All options are displayed on the page
	await Promise.all(continentOptions.map(async (item) => await checkHeadingRole(item,1,filtering)))
	

	// Asia option is clicked
	const asiah1= screen.queryByRole('heading',{level:1,name:'Asia'})
	await act( async () => userEvent.click(asiah1))
	await Promise.all(continentOptions.map(async (item) => {
		const heading1= screen.queryByRole('heading',{level:1,name:`${item.name}`})
		const filteredOptionText= await screen.findByRole('heading',{level:1,name:'Filtered - Asia'})
		const totalFilteredFlag= await screen.findByRole('heading',{level:2})  
		const flagItemList= await screen.findAllByTestId('flag-item')  
		const visibleItemLen= flagItemList.length>1? `${flagItemList.length} countries`:flagItemList.length==1?'1 country':null
		
		expect(filteredOptionText).toBeInTheDocument()
		expect(heading1).not.toBeInTheDocument()
		expect(totalFilteredFlag).toHaveTextContent(visibleItemLen)
		expect(totalFilteredFlag).toBeInTheDocument()
	}))

	// Filter-By-Continent clicked again
	await act( async () => userEvent.click(filterH1))
	const africa1= screen.queryByRole('heading',{level:1,name:'Africa'})
	expect(africa1).toBeInTheDocument()

	// Africa option is clicked
	await act( async () => userEvent.click(africa1))
	await Promise.all(continentOptions.map(async (item) => {
		const heading1= screen.queryByRole('heading',{level:1,name:`${item.name}`})
		const filteredOptionText= await screen.findByRole('heading',{level:1,name:'Filtered - Africa'})
		const totalFilteredFlag= await screen.findByRole('heading',{level:2})  
		const flagItemList= await screen.findAllByTestId('flag-item')  
		const visibleItemLen= flagItemList.length>1? `${flagItemList.length} countries`:flagItemList.length==1?'1 country':null
		
		expect(filteredOptionText).toBeInTheDocument()
		expect(heading1).not.toBeInTheDocument()
		expect(totalFilteredFlag).toHaveTextContent(visibleItemLen)
		expect(totalFilteredFlag).toBeInTheDocument()
	}))
	
})
