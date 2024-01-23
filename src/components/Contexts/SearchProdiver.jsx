import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

const projectID = "hb4b95z8t9k9";
const appType = "bookingportals";
const SearchContext = createContext();
export const useSearchContext = () => {
	return useContext(SearchContext);
};
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function SearchProvider({ children }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [fromCity, setFromCity] = useState(0);
	const [toCity, setToCity] = useState(1);
	const [departureDate, setDepartureDate] = useState(new dayjs());
	const [travellers, setTravellers] = useState(0);
	const [data, setData] = useState([]);
	async function searchBookings(setIsLoading) {
		const day = weekDays[new dayjs(searchParams.get("date")).day()];
		const searchVal = JSON.stringify({
			source: searchParams.get("from"),
			destination: searchParams.get("to"),
		});
		const res = await fetch(
			`https://academics.newtonschool.co/api/v1/bookingportals/flight?search=${searchVal}&day=${day}&limit=1000`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
				},
			}
		);
		const resp = await res.json();
		setData(resp.data.flights);
		// console.log(resp.data.flights);
		setIsLoading(false);
	}
	const provider = {
		fromCity,
		setFromCity,
		toCity,
		setToCity,
		departureDate,
		setDepartureDate,
		travellers,
		setTravellers,
		data,
		setData,
		searchBookings,
		airports,
		passengers,
	};
	return (
		<SearchContext.Provider value={{ ...provider }}>
			{children}
		</SearchContext.Provider>
	);
}
const passengers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const airports = [
	{
		name: "Rajiv Gandhi International Airport",
		city: "Hyderabad",
		country: "India",
		iata_code: "HYD",
	},
	{
		name: "Sardar Vallabhbhai Patel International Airport",
		city: "Ahmedabad",
		country: "India",
		iata_code: "AMD",
	},
	{
		name: "Goa International Airport",
		city: "Goa",
		country: "India",
		iata_code: "GOI",
	},
	{
		name: "Pune Airport",
		city: "Pune",
		country: "India",
		iata_code: "PNQ",
	},
	{
		name: "Lokpriya Gopinath Bordoloi International Airport",
		city: "Guwahati",
		country: "India",
		iata_code: "GAU",
	},
	{
		name: "Jaipur International Airport",
		city: "Jaipur",
		country: "India",
		iata_code: "JAI",
	},
	{
		name: "Dr. Babasaheb Ambedkar International Airport",
		city: "Nagpur",
		country: "India",
		iata_code: "NAG",
	},
	{
		name: "Indira Gandhi International Airport",
		city: "Delhi",
		country: "India",
		iata_code: "DEL",
	},
	{
		name: "Chhatrapati Shivaji Maharaj International Airport",
		city: "Mumbai",
		country: "India",
		iata_code: "BOM",
	},
	{
		name: "Kempegowda International Airport",
		city: "Bengaluru",
		country: "India",
		iata_code: "BLR",
	},
	{
		name: "Netaji Subhas Chandra Bose International Airport",
		city: "Kolkata",
		country: "India",
		iata_code: "CCU",
	},
	{
		name: "Chennai International Airport",
		city: "Chennai",
		country: "India",
		iata_code: "MAA",
	},
	{
		name: "Cochin International Airport",
		city: "Kochi",
		country: "India",
		iata_code: "COK",
	},
	{
		name: "Chandigarh International Airport",
		city: "Chandigarh",
		country: "India",
		iata_code: "IXC",
	},
	{
		name: "Biju Patnaik International Airport",
		city: "Bhubaneswar",
		country: "India",
		iata_code: "BBI",
	},
	{
		name: "Coimbatore International Airport",
		city: "Coimbatore",
		country: "India",
		iata_code: "CJB",
	},
	{
		name: "Lucknow International Airport",
		city: "Lucknow",
		country: "India",
		iata_code: "LKO",
	},
	{
		name: "Trivandrum International Airport",
		city: "Thiruvananthapuram",
		country: "India",
		iata_code: "TRV",
	},
	{
		name: "Mangalore International Airport",
		city: "Mangalore",
		country: "India",
		iata_code: "IXE",
	},
	{
		name: "Amritsar International Airport",
		city: "Amritsar",
		country: "India",
		iata_code: "ATQ",
	},
	{
		name: "Dehradun Airport",
		city: "Dehradun",
		country: "India",
		iata_code: "DED",
	},
	{
		name: "Vadodara Airport",
		city: "Vadodara",
		country: "India",
		iata_code: "BDQ",
	},
	{
		name: "Madurai Airport",
		city: "Madurai",
		country: "India",
		iata_code: "IXM",
	},
	{
		name: "Lok Nayak Jayaprakash Airport",
		city: "Patna",
		country: "India",
		iata_code: "PAT",
	},
	{
		name: "Kushok Bakula Rimpochee Airport",
		city: "Leh",
		country: "India",
		iata_code: "IXL",
	},
	{
		name: "Agartala Airport",
		city: "Agartala",
		country: "India",
		iata_code: "IXA",
	},
	{
		name: "Gaya Airport",
		city: "Gaya",
		country: "India",
		iata_code: "GAY",
	},
	{
		name: "Surat Airport",
		city: "Surat",
		country: "India",
		iata_code: "STV",
	},
	{
		name: "Raipur Airport",
		city: "Raipur",
		country: "India",
		iata_code: "RPR",
	},
	{
		name: "Jammu Airport",
		city: "Jammu",
		country: "India",
		iata_code: "IXJ",
	},
];
