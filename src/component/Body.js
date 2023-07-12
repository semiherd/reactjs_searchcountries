import React from "react"
import Home from './Home'
import Country from './country/Country'
import NoRoute from './NoRoute'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const Body = () => {
	
	return (
			<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route index path="/country/:name" element={<Country />} />
						<Route path="*" element={<NoRoute />} />     
					</Routes>
			</Router>		
	)
};

export default Body;
