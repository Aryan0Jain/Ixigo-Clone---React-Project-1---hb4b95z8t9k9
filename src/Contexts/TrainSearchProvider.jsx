import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TRAIN_STATIONS, WEEKDAYS, projectID } from "../constants";

const TrainSearchContext = createContext();
export const useTrainSearchContext = () => {
	return useContext(TrainSearchContext);
};

export default function TrainSearchProvider({ children }) {
	const [searchParams] = useSearchParams();
	const [fromStation, setFromStation] = useState(0);
	const [toStation, setToStation] = useState(1);
	const [trainRoutes, setTrainRoutes] = useState([]);
	const [departureDate, setDepartureDate] = useState(new dayjs());
	async function searchTrains(setIsLoading) {
		const day = WEEKDAYS[new dayjs(searchParams.get("date")).day()];
		const searchVal = JSON.stringify({
			source: TRAIN_STATIONS[fromStation],
			destination: TRAIN_STATIONS[toStation],
		});
		const url = `https://academics.newtonschool.co/api/v1/bookingportals/train?search=${searchVal}&day=${day}&limit=1000`;
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
			if (!res.message) {
				setTrainRoutes(
					res.data.trains.sort((a, b) => {
						const aTime =
							+a.departureTime.slice(0, 2) * 60 +
							+a.departureTime.slice(3, 5);
						const bTime =
							+b.departureTime.slice(0, 2) * 60 +
							+b.departureTime.slice(3, 5);
						return aTime - bTime;
					})
				);
			} else {
				setTrainRoutes([]);
			}
		} catch (error) {
			console.log(error);
			setTrainRoutes(null);
		} finally {
			setIsLoading(false);
		}
	}
	async function bookTrain(id, depDate, arrDate) {
		const JWT = JSON.parse(localStorage.getItem("authToken"));
		const body = {
			bookingType: "train",
			bookingDetails: {
				trainId: id,
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
	function getFare(type, baseFare) {
		switch (type) {
			case "CC":
				return Math.round(baseFare * 2);
			case "2S":
				return Math.round(baseFare * 0.75);
			case "SL":
				return Math.round(baseFare);
			case "1A":
				return Math.round(baseFare * 6.25);
			case "2A":
				return Math.round(baseFare * 3.5);
			case "3A":
				return Math.round(baseFare * 2.75);
			case "3E":
				return Math.round(baseFare * 1.75);
			case "EA":
				return Math.round(baseFare * 5);
		}
		return baseFare;
	}
	const provider = {
		fromStation,
		setFromStation,
		toStation,
		setToStation,
		departureDate,
		setDepartureDate,
		searchTrains,
		trainRoutes,
		setTrainRoutes,
		getFare,
		bookTrain,
	};
	return (
		<TrainSearchContext.Provider value={{ ...provider }}>
			{children}
		</TrainSearchContext.Provider>
	);
}
