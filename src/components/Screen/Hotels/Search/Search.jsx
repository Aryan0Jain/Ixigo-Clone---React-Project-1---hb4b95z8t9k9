import {
	Autocomplete,
	Box,
	Button,
	Chip,
	ClickAwayListener,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	Slider,
	Stack,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
	HOTEL_COST_FREQUENCY,
	HOTEL_RATINGS,
	HOTEL_SORTING_OPTIONS,
	LOCATIONS,
} from "../../../../constants";
import { IoIosArrowDown } from "react-icons/io";
import { useHotelSearchContext } from "../../../../Contexts/HotelSearchProvider";
import { useLocation } from "react-router-dom";
import SearchInputPannel from "./SearchInputPannel";
import HotelCard from "./HotelCard";
import { CURRENCY_FORMATTER } from "../../../../utils";
import notFound from "../../../../assests/images/hotels-not-found.svg";
import { RxCross2 } from "react-icons/rx";
import Loader from "./Loader";
let fromLocation;
export default function HotelsSearch() {
	const { location, checkinDate, hotelsData, searchHotels, checkoutDate } =
		useHotelSearchContext();
	const [isLoading, setIsLoading] = useState(true);
	const urlLocation = useLocation();
	const [guests, setGuests] = useState(2);
	const [rooms, setRooms] = useState(1);
	const [priceRange, setPriceRange] = useState([0, 10000]);
	const [minimumRating, setMinimumRating] = useState(null);
	const [sortingMethod, setSortingMethod] = useState("popularity");
	const [filters, setFilters] = useState([]);
	const [priceRangeFilter, setPriceRangeFilter] = useState([0, 10000]);
	const handlePriceRangeChange = (e, newRange, activeSlider) => {
		if (!Array.isArray(newRange)) return;
		if (activeSlider == 0) {
			setPriceRange([
				Math.min(newRange[0], priceRange[1]),
				priceRange[1],
			]);
		} else {
			setPriceRange([
				priceRange[0],
				Math.max(newRange[1], priceRange[0]),
			]);
		}
	};
	const handlePriceRangeFilterChange = (e, newRange) => {
		setPriceRangeFilter(newRange);
		// if (!Array.isArray(newRange)) return;
		// if (activeSlider == 0) {
		// 	setPriceRangeFilter([
		// 		Math.min(newRange[0], priceRangeFilter[1]),
		// 		priceRangeFilter[1],
		// 	]);
		// } else {
		// 	setPriceRangeFilter([
		// 		priceRangeFilter[0],
		// 		Math.max(newRange[1], priceRangeFilter[0]),
		// 	]);
		// }
	};
	function handleRatingChange(e) {
		setMinimumRating(e.target.value);
		setFilters([
			HOTEL_RATINGS[
				HOTEL_RATINGS.findIndex(
					({ minRating }) => minRating == e.target.value
				)
			],
		]);
	}
	function handleChangeSort(e) {
		setSortingMethod(e.target.value);
	}
	function handleClearFilters() {
		setFilters([]);
		setMinimumRating(0);
		setPriceRange([0, 10000]);
		setPriceRangeFilter([0, 10000]);
	}
	useEffect(() => {
		window.scrollTo(0, 0);
		setIsLoading(true);
		searchHotels(setIsLoading, filters, sortingMethod, priceRangeFilter);
		fromLocation = LOCATIONS[location].city;
		console.log(priceRangeFilter);
	}, [urlLocation, filters, sortingMethod, priceRangeFilter]);
	return (
		<Box
			sx={{ mt: 8.2 }}
			textAlign={"center"}
			className="hotel-search-pannel"
		>
			<SearchInputPannel {...{ guests, setGuests, rooms, setRooms }} />
			{isLoading && <Loader />}
			{!isLoading && (
				<Container
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mt: 2,
						gap: 1,
					}}
				>
					<Stack
						sx={{
							width: "25%",
							bgcolor: "#FFFFFF",
							p: 2,
							borderRadius: "8px",
							textAlign: "left",
							height: "fit-content",
							position: "sticky",
							top: "170px",
						}}
						divider={<Divider orientation="horizontal" flexItem />}
						gap={2}
					>
						<Stack gap={2}>
							<Stack
								direction={"row"}
								justifyContent={"space-between"}
								alignItems={"center"}
							>
								<Typography fontSize={22} fontWeight={700}>
									Filters
								</Typography>
								{filters.length > 0 && (
									<Button
										disableRipple
										sx={{
											textTransform: "none",
											p: 0,
											m: 0,
											fontSize: 16,
											fontWeight: 600,
										}}
										onClick={handleClearFilters}
									>
										Clear All
									</Button>
								)}
							</Stack>
							<Stack>
								{filters.map((item, index) => {
									return (
										<Chip
											key={index}
											label={item.name}
											variant="outlined"
											sx={{
												width: "fit-content",
												borderColor:
													"rgb(200, 222, 247)",
												color: "#0770e4",
												bgcolor: "rgb(242, 247, 252)",
												":hover": {
													bgcolor:
														"rgb(200, 222, 247)",
												},
											}}
											deleteIcon={
												<RxCross2
													size={18}
													style={{
														color: "#0770e4",
														border: "1px solid #0770e4",
														borderRadius: "50%",
														padding: "2px",
													}}
												/>
											}
											onDelete={() => {
												setMinimumRating(0);
												setFilters((prev) => {
													const newFilters = [
														...prev,
													].filter(
														(filter) =>
															filter.name !==
															item.name
													);
													return newFilters;
												});
											}}
										/>
									);
								})}
							</Stack>
						</Stack>
						<Box>
							<Typography fontSize={18} fontWeight={600}>
								Average Cost
							</Typography>
							<Stack
								direction={"row"}
								alignItems={"flex-end"}
								sx={{ width: "92%", mx: "4%", mt: 2 }}
								gap={0.1}
							>
								{HOTEL_COST_FREQUENCY.map((height, index) => {
									return (
										<Box
											key={index}
											sx={{
												width: "2px",
												height: `${height}px`,
												bgcolor:
													index * 200 >=
														priceRange[0] &&
													index * 200 <= priceRange[1]
														? "#0770e4"
														: "#A0A5B0",
												flex: 1,
											}}
										></Box>
									);
								})}
							</Stack>
							<Slider
								// size="small"
								sx={{
									width: "92%",
									mx: "4%",
									mt: -1.7,
									"& .MuiSlider-thumb": {
										border: "2px solid #0770E4",
										color: "#fff",
									},
									"& .MuiSlider-track": {
										color: "#0770E4",
										height: "2px",
									},
									"& .MuiSlider-rail": {
										color: "#A0A5B0",
										height: "2px",
									},
									"& .MuiSlider-thumb:active": {
										boxShadow: "none",
									},
									"& .MuiSlider-thumb:hover": {
										boxShadow: "none",
									},
									"& .MuiSlider-thumb::before": {
										boxShadow: "none",
									},
									"& .MuiSlider-thumb.Mui-focusVisible": {
										boxShadow: "none",
									},
								}}
								disableSwap
								value={priceRange}
								onChange={handlePriceRangeChange}
								onChangeCommitted={handlePriceRangeFilterChange}
								min={0}
								step={200}
								max={10000}
								getAriaValueText={(price) => `₹${price}`}
							/>
							<Stack
								direction={"row"}
								justifyContent={"space-between"}
							>
								<Typography fontSize={14}>
									{CURRENCY_FORMATTER(priceRange[0])}
								</Typography>
								<Typography fontSize={14}>
									{CURRENCY_FORMATTER(priceRange[1])}
								</Typography>
							</Stack>
						</Box>
						<Box>
							<Typography fontSize={18} fontWeight={600}>
								User Rating
							</Typography>
							<RadioGroup
								value={minimumRating}
								onChange={handleRatingChange}
							>
								{HOTEL_RATINGS.map(({ name, minRating }) => {
									return (
										<FormControlLabel
											key={name}
											value={minRating}
											control={
												<Radio
													disableRipple
													sx={{
														m: 1,
														p: 0,
														"&.Mui-checked": {
															color: "#0770e4",
														},
														":hover": {
															bgcolor:
																"rgb(200, 222, 247)",
														},
													}}
												/>
											}
											label={name}
											labelPlacement="start"
											sx={{
												width: "100%",
												p: 0,
												m: 0,
												display: "flex",
												justifyContent: "space-between",
											}}
										/>
									);
								})}
							</RadioGroup>
						</Box>
					</Stack>
					<Box sx={{ width: "75%", p: 2 }}>
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Typography fontSize={20} fontWeight={600}>
								Showing Properties In {fromLocation}
							</Typography>
							<FormControl>
								<Select
									MenuProps={{
										disableScrollLock: true,
									}}
									IconComponent={IoIosArrowDown}
									size="small"
									value={sortingMethod}
									onChange={handleChangeSort}
									sx={{
										width: "230px",
										bgcolor: "#fff",
										textAlign: "left",
										// px: 2,
										borderRadius: "10px",
									}}
								>
									{HOTEL_SORTING_OPTIONS.map(
										({ type, value }) => {
											return (
												<MenuItem
													disableRipple
													key={value}
													value={value}
												>
													<Stack>
														<Typography>
															{type}
														</Typography>
													</Stack>
												</MenuItem>
											);
										}
									)}
								</Select>
							</FormControl>
						</Stack>
						<Stack gap={2} sx={{ mt: 2 }}>
							{hotelsData.length == 0 && (
								<Stack
									sx={{ width: "300px", mx: "auto" }}
									gap={3}
									alignItems={"center"}
								>
									<img
										src={notFound}
										style={{ borderRadius: "10px" }}
									/>
									<Typography fontSize={22} fontWeight={600}>
										Oops! No properties found
									</Typography>
									<Typography fontSize={16}>
										Please remove the filters and try again.
									</Typography>
									<Button
										variant="contained"
										disableRipple
										sx={{
											textTransform: "none",
											boxShadow: "none",
											borderRadius: "10px",
											bgcolor: "rgb(252, 121, 13)",
											":hover": {
												boxShadow: "none",
												bgcolor: "rgb(253, 148, 61)",
											},
										}}
										onClick={handleClearFilters}
									>
										Search Again
									</Button>
								</Stack>
							)}
							{hotelsData.length > 0 &&
								hotelsData.map((item) => {
									return (
										<HotelCard
											key={item._id}
											hotelData={item}
											checkinDate={checkinDate}
										/>
									);
								})}
						</Stack>
					</Box>
				</Container>
			)}
		</Box>
	);
}
