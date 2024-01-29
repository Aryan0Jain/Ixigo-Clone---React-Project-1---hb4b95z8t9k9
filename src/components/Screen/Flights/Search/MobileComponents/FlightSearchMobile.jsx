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
import notFound from "../../../../../assests/images/flightnotFound.png";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import swapSVG from "../../../../../assests/svgs/swap-white.svg";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { BiSolidError } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
// import FlightCard from "./FlightCard";
import { useSearchContext } from "../../../../../Contexts/SearchProdiver";
import ControlledCustomInput from "../../ControlledCustomInput";
import dayjs from "dayjs";
import { useAuthContext } from "../../../../../Contexts/AuthProvider";
import {
	AIRPORTS,
	FLIGHT_SORTING_METHODS,
	AIRLINES_INFO,
	FLGIHT_DEPARTURE_TIME_RANGES,
} from "../../../../../constants";
import { Autocomplete, Container, Modal, TextField } from "@mui/material";
export default function FlightSearchMobile() {
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
	const [openSearchPannel, setOpenSearchPannel] = useState(false);
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
	function handleOpenSearchPannel() {
		setOpenSearchPannel(true);
	}
	function handleCloseSearchPannel() {
		setOpenSearchPannel(false);
	}
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
		<Stack sx={{ mt: 8 }} alignItems={"center"}>
			<Box
				position={"sticky"}
				sx={{
					top: 64,
					zIndex: 1200,
					bgcolor: "#fff",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					pb: 0.8,
				}}
			>
				<Stack
					sx={{
						bgcolor: "#f2f2f2",
						width: "fit-content",
						py: 1,
						px: 5,
						borderRadius: 20,
					}}
					alignItems={"center"}
					onClick={handleOpenSearchPannel}
				>
					<Stack direction={"row"} alignItems={"center"} gap={0.5}>
						<Typography fontWeight={600} fontSize={12}>
							{AIRPORTS[fromCity].iata_code}
						</Typography>
						<FaArrowRightLong size={12} />
						<Typography fontWeight={600} fontSize={12}>
							{AIRPORTS[toCity].iata_code}
						</Typography>
					</Stack>
					<Stack
						direction={"row"}
						alignItems={"center"}
						gap={0.7}
						divider={
							<Box
								sx={{
									height: 4,
									width: 4,
									bgcolor: "#bab8b8",
									borderRadius: "50%",
								}}
							></Box>
						}
					>
						<Typography fontSize={10}>
							{departureDate.format("DD MMM")}
						</Typography>
						<Typography fontSize={10}>
							{travellers + 1} Traveller
							{travellers > 0 ? "s" : ""}
						</Typography>
						{/* <Typography fontSize={10}>
							{departureDate.format("DD MMM")}
						</Typography> */}
					</Stack>
				</Stack>
			</Box>
			<Modal
				keepMounted
				open={openSearchPannel}
				onClose={handleCloseSearchPannel}
			>
				<Stack
					alignItems={"center"}
					gap={1}
					sx={{
						position: "relative",
						width: "100%",
						bgcolor: "#fff",
						pt: 3,
					}}
				>
					<RxCross2
						size={20}
						style={{ position: "absolute", left: 24, top: 30 }}
						onClick={handleCloseSearchPannel}
					/>
					<Typography fontSize={20} fontWeight={600}>
						Modify Flight Search
					</Typography>
					<Autocomplete
						size="small"
						sx={{ width: 100, ":focus": { width: 200 } }}
						disablePortal
						disableClearable
						openOnFocus
						options={AIRPORTS}
						// slotProps={{
						// 	popper: { style: { width: "fit-content" } },
						// }}
						PopperComponent={CustomPopper}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="standard"
								placeholder="From"
								sx={{ width: 80, ":focus": { width: 200 } }}
							/>
						)}
						getOptionLabel={
							(option) => option.iata_code
							// + " - " + option.city
						}
						renderOption={(props, option) => {
							const { iata_code, name, city, country } = option;
							return (
								<Stack
									{...props}
									sx={{
										width: 250,
										textAlign: "center",
									}}
								>
									<Typography sx={{ mx: 0 }} fontSize={14}>
										{iata_code} - {city}, {country}
									</Typography>
									<Typography
										fontSize={11}
										color="rgba(0,0,0,0.6)"
									>
										{name}
									</Typography>
								</Stack>
							);
						}}
					/>
				</Stack>
			</Modal>
			<Stack></Stack>
		</Stack>
	);
}
function CustomPopper(props) {
	return <Popper {...props} className="custom-popper" placement="bottom" />;
}
