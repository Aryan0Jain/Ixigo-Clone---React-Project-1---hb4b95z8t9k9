import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LOCATIONS, projectID } from "../constants";

const HotelSearchContext = createContext();
export const useHotelSearchContext = () => {
	return useContext(HotelSearchContext);
};
export default function HotelSearchProvider({ children }) {
	const [location, setLocation] = useState(0);
	const [checkinDate, setCheckinDate] = useState(new dayjs());
	const [checkoutDate, setCheckoutDate] = useState(new dayjs().add(1, "day"));
	const [hotelsData, setHotelsData] = useState([]);
	async function searchHotels(
		setIsLoading,
		filters,
		sortingMethod,
		priceRange
	) {
		const searchVal = JSON.stringify({
			location: LOCATIONS[location].city,
		});
		const url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search=${searchVal}&limit=1000`;
		try {
			const data = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
				},
			});
			const res = await data.json();

			let hotels = res.data.hotels;
			if (filters.length > 0) {
				hotels = hotels.filter((item) => {
					return (
						(item.rating * 1.9).toFixed(1) >= filters[0].minRating
					);
				});
			}
			if (sortingMethod === "priceup") {
				hotels = hotels.sort(
					(a, b) => a.avgCostPerNight - b.avgCostPerNight
				);
			}
			if (sortingMethod === "pricedown") {
				hotels = hotels.sort(
					(a, b) => b.avgCostPerNight - a.avgCostPerNight
				);
			}
			if (sortingMethod === "rating") {
				hotels = hotels.sort((a, b) => b.rating * 1.9 - a.rating * 1.9);
			}
			hotels = hotels.filter(
				(item) =>
					item.avgCostPerNight >= priceRange[0] &&
					item.avgCostPerNight <= priceRange[1]
			);
			// console.log(hotels);
			setHotelsData(hotels);
		} catch (error) {
			console.log(error);
			setHotelsData(null);
		} finally {
			setIsLoading(false);
		}
	}
	async function bookHotel(id, depDate, arrDate) {
		const JWT = JSON.parse(localStorage.getItem("authToken"));
		const body = {
			bookingType: "hotel",
			bookingDetails: {
				hotelId: id,
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
		location,
		setLocation,
		checkinDate,
		setCheckinDate,
		hotelsData,
		searchHotels,
		bookHotel,
		checkoutDate,
		setCheckoutDate,
	};
	return (
		<HotelSearchContext.Provider value={{ ...provider }}>
			{children}
		</HotelSearchContext.Provider>
	);
}
