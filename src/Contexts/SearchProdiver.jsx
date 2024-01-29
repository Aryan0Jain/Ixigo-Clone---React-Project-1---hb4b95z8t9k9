import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { projectID } from "../constants";

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
		let resp;
		try {
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
			resp = await res.json();
			setData(resp.data.flights);
		} catch (error) {
			setData(null);
		} finally {
			setIsLoading(false);
		}
		// console.log(resp.data.flights);
	}
	async function getFlightDetails(flight_id) {
		try {
			const data = await (
				await fetch(
					`https://academics.newtonschool.co/api/v1/bookingportals/fligh/${flight_id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							projectID: projectID,
						},
					}
				)
			).json();
			return data.data;
		} catch (error) {
			return null;
		}
	}
	async function bookFlight(id, depDate, arrDate) {
		const JWT = JSON.parse(localStorage.getItem("authToken"));
		// console.log(JWT);
		// console.log(depDate.toJSON());
		// console.log(arrDate.toJSON());
		const body = {
			bookingType: "flight",
			bookingDetails: {
				flightId: id,
				startdate: depDate.toJSON(),
				endDate: arrDate.toJSON(),
			},
		};
		try {
			const data = await (
				await fetch(
					`https://academics.newtonschool.co/api/v1/bookingportals/booking`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${JWT}`,
							projectID: projectID,
						},
						body: JSON.stringify(body),
					}
				)
			).json();
			return data;
		} catch (error) {
			return { message: "Some Error Occurred!" };
		}
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
		getFlightDetails,
		tempData,
		bookFlight,
	};
	return (
		<SearchContext.Provider value={{ ...provider }}>
			{children}
		</SearchContext.Provider>
	);
}

const tempData = {
	_id: "651d50098c0d859355224f59",
	flightID: "6E001-HYDAMD-235",
	airline: "65144a1b664a43628887c45e",
	aircraftModel: "65144571e16702a399cea7f7",
	source: "HYD",
	destination: "AMD",
	departureTime: "04:50",
	arrivalTime: "05:50",
	duration: 1,
	stops: 2,
	ticketPrice: 2080,
	availableSeats: 85,
	amenities: ["In-flight entertainment", "Complimentary beverage"],
	__v: 1,
};
