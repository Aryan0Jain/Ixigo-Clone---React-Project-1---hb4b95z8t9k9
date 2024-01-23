import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

const projectID = "hb4b95z8t9k9";
const appType = "bookingportals";
const BusSearchContext = createContext();
export const useBusSearchContext = () => {
	return useContext(BusSearchContext);
};
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function BusSearchProvider({ children }) {
	const [source, setSource] = useState(0);
	const [destination, setDestination] = useState(1);
	const [departureDate, setDepartureDate] = useState(new dayjs());
	const [busRoutes, setBusRoutes] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	async function searchBuses(setIsLoading) {
		const day = weekDays[new dayjs(searchParams.get("date")).day()];
		const searchVal = JSON.stringify({
			source: busStations[source],
			destination: busStations[destination],
		});
		const url = `https://academics.newtonschool.co/api/v1/bookingportals/bus?search=${searchVal}&day=${day}&limit=1000`;
		// console.log(url);
		try {
			const data = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
				},
			});
			const res = await data.json();
			// console.log(res);
			console.log(res);
			if (!res.message) {
				// setBusRoutes(res.data.buses);
				// console.log(res.data.trains);
			} else {
				setBusRoutes([]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}
	const provider = {
		source,
		setSource,
		destination,
		setDestination,
		departureDate,
		setDepartureDate,
		busRoutes,
		searchBuses,
	};
	return (
		<BusSearchContext.Provider value={{ ...provider }}>
			{children}
		</BusSearchContext.Provider>
	);
}
const busStations = [1, 2, 3, 4];
