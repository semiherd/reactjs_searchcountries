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

async function checkHeadingRole(name,level,filtering){
	const args={level,name}
	const component= filtering? screen.getByRole('heading',args) : screen.queryByRole('heading',args)
	filtering? expect(component).toBeVisible() : expect(component).toBeNull()
}
async function filterContinent(item){
	const continentItem= screen.queryByRole('heading',{level:1,name:item.name})
  expect(continentItem).toBeInTheDocument()
	await act( async () => userEvent.click(continentItem))
	await Promise.all(continentOptions.map(async (item) => {
    const heading1= screen.queryByRole('heading',{level:1,name: item.name})
    expect(heading1).not.toBeInTheDocument()
  }))
	const filteredOptionText= item.name=='All'? 'Filter By Continent': `Filtered - ${item.name}`
	const filteredTitle=  await screen.findByRole('heading',{level:1,name: filteredOptionText})	
	const totalFilteredFlag= await screen.findByRole('heading',{level:2})  
	const flagItemList= await screen.findAllByTestId('flag-item')  
	const visibleItemLen= flagItemList.length>1? `${flagItemList.length} countries`:flagItemList.length==1?'1 country':null
	
	expect(filteredTitle).toBeInTheDocument()
	expect(totalFilteredFlag).toHaveTextContent(visibleItemLen)
	expect(totalFilteredFlag).toBeInTheDocument()
	
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

	// Expected: None of the options are displayed on the page 
	await Promise.all(continentOptions?.map(async (item) => await checkHeadingRole(item.name,1,false)))
	// Filter-By-Continent clicked 
  await act( async () => userEvent.click(filterH1))
  // Expected: All options are displayed on the page
  await Promise.all(continentOptions.map(async (item) => await checkHeadingRole(item.name,1,true)))
	// Filter-By-Continent clicked again
	await act( async () => userEvent.click(filterH1))
	// Expected: All options are displayed on the page
	await Promise.all(continentOptions.map(async (item) => await checkHeadingRole(item,1,false)))

  // Filter-By-Continent clicked again
  await act( async () => userEvent.click(filterH1))
	await filterContinent({name: 'Asia',count: 50})
	// Filter-By-Continent clicked again
	await act( async () => userEvent.click(filterH1))
	// Expected: All options are displayed on the page
  await Promise.all(continentOptions.map(async (item) => await checkHeadingRole(item.name,1,true)))
	
})
