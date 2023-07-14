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
<<<<<<< HEAD
		<Router>
			<Routes>
				<Route path="/reactjs_searchcountries" element={<Home />} />
				<Route path="/" element={<Home />} />
				<Route index path="/country/:name" element={<Country />} />
				<Route path="*" element={<NoRoute />} />     
			</Routes>
		</Router>		
=======
			<Router>
					<Routes>
						<Route path="/reactjs_searchcountries" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route index path="/country/:name" element={<Country />} />
						<Route path="*" element={<NoRoute />} />     
					</Routes>
			</Router>		
>>>>>>> d7abeeb (update test)
	)
};

export default Body;
