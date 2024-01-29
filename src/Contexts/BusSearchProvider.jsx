import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BUS_CITIES, WEEKDAYS, projectID } from "../constants";

const BusSearchContext = createContext();
export const useBusSearchContext = () => {
	return useContext(BusSearchContext);
};
export default function BusSearchProvider({ children }) {
	const [source, setSource] = useState(0);
	const [destination, setDestination] = useState(1);
	const [departureDate, setDepartureDate] = useState(new dayjs());
	const [busRoutes, setBusRoutes] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	async function searchBuses(setIsLoading) {
		const day = WEEKDAYS[new dayjs(searchParams.get("date")).day()];
		const searchVal = JSON.stringify({
			source: BUS_CITIES[source],
			destination: BUS_CITIES[destination],
		});
		const url = `https://academics.newtonschool.co/api/v1/bookingportals/bus?search=${searchVal}&day=${day}&limit=1000`;
		try {
			const data = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
				},
			});
			const res = await data.json();
			setBusRoutes(res.data.buses);
		} catch (error) {
			console.log(error);
			setBusRoutes(null);
		} finally {
			setIsLoading(false);
		}
	}
	async function bookBus(id, depDate, arrDate) {
		const JWT = JSON.parse(localStorage.getItem("authToken"));
		const body = {
			bookingType: "bus",
			bookingDetails: {
				busId: id,
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
		source,
		setSource,
		destination,
		setDestination,
		departureDate,
		setDepartureDate,
		busRoutes,
		searchBuses,
		bookBus,
	};
	return (
		<BusSearchContext.Provider value={{ ...provider }}>
			{children}
		</BusSearchContext.Provider>
	);
}
