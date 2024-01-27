import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

const projectID = "hb4b95z8t9k9";
const appType = "bookingportals";
const TrainSearchContext = createContext();
export const useTrainSearchContext = () => {
	return useContext(TrainSearchContext);
};
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function TrainSearchProvider({ children }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [fromStation, setFromStation] = useState(0);
	const [toStation, setToStation] = useState(1);
	const [trainRoutes, setTrainRoutes] = useState([]);
	const [departureDate, setDepartureDate] = useState(new dayjs());
	async function searchTrains(setIsLoading) {
		const day = weekDays[new dayjs(searchParams.get("date")).day()];
		const searchVal = JSON.stringify({
			source: trainStations[fromStation],
			destination: trainStations[toStation],
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
		trainStations,
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
let trainStations = [
	"Delhi Junction",
	"Salem Junction",
	"Dhanbad Junction",
	"Hubli Junction",
	"Lucknow Charbhagh",
	"Vijayawada Junction",
	"Surat",
	"Udaipur City",
	"Thiruvananthapuram Central",
	"Coimbatore Junction",
	"Kanpur Central",
	"Kharagpur Junction",
	"Manmad Junction",
	"Mughal Sarai Junction",
	"Chandigarh",
	"Gorakhpur Junction",
	"Gwalior Junction",
	"Ghaziabad Junction",
	"Agra Cantonment",
	"Allahabad Junction",
	"Kiul Junction",
	"Bhubaneshwar",
	"Ambala Cantonment",
	"Warangal",
	"Bhusaval Junction",
	"Howrah Junction",
	"Thrissur",
	"Yesvantpur Junction",
	"Khurda Road Junction",
	"Nagpur Junction",
	"Ahmedabad Junction",
	"Visakhapatnam Junction",
	"Barddhaman Junction",
	"Mysuru Junction",
	"Bengaluru City Junction",
	"Amritsar Junction",
	"Kalyan Junction",
	"Pune Junction",
	"Raipur Junction",
	"Erode Junction",
	"New Delhi",
	"Jhansi Junction",
	"Jodhpur Junction",
	"Varanasi Junction",
	"Vadodara Junction",
	"Asansol Junction",
	"Katpadi Junction",
	"Indore Junction",
	"Itarsi Junction",
	"Moradabad Junction",
	"Anand Junction",
	"Kollam Junction",
	"Ludhiana Junction",
	"Bengaluru Cantt.",
	"Hazrat Nizamuddin",
	"Mangalore Central",
	"Bhopal Junction",
	"Kota Junction",
	"Secunderabad Junction",
	"Nadiad Junction",
	"Mathura Junction",
	"Chennai Central",
	"Vellore Katpadi",
	"Patna Junction",
	"Guwahati",
	"Jaipur Junction",
];
