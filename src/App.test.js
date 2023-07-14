import App from './App'
import Home from './component/Home'
import {AppProvider} from './context/AppContext'
import { render,screen,waitFor,within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {HEADER} from './Constant'

function checkCssClass(item,classItem){
  return expect(item).toHaveClass(classItem)
}

test('should render app elements on initial load',async () => {
    render(<App />)
  // country flag elements
    await waitFor(async () => {
      const response= screen.getAllByRole('img')
      const appBody= screen.queryByTestId('app-body')
      const flagItems= within(appBody).getAllByTestId('flag-item') 
      const totalItem= within(appBody).getByRole('heading',{level:2})  
      const visibleItemLen= flagItems.length>1? `${flagItems.length} countries`:flagItems.length==1?'1 country':null
      
      expect(totalItem).toHaveTextContent(visibleItemLen)
      expect(response.length).toEqual(250)
    })
  // header Elements
    const headerBar= screen.getByTestId('app-header')
    const text1= screen.getByRole('heading',{level:2,name: HEADER.TITLE})
    const text2= screen.getByRole('heading',{level:1,name: HEADER.LIGHTMODE})   
    expect(headerBar).toBeInTheDocument()
    expect(headerBar).toHaveClass('app-header')   
    expect(text1).toBeTruthy()
    expect(text2).toBeTruthy()
  // search bar elements
    const searchFilterBar= screen.getByTestId('search-filter-bar')
    const searchBar= screen.getByTestId('search-bar')
    const filterBar= screen.getByTestId('filter-bar')
    expect(searchFilterBar).toBeInTheDocument()
    expect(searchBar).toBeInTheDocument()
    expect(filterBar).toBeInTheDocument()

    expect(searchFilterBar).toHaveClass('light-mode search-filter-bar')
    const haveClassHeaderParams=[
      {received: searchBar,expected:'light-mode search-bar'},
      {received: filterBar,expected:'light-mode filter-bar'},
    ]
    Promise.all(haveClassHeaderParams.map(item=>checkCssClass(item.received,item.expected)))
    
  // body elements
    const appBody= screen.getByTestId('app-body')
    const flagList= screen.getByTestId('flag-list') 
    expect(appBody).toBeInTheDocument()
    expect(flagList).toBeInTheDocument()
    const haveClassBodyParams=[
      {received: appBody,expected:'app-body light-mode'},
      {received: flagList,expected:'app-body_flag-list'},
    ]
    Promise.all(haveClassBodyParams.map(item=>checkCssClass(item.received,item.expected)))

  // flag-items
    const flatItemList= screen.getAllByTestId('flag-item')
    await Promise.all(flatItemList.map(item=> {
      checkCssClass(item,'light-mode_flag-item')
    }))
})

test('should display country detail info on flag click',async () => {
    render (<App />)
    const imageTestCountry = 'https://flagcdn.com/w320/al.png'
    const testCountry='Albania'
    const testId= `${testCountry.toLowerCase()}-detail`
    await waitFor(() => expect(screen.getByText(testCountry)).toBeInTheDocument())
    await waitFor(() => userEvent.click(screen.getByText(testCountry)))
    const titles= ['Border Countries','Region:','Sub Region:','Top Level Domain:','Currency:','Population:','Capital:','Language:']
    
    await waitFor( async () => {
      const testElm= screen.getByTestId(testId) 
      const backButton= screen.getByRole('button',{name:'Back'})
      const testImage = document.querySelector("img")
      expect(backButton).toBeInTheDocument()
      expect(testElm).toBeInTheDocument()
      expect(testImage.src).toEqual(imageTestCountry)
      expect(testImage).toHaveClass('flag-detail')
      await Promise.all(titles.map(i=> {
        expect(screen.getByText(i)).toBeInTheDocument()
      }))
    })  
})

test('should change the app-mode on the header-bar', async () => {
  render (<App />)
  const appHeader= screen.getByTestId('app-header')
  const modeLightText= screen.getByRole('heading',{level:1,name: HEADER.LIGHTMODE})

  //switching to dark mode
  userEvent.click(modeLightText)
  expect(screen.queryByRole('heading',{level:1,name: HEADER.LIGHTMODE})).not.toBeInTheDocument()
  
  //checking whether dark mode applied on the screen
  const modeDarkText= screen.getByRole('heading',{level:1,name: HEADER.DARKMODE})
  expect(modeDarkText).toBeInTheDocument()
  const darkModeParams=[
    {received: modeDarkText,expected:'dark-mode_header-heading'},
    {received: appHeader,expected:'app-header dark-mode_header-bg'},
  ]
  Promise.all(darkModeParams.map(item=>checkCssClass(item.received,item.expected)))
  
  //switching back to light mode
  userEvent.click(modeDarkText) 
  expect(modeLightText).toBeInTheDocument()
  const lightModeParams=[
    {received: modeLightText,expected:'light-mode_header-heading'},
    {received: appHeader,expected:'app-header light-mode_header-bg'},
  ]
  Promise.all(lightModeParams.map(item=>checkCssClass(item.received,item.expected)))

})




