import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import InfoBox from './InfoBox';

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('worldwide');

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					setCountries(countries);
				});
		};
		getCountriesData();
	}, []);

	const onCountryChange = (e) => {
		const countryCode = e.target.value;
		setCountry(countryCode);
	};

	return (
		<div className="app">
			<div className="app__header">
				<h1>COVID-19 TRACKER</h1>
				<FormControl className="app__dropdown">
					<Select variant="outlined" onChange={onCountryChange} value={country}>
						<MenuItem value="worldwide">Worldwide</MenuItem>
						{countries.map((country) => (
							<MenuItem value={country.value}>{country.name}</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div className="app__stats">
				<InfoBox title="Coronavirus cases" cases={10000} total={2000} />
				<InfoBox title="Recovered" cases={10000} total={3000} />
				<InfoBox title="Deaths" cases={10000} total={300} />
			</div>
		</div>
	);
}

export default App;
