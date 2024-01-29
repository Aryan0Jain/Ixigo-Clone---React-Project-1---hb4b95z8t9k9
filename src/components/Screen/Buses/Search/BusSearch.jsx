import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import React, { useEffect, useRef, useState } from "react";
import BusCityInput from "../BusCityInput";
import { DatePicker } from "@mui/x-date-pickers";
import { IoSwapHorizontal } from "react-icons/io5";
import { FaBusAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { BiSolidError } from "react-icons/bi";
import { WiSnowflakeCold } from "react-icons/wi";
import { FaArrowDownLong } from "react-icons/fa6";
import { useBusSearchContext } from "../../../../Contexts/BusSearchProvider";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import BusCard from "./BusCard";
import { useAuthContext } from "../../../../Contexts/AuthProvider";
import {
	BUS_CITIES,
	BUS_DEPARTURE_TIME_RANGES,
	BUS_SORT_TYPES,
} from "../../../../constants";

const popperSX = {
	border: 0,
	py: 0.5,
	px: 1,
	fontSize: "14px",
	bgcolor: "rgba(255,0,0,0.1)",
	color: "#D50000",
	fontWeight: 500,
	display: "flex",
	alignItems: "center",
	left: -3,
	mt: "8px",
	borderBottomRightRadius: "5px",
	borderBottomLeftRadius: "5px",
};
export default function BusSearch() {
	const {
		source,
		setSource,
		destination,
		setDestination,
		departureDate,
		setDepartureDate,
		searchBuses,
		busRoutes,
	} = useBusSearchContext();
	const { setShowLoginSignupForm, isLoggedIn, setRedirect, setRedirectTo } =
		useAuthContext();
	const sourceRef = useRef();
	const destinationRef = useRef();
	const depDateRef = useRef();
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [priceRange, setPriceRange] = useState([500, 2000]);
	const [sortState, setSortState] = useState({
		active: false,
		type: "",
		sortAscending: true,
	});
	const [busType, setBusType] = useState([false, false]);
	const [departureTimeRange, setDepartureTimeRange] = useState([
		false,
		false,
		false,
		false,
	]);
	useEffect(() => {
		const from = searchParams.get("from");
		const to = searchParams.get("to");
		setSource(BUS_CITIES.findIndex((item) => item == from));
		setDestination(BUS_CITIES.findIndex((item) => item == to));
		setDepartureDate(new dayjs(searchParams.get("date")));
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		searchBuses(setIsLoading);
	}, [location]);
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
	function removeError() {
		setErrorMessage("");
		setAnchorEl(null);
	}
	function handleSortButton(type) {
		if (sortState.type === type) {
			setSortState((prev) => {
				return { ...prev, sortAscending: !prev.sortAscending };
			});
			return;
		}
		let sortAscending;

		switch (type) {
			case "Price":
			case "Arrival Time":
			case "Departure Time":
				sortAscending = true;
				break;
			default:
				sortAscending = false;
				break;
		}
		setSortState({ active: true, type, sortAscending });
	}
	function handleBusType(index) {
		const newTypes = [...busType];
		newTypes[index] = !newTypes[index];
		setBusType(newTypes);
	}
	function handleDepartureTimeRange(index) {
		const newTypes = [...departureTimeRange];
		newTypes[index] = !newTypes[index];
		setDepartureTimeRange(newTypes);
	}
	function shouldClearAllBeVisible() {
		if (busType.includes(true)) return true;
		if (priceRange[0] != 500 || priceRange[1] != 2000) return true;
		if (departureTimeRange.includes(true)) return true;
		return false;
	}
	function handleClearAll() {
		setBusType([false, false]);
		setPriceRange([500, 2000]);
		setDepartureTimeRange([false, false, false, false]);
	}
	function filterData() {
		let updatedResults = busRoutes ? [...busRoutes] : [];
		if (sortState.active) {
			updatedResults = updatedResults.sort((a, b) => {
				switch (sortState.type) {
					case "Price":
						return sortState.sortAscending
							? a.fare - b.fare
							: b.fare - a.fare;
					case "Seats":
						return sortState.sortAscending
							? a.seats - b.seats
							: b.seats - a.seats;
					case "Ratings":
						return sortState.sortAscending
							? a.amenities.length - b.amenities.length
							: b.amenities.length - a.amenities.length;
					case "Arrival Time":
						return sortState.sortAscending
							? a.arrivalTime.localeCompare(b.arrivalTime)
							: b.arrivalTime.localeCompare(a.arrivalTime);
					case "Departure Time":
						return sortState.sortAscending
							? a.departureTime.localeCompare(b.departureTime)
							: b.departureTime.localeCompare(a.departureTime);
				}
			});
		}
		if (shouldClearAllBeVisible()) {
			if (busType[0] ^ busType[1]) {
				if (busType[0]) {
					updatedResults = updatedResults.filter(
						(bus) => bus.type === "AC"
					);
				} else {
					updatedResults = updatedResults.filter(
						(bus) => bus.type === "Non-AC"
					);
				}
			}
			if (priceRange[0] !== 500 || priceRange[1] !== 2000) {
				updatedResults = updatedResults.filter(
					(bus) =>
						bus.fare >= priceRange[0] && bus.fare <= priceRange[1]
				);
			}
			if (departureTimeRange.includes(true)) {
				updatedResults = updatedResults.filter(
					(bus) => departureTimeRange[getTimeRange(bus.departureTime)]
				);
			}
		}
		return updatedResults;
	}
	function getTimeRange(time) {
		if (time < "10:00") return 0;
		if (time <= "17:00") return 1;

		if (time <= "23:00") return 2;
		return 3;
	}
	function handleBook(id) {
		const { amenities, available, ratings, __v, ...busDetails } =
			busRoutes[busRoutes.findIndex((item) => item._id == id)];
		let url = `/buses/booking/${id}?date=${departureDate.toJSON()}&busdetails=${JSON.stringify(
			busDetails
		)}`;
		if (!isLoggedIn) {
			setShowLoginSignupForm(true);
			setRedirect(true);
			setRedirectTo(url);
			return;
		}
		navigate(url);
	}
	function validateAndFetch() {
		if (source === destination) {
			setErrorMessage("Source & Destination Can't be same!");
			setAnchorEl(sourceRef.current);
			return;
		}
		if (!departureDate) {
			setErrorMessage("Please Enter A Date!");
			setAnchorEl(depDateRef.current);
			return;
		}
		if (departureDate.$d == "Invalid Date") {
			setErrorMessage("Please Enter A Valid Date!");
			setAnchorEl(depDateRef.current);
			return;
		}
		const difference = departureDate.diff(new dayjs().hour(0).minute(0));
		// console.log(difference);
		if (difference < 0 || difference > 91 * 24 * 3600 * 1000) {
			setErrorMessage("Date is out of Range!");
			setAnchorEl(depDateRef.current);
			return;
		}
		setAnchorEl(null);
		const date = departureDate.toJSON();
		const from = encodeURI(BUS_CITIES[source]);
		const to = encodeURI(BUS_CITIES[destination]);
		// console.log(from);
		const url = `/buses/search?date=${date}&from=${from}&to=${to}`;
		setIsLoading(true);
		navigate(url);
	}
	return (
		<Box sx={{ mt: 8.2 }}>
			<Stack
				direction={"row"}
				justifyContent={"center"}
				alignItems={"center"}
				gap={4}
				sx={{
					background: "linear-gradient(45deg,#721053,#AD2E41)",
					py: 0.75,
					position: "sticky",
					top: "66px",
					zIndex: 10,
				}}
			>
				<BusCityInput
					Icon={FaBusAlt}
					placeholder="From City"
					value={source}
					setValue={setSource}
					removeError={removeError}
					ref={sourceRef}
					bgColor="#FFFFFF"
					borderRadius="8px"
				/>
				<IoSwapHorizontal
					size={40}
					style={{
						backgroundColor: "#f2f2f2",
						padding: "10px",
						borderRadius: "8px",
						color: "grey",
					}}
				/>
				<BusCityInput
					Icon={FaMapMarkerAlt}
					placeholder="To City"
					value={destination}
					setValue={setDestination}
					removeError={removeError}
					ref={destinationRef}
					bgColor="#FFFFFF"
					borderRadius="8px"
				/>
				<Box
					sx={{
						display: "flex",
						border: "1px solid rgba(0,0,0,0.1)",
						borderRadius: "8px",
						alignItems: "center",
						height: "fit-content",
						p: 0.75,
						px: 2,
						bgcolor: "#ffffff",
					}}
				>
					<DatePicker
						ref={depDateRef}
						sx={{
							width: 150,
						}}
						slotProps={{
							textField: {
								variant: "standard",
								InputLabelProps: { shrink: true },
								InputProps: {
									disableUnderline: true,
								},
							},
							inputAdornment: {
								position: "start",
							},
						}}
						slots={{ openPickerIcon: FcCalendar }}
						format="DD/MM/YYYY"
						disablePast
						reduceAnimations
						maxDate={new dayjs().add(90, "day")}
						value={departureDate}
						onChange={(val) => {
							setDepartureDate(val);
							removeError();
						}}
					/>
				</Box>

				<Button
					variant="contained"
					sx={{
						textTransform: "none",
						px: 6,
						py: 0.7,
						fontSize: 20,
						borderRadius: "8px",
					}}
					onClick={validateAndFetch}
				>
					Search
				</Button>
				<Popper
					placement="bottom-start"
					open={anchorEl != null}
					anchorEl={anchorEl}
					sx={{ zIndex: 100 }}
				>
					<Paper>
						<Box sx={{ ...popperSX }}>
							<BiSolidError
								size="17px"
								style={{ marginRight: "5px" }}
							/>{" "}
							<Typography fontSize={14}>
								{errorMesaage}
							</Typography>
						</Box>
					</Paper>
				</Popper>
			</Stack>
			<Container
				sx={{
					bgcolor: "#FFFFFF",
					py: 0.75,
					display: "flex",
					gap: 2,
					alignItems: "center",
					position: "sticky",
					top: 124,
					zIndex: 5,
				}}
			>
				<Typography fontWeight={600} fontSize={16}>
					Sort By :
				</Typography>
				<Stack direction={"row"} gap={3}>
					{BUS_SORT_TYPES.map((type) => {
						return (
							<Stack
								key={type}
								direction={"row"}
								alignItems={"center"}
								sx={{
									fontSize: 14,
									color:
										sortState.active &&
										sortState.type === type
											? "#ec5b24"
											: "#000",
									cursor: "pointer",
								}}
								gap={0.75}
								onClick={() => handleSortButton(type)}
							>
								<Typography fontSize={16}>{type}</Typography>
								<FaArrowDownLong
									color="#ec5b24"
									size={12}
									style={{
										visibility: `${
											sortState.active &&
											sortState.type === type
												? "initial"
												: "hidden"
										}`,
										transform: `rotate(${
											sortState.sortAscending
												? "0deg"
												: "180deg"
										})`,
										transition: "transform 120ms",
									}}
								/>
								{/* )} */}
							</Stack>
						);
					})}
				</Stack>
			</Container>
			<Container
				sx={{
					display: "flex",
					justifyContent: "space-between",
					mt: 2,
					gap: 1,
				}}
				className="bus-search-page"
			>
				<Box
					sx={{
						width: "25%",
						// bgcolor: "#FFFFFF",
						borderRadius: "8px",
					}}
				>
					<Stack
						sx={{
							p: 2,
							position: "sticky",
							top: 180,
							width: "100%",
							bgcolor: "#FFFFFF",
							borderRadius: "8px",
						}}
						gap={2}
					>
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
						>
							<Typography>Filters</Typography>
							{shouldClearAllBeVisible() && (
								<Button
									disableRipple
									onClick={handleClearAll}
									sx={{ textTransform: "none", p: 0, m: 0 }}
								>
									Clear All
								</Button>
							)}
						</Stack>
						<Divider orientation="horizontal" flexItem />
						<Box
							sx={{
								bgcolor: "#f2f2f2",
								p: 2,
								borderRadius: "8px",
							}}
						>
							<Typography>Bus Type</Typography>
							<Stack
								direction={"row"}
								justifyContent={"space-around"}
								sx={{ mt: 0.5 }}
							>
								<Stack
									sx={{
										bgcolor: "#FFF",
										border: `1px solid ${
											busType[0] ? "#ec5b24" : "#fff"
										}`,
										py: 0.2,
										borderRadius: "8px",
										width: 80,
										cursor: "pointer",
										color: `${
											busType[0] ? "#ec5b24" : "#000"
										}`,
									}}
									alignItems={"center"}
									onClick={() => handleBusType(0)}
								>
									<WiSnowflakeCold size={24} />
									<Typography>AC</Typography>
								</Stack>
								<Stack
									sx={{
										bgcolor: "#FFF",
										border: `1px solid ${
											busType[1] ? "#ec5b24" : "#fff"
										}`,
										py: 0.2,
										borderRadius: "8px",
										width: 80,
										cursor: "pointer",
										color: `${
											busType[1] ? "#ec5b24" : "#000"
										}`,
									}}
									onClick={() => handleBusType(1)}
									alignItems={"center"}
								>
									<WiSnowflakeCold size={24} />
									<Typography>Non AC</Typography>
								</Stack>
							</Stack>
						</Box>
						<Box
							sx={{
								bgcolor: "#f2f2f2",
								p: 2,
								borderRadius: "8px",
							}}
						>
							<Typography>Price Range</Typography>
							<Stack
								direction={"row"}
								justifyContent={"space-between"}
							>
								<Typography>₹{priceRange[0]}</Typography>
								<Typography>₹{priceRange[1]}</Typography>
							</Stack>
							<Slider
								sx={{
									width: "92%",
									mx: "4%",
									".MuiSlider-mark": {
										color: "green",
									},
								}}
								size="small"
								value={priceRange}
								onChange={handlePriceRangeChange}
								disableSwap
								min={500}
								max={2000}
								getAriaValueText={(price) => `₹${price}`}
								step={5}
								marks={[
									{ value: 500, label: "₹500" },
									{ value: 2000, label: "₹2,000" },
								]}
							/>
						</Box>
						<Box
							sx={{
								bgcolor: "#f2f2f2",
								p: 2,
								borderRadius: "8px",
							}}
						>
							<Typography>Departure Time</Typography>
							<Stack
								direction={"row"}
								justifyContent={"center"}
								sx={{ mt: 0.5 }}
								flexWrap={"wrap"}
								gap={2}
							>
								{BUS_DEPARTURE_TIME_RANGES.map(
									({ label, SVG }, index) => {
										return (
											<Stack
												key={label}
												sx={{
													bgcolor: "#FFF",
													py: 0.2,
													borderRadius: "8px",
													width: 100,
													cursor: "pointer",
													border: `1px solid ${
														departureTimeRange[
															index
														]
															? "#ec5b24"
															: "#fff"
													}`,
													color: ` ${
														departureTimeRange[
															index
														]
															? "#ec5b24"
															: "#000"
													}`,
												}}
												onClick={() =>
													handleDepartureTimeRange(
														index
													)
												}
												alignItems={"center"}
											>
												<SVG size={24} />
												<Typography fontSize={12}>
													{label}
												</Typography>
											</Stack>
										);
									}
								)}
							</Stack>
						</Box>
					</Stack>
				</Box>
				<Box
					sx={{
						width: "75%",
						p: 1,
						bgcolor: "#F2F2F2",
						borderRadius: "8px",
					}}
				>
					<Stack gap={2}>
						{isLoading &&
							Array.from({ length: 9 }, (_, i) => i + 1).map(
								(i) => (
									<div
										key={i}
										className="bus-cards-loader"
									></div>
								)
							)}
						{!isLoading &&
							filterData().map((bus) => {
								return (
									<BusCard
										busDetails={bus}
										key={bus._id}
										departureDate={departureDate}
										handleBook={handleBook}
									/>
								);
							})}
					</Stack>
				</Box>
			</Container>
		</Box>
	);
}
