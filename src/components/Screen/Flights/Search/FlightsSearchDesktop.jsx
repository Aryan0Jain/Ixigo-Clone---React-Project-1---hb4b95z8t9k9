import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Popper from "@mui/material/Popper";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useRef, useState } from "react";
import notFound from "../../../../assests/images/flightnotFound.png";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import swapSVG from "../../../../assests/svgs/swap-white.svg";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { BiSolidError } from "react-icons/bi";
import FlightCard from "./FlightCard";
import { useSearchContext } from "../../../../Contexts/SearchProdiver";
import ControlledCustomInput from "../ControlledCustomInput";
import dayjs from "dayjs";
import { useAuthContext } from "../../../../Contexts/AuthProvider";
import {
	AIRPORTS,
	FLIGHT_SORTING_METHODS,
	AIRLINES_INFO,
	FLGIHT_DEPARTURE_TIME_RANGES,
} from "../../../../constants";

export default function FlightsSearchDesktop() {
	const {
		fromCity,
		setFromCity,
		toCity,
		setToCity,
		departureDate,
		setDepartureDate,
		travellers,
		setTravellers,
		data,
		searchBookings,
	} = useSearchContext();
	const { setShowLoginSignupForm, isLoggedIn, setRedirect, setRedirectTo } =
		useAuthContext();
	const fromRef = useRef();
	const toRef = useRef();
	const departureRef = useRef();
	const passengerRef = useRef();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const [stops, setStops] = useState(2);
	const [alignment, setAlignment] = useState(null);
	const [price, setPrice] = useState(2500);
	const [withfilters, setWithFilters] = useState(false);
	const [filteredData, setFilteredData] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	const [sortingMethod, setSortingMethod] = useState("recommended");
	const [isLoading, setIsLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [airlines, setAirlines] = useState({
		"6E": false,
		AI: false,
		UK: false,
		SG: false,
		G8: false,
	});
	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};
	const displayFromCity =
		AIRPORTS[
			AIRPORTS.findIndex(
				(item) => item.iata_code == searchParams.get("from")
			)
		].city;
	useEffect(() => {
		const from = searchParams.get("from");
		const to = searchParams.get("to");
		setFromCity(AIRPORTS.findIndex((item) => item.iata_code == from));
		setToCity(AIRPORTS.findIndex((item) => item.iata_code == to));
		setDepartureDate(new dayjs(searchParams.get("date")));
		setTravellers(searchParams.get("travellers") - 1);
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		searchBookings(setIsLoading);
		setPageNumber(1);
	}, [location]);
	const priceLabelFormat = (x) =>
		"₹" +
		(x < 1000
			? x
			: Math.floor(x / 1000) + "," + ("" + (x % 1000)).padStart(3, "0"));
	function validateAndFetch() {
		handleResetFilters();
		const from = fromRef.current.querySelector("input").value.slice(0, 3);
		const to = toRef.current.querySelector("input").value.slice(0, 3);
		if (to == from) {
			setErrorMessage("Form City & To City Can't be same!");
			setAnchorEl(fromRef.current);
			return;
		}
		if (!departureDate) {
			setErrorMessage("Please Enter A Date!");
			setAnchorEl(departureRef.current);
			return;
		}
		if (departureDate.$d == "Invalid Date") {
			setErrorMessage("Please Enter A Valid Date!");
			setAnchorEl(departureRef.current);
			return;
		}
		const isInThePast =
			departureDate.diff(new dayjs().hour(0).minute(0)) < 0;
		const isItMoreThanAYear =
			departureDate.diff(new dayjs().add(-1, "day").add(1, "year")) > 0;
		if (isInThePast || isItMoreThanAYear) {
			setErrorMessage("Date is out of Range!");
			setAnchorEl(departureRef.current);
			return;
		}
		const pass = passengerRef.current.querySelector("input").value.at(0);
		setIsLoading(true);
		setPageNumber(1);
		let url = `/flights/search?date=${departureDate.toJSON()}&from=${from}&to=${to}&travellers=${pass}`;
		navigate(url);
	}
	function removeError() {
		setErrorMessage("");
		setAnchorEl(null);
	}
	function handleFilters() {
		setWithFilters(true);
		setPageNumber(1);
		let newData = [...data];
		if (stops < 2) {
			newData = newData.filter((item) => item.stops <= stops);
		}
		if (alignment == "early-morning")
			newData = newData.filter(
				(item) =>
					item.departureTime >= "00:00" &&
					item.departureTime <= "06:00"
			);
		if (alignment == "morning")
			newData = newData.filter(
				(item) =>
					item.departureTime >= "06:00" &&
					item.departureTime <= "12:00"
			);
		if (alignment == "mid-day")
			newData = newData.filter(
				(item) =>
					item.departureTime >= "12:00" &&
					item.departureTime <= "18:00"
			);
		if (alignment == "night")
			newData = newData.filter(
				(item) =>
					item.departureTime >= "18:00" &&
					item.departureTime <= "24:00"
			);
		if (Object.values(airlines).includes(true)) {
			newData = newData.filter(
				(item) => airlines[item.flightID.slice(0, 2)]
			);
		}
		newData = newData.filter((item) => item.ticketPrice <= price);
		switch (sortingMethod) {
			case "cheapest":
				newData.sort((a, b) => a.ticketPrice - b.ticketPrice);
				break;
			case "quickest":
				newData.sort((a, b) => a.duration - b.duration);
				break;
			case "earliest":
				newData.sort((a, b) => {
					const aTime =
						+a.departureTime.slice(0, 2) * 60 +
						+a.departureTime.slice(3, 5);
					const bTime =
						+b.departureTime.slice(0, 2) * 60 +
						+b.departureTime.slice(3, 5);
					return aTime - bTime;
				});
				break;
			default:
				break;
		}
		setFilteredData(newData);
	}
	function handleResetFilters() {
		setWithFilters(false);
		setStops(2);
		setAlignment(null);
		setAirlines({
			"6E": false,
			AI: false,
			UK: false,
			SG: false,
			G8: false,
		});
		setPrice(2500);
	}
	function handleBook(id) {
		const { aircraftModel, airline, amenities, ...flightdata } =
			data[data.findIndex((item) => item._id == id)];
		let url = `/flights/booking/review/${id}?date=${departureDate.toJSON()}&travellers=${
			travellers + 1
		}&flightdata=${JSON.stringify(flightdata)}`;
		if (!isLoggedIn) {
			setShowLoginSignupForm(true);
			setRedirect(true);
			setRedirectTo(url);
			return;
		}
		navigate(url);
	}
	return (
		<Box sx={{ mt: 8.2 }} className="flights-search">
			<Stack
				direction={"row"}
				justifyContent={"center"}
				alignItems={"center"}
				className="search-pannel"
				gap={4}
			>
				<ControlledCustomInput
					removeError={removeError}
					label="From"
					placeholder="Enter city or airport"
					value={fromCity}
					setValue={setFromCity}
					ref={fromRef}
				></ControlledCustomInput>
				<IconButton
					onClick={() => {
						setFromCity(toCity);
						setToCity(fromCity);
					}}
					disableRipple
					className="swap-button"
				>
					<img src={swapSVG} color="#fff" />
				</IconButton>
				<ControlledCustomInput
					removeError={removeError}
					label="To"
					placeholder="Enter city or airport"
					value={toCity}
					setValue={setToCity}
					ref={toRef}
				></ControlledCustomInput>
				<DatePicker
					ref={departureRef}
					sx={{ width: 200 }}
					slotProps={{
						textField: {
							variant: "standard",
							InputLabelProps: { shrink: true },
						},
						inputAdornment: {
							sx: { "& svg": { fill: "white" } },
						},
					}}
					format="DD MMM, dddd"
					disablePast
					label="Departure"
					reduceAnimations
					maxDate={new dayjs().add(-1, "day").add(1, "year")}
					value={departureDate}
					onChange={(val) => {
						setDepartureDate(val);
						setAnchorEl(null);
					}}
				/>
				<ControlledCustomInput
					removeError={removeError}
					label="Travellers"
					placeholder="Number of Travellers"
					value={travellers}
					setValue={setTravellers}
					type="number"
					ref={passengerRef}
				></ControlledCustomInput>
				<Button className="search-btn" onClick={validateAndFetch}>
					Search
				</Button>
				<Popper
					placement="bottom-start"
					open={anchorEl != null}
					anchorEl={anchorEl}
					sx={{ zIndex: 2000 }}
				>
					<Box className="flight-search-popper">
						<Typography fontSize={14}>{errorMesaage}</Typography>
						<BiSolidError
							size="17px"
							style={{ marginLeft: "5px" }}
						/>
					</Box>
				</Popper>
			</Stack>

			<Stack
				className="filter-options"
				direction="row"
				divider={<Divider orientation="vertical" flexItem />}
				gap={2}
				justifyContent={"center"}
			>
				<Stack>
					<Typography>Stops</Typography>
					<FormGroup sx={{ flexDirection: "column" }}>
						<FormControlLabel
							control={
								<Checkbox
									size="small"
									disableRipple
									checked={stops == 2}
									onClick={() => setStops(2)}
								/>
							}
							label={
								<Typography fontSize={14}>1+ Stops</Typography>
							}
						/>
						<FormControlLabel
							control={
								<Checkbox
									size="small"
									disableRipple
									checked={stops == 1}
									onClick={() => setStops(1)}
								/>
							}
							label={
								<Typography fontSize={14}>1 Stop</Typography>
							}
						/>
						<FormControlLabel
							control={
								<Checkbox
									size="small"
									disableRipple
									checked={stops == 0}
									onClick={() => setStops(0)}
								/>
							}
							label={
								<Typography fontSize={14}>Non Stop</Typography>
							}
						/>
					</FormGroup>
				</Stack>
				<Stack>
					<Typography>Departure From {displayFromCity}</Typography>
					<ToggleButtonGroup
						variant="small"
						color="primary"
						className="toggle-button-group"
						value={alignment}
						exclusive
						onChange={handleChange}
					>
						{FLGIHT_DEPARTURE_TIME_RANGES.map(
							({ name, value, range }) => {
								return (
									<ToggleButton
										key={value}
										sx={{
											fontSize: "12px",
											px: 0,
											width: 110,
											display: "flex",
											flexDirection: "column",
										}}
										disableRipple
										value={value}
									>
										{range}
										<Typography
											fontSize={10}
											fontWeight={600}
										>
											{name}
										</Typography>
									</ToggleButton>
								);
							}
						)}
					</ToggleButtonGroup>
				</Stack>
				<Stack>
					<Typography>Airlines</Typography>
					<Grid2
						container
						spacing={0}
						// sx={{ width: "250px" }}
						className="airlines"
					>
						{AIRLINES_INFO.map(({ name, key }) => {
							return (
								<Grid2 xs={6} key={key}>
									<FormControlLabel
										control={
											<Checkbox
												size="small"
												checked={airlines[key]}
												onClick={() =>
													setAirlines((prev) => {
														const newAirlines = {
															...prev,
														};
														newAirlines[key] =
															!prev[key];
														return newAirlines;
													})
												}
											/>
										}
										label={
											<Typography fontSize={"14px"}>
												{name}
											</Typography>
										}
									/>
								</Grid2>
							);
						})}
					</Grid2>
				</Stack>
				<Stack>
					<Typography>
						Max Price:{" "}
						<span style={{ color: "#ec5b24" }}>
							{priceLabelFormat(price)}
						</span>
					</Typography>
					<Box sx={{ width: 300 }}>
						<Slider
							sx={{
								".MuiSlider-markLabel": {
									fontSize: "12px",
								},
								ml: 2,
							}}
							defaultValue={2500}
							max={2500}
							min={2000}
							step={1}
							value={price}
							onChange={(e, v) => setPrice(v)}
							valueLabelFormat={priceLabelFormat}
							valueLabelDisplay="off"
							marks={[
								{ label: "₹2,000", value: 2000 },
								{ label: "₹2,125", value: 2125 },
								{ label: "₹2,250", value: 2250 },
								{ label: "₹2,375", value: 2375 },
								{ label: "₹2,500", value: 2500 },
							]}
						/>
					</Box>

					<Stack
						className="filter-options"
						alignItems={"center"}
						justifyContent="center"
						flexDirection={"row"}
						sx={{ mt: 1 }}
						gap={1}
					>
						<Button
							onClick={handleFilters}
							disableRipple
							variant="contained"
							sx={{ px: 4, fontWeight: 700 }}
						>
							Apply
						</Button>
						<Button onClick={handleResetFilters}>
							Reset Filters
						</Button>
						<FormControl sx={{ width: "150px", p: 0 }}>
							<InputLabel>Sort</InputLabel>
							<Select
								MenuProps={{
									disableScrollLock: true,
								}}
								size="small"
								value={sortingMethod}
								label="Sort : "
								onChange={(e) =>
									setSortingMethod(e.target.value)
								}
								className="sort-menu"
							>
								{FLIGHT_SORTING_METHODS.map(
									({ name, value }) => {
										return (
											<MenuItem
												value={value}
												key={value}
												sx={{ fontSize: 12 }}
											>
												{name}
											</MenuItem>
										);
									}
								)}
							</Select>
						</FormControl>
					</Stack>
				</Stack>
			</Stack>
			{isLoading &&
				Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
					<div key={i} className="flight-cards-loader"></div>
				))}
			{!isLoading && data == null && (
				<Stack gap={2} sx={{ pt: 2 }} className="data-container">
					<Stack alignItems={"center"} gap={2} sx={{ my: 2 }}>
						<img src={notFound} style={{ width: "800px" }} />
						<Typography color="rgba(0,0,0,.64)" fontSize={20}>
							Oops! Some Error occurred.
						</Typography>
						<Typography color="rgba(0,0,0,.64)" fontSize={14}>
							Please retry after sometime.
						</Typography>
					</Stack>
				</Stack>
			)}
			{!isLoading && data != null && (
				<Stack gap={2} sx={{ pt: 2 }} className="data-container">
					{((withfilters && filteredData.length == 0) ||
						(!withfilters && data.length == 0)) && (
						<Stack alignItems={"center"} gap={2} sx={{ my: 2 }}>
							<img src={notFound} style={{ width: "800px" }} />
							<Typography color="rgba(0,0,0,.64)" fontSize={20}>
								Oops! No matches for the applied filters
							</Typography>
							<Typography color="rgba(0,0,0,.64)" fontSize={14}>
								Try applying a different set of filters and
								search again.
							</Typography>
							<Button
								onClick={handleResetFilters}
								disableRipple
								variant="contained"
								sx={{ px: 4, fontWeight: 700 }}
							>
								RESET FILTERS
							</Button>
						</Stack>
					)}
					{(withfilters
						? filteredData.slice(
								8 * (pageNumber - 1),
								Math.min(8 * pageNumber, filteredData.length)
						  )
						: data.slice(
								8 * (pageNumber - 1),
								Math.min(8 * pageNumber, data.length)
						  )
					).map((item) => (
						<FlightCard
							key={item._id}
							{...item}
							handleBook={handleBook}
							searchParams={searchParams}
						/>
					))}
					{((withfilters && filteredData.length != 0) ||
						(!withfilters && data.length != 0)) && (
						<Pagination
							color="secondary"
							className="pagination"
							sx={{ alignSelf: "center", m: 2 }}
							page={pageNumber}
							onChange={(e, p) => setPageNumber(p)}
							count={
								withfilters
									? Math.ceil(filteredData.length / 8)
									: Math.ceil(data.length / 8)
							}
							shape="rounded"
						/>
					)}
				</Stack>
			)}
		</Box>
	);
}
