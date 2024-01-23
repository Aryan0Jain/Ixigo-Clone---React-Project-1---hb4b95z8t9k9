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
			console.log(res);
			if (!res.message) {
				setTrainRoutes(res.data.trains);
				// console.log(res.data.trains);
			} else {
				setTrainRoutes([]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
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
