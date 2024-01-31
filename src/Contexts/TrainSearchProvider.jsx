import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TRAIN_STATIONS, WEEKDAYS, projectID } from "../constants";

const TrainSearchContext = createContext();
export const useTrainSearchContext = () => {
	return useContext(TrainSearchContext);
};
function getTimeRange(time) {
	if (time >= "00:00" && time <= "06:00") return "early-morning";
	if (time > "06:00" && time <= "12:00") return "morning";
	if (time > "12:00" && time <= "18:00") return "mid-day";
	if (time > "18:00" && time <= "24:00") return "night";
}
export default function TrainSearchProvider({ children }) {
	const [searchParams] = useSearchParams();
	const [fromStation, setFromStation] = useState(0);
	const [toStation, setToStation] = useState(1);
	const [trainRoutes, setTrainRoutes] = useState([]);
	const [departureDate, setDepartureDate] = useState(new dayjs());
	async function searchTrains(setIsLoading, classes, depTimeRange, sortBy) {
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
				let newData = res.data.trains.sort((a, b) => {
					const aTime =
						+a.departureTime.slice(0, 2) * 60 +
						+a.departureTime.slice(3, 5);
					const bTime =
						+b.departureTime.slice(0, 2) * 60 +
						+b.departureTime.slice(3, 5);
					return aTime - bTime;
				});
				if (Object.values(classes).includes(true)) {
					newData = newData.filter(({ coaches }) => {
						return coaches.some(
							({ coachType }) => classes[coachType]
						);
					});
				}
				if (depTimeRange.length > 0 && depTimeRange.length < 4) {
					newData = newData.filter(({ departureTime }) =>
						depTimeRange.includes(getTimeRange(departureTime))
					);
				}
				if (sortBy === "arrival") {
					newData = newData.sort((a, b) => {
						const aTime =
							+a.arrivalTime.slice(0, 2) * 60 +
							+a.arrivalTime.slice(3, 5);
						const bTime =
							+b.arrivalTime.slice(0, 2) * 60 +
							+b.arrivalTime.slice(3, 5);
						console.log(aTime - bTime);
						return aTime - bTime;
					});
				}
				if (sortBy === "duration") {
					newData = newData.sort((a, b) => {
						let duration = a.travelDuration.split(" ");
						const aDuration =
							+duration[0].slice(0, -1) * 60 +
							+duration[1].slice(0, -1);
						duration = b.travelDuration.split(" ");
						const bDuration =
							+duration[0].slice(0, -1) * 60 +
							+duration[1].slice(0, -1);
						return aDuration - bDuration;
					});
				}
				if (sortBy === "name") {
					newData = newData.sort((a, b) =>
						a.trainName.localeCompare(b.trainName)
					);
				}
				setTrainRoutes(newData);
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
