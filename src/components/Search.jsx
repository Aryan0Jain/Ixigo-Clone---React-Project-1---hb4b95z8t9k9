import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputLabel,
	MenuItem,
	Pagination,
	Popper,
	Select,
	Slider,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
	useLocation,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import ControlledCustomInput from "./ControlledCustomInput";
import swapSVG from "../assests/svgs/swap-white.svg";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSearchContext } from "./Contexts/SearchProdiver";
import { BiSolidError } from "react-icons/bi";
import FlightCard from "./FlightCard";
const popperSX = {
	border: 0,
	py: 0.5,
	px: 1,
	fontSize: "14px",
	bgcolor: "#FFFFFF",
	color: "#D50000",
	fontWeight: 500,
	display: "flex",
	alignItems: "center",
	mt: "0px",
	borderBottomRightRadius: "5px",
	borderBottomLeftRadius: "5px",
};
export default function Search() {
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
		airports,
	} = useSearchContext();
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
		airports[
			airports.findIndex(
				(item) => item.iata_code == searchParams.get("from")
			)
		].city;
	useEffect(() => {
		const from = searchParams.get("from");
		const to = searchParams.get("to");
		setFromCity(airports.findIndex((item) => item.iata_code == from));
		setToCity(airports.findIndex((item) => item.iata_code == to));
		setDepartureDate(searchParams.get("date"));
		setTravellers(searchParams.get("travellers") - 1);
	}, []);
	useEffect(() => {
		searchBookings();
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
		const depDate = departureRef.current.value;
		if (!depDate) {
			setErrorMessage("Please Enter A Valid Date!");
			setAnchorEl(departureRef.current);
			return;
		}
		const pass = passengerRef.current.querySelector("input").value.at(0);
		let airlineArray = [];
		Object.keys(airlines).forEach((i) => {
			if (airlines[i]) airlineArray.push(i);
		});
		const airlineString = airlineArray.join(",");
		setFromCity(airports.findIndex((item) => item.iata_code == from));
		setToCity(airports.findIndex((item) => item.iata_code == to));
		setDepartureDate(depDate);
		setTravellers(pass - 1);
		setPageNumber(1);
		let url = `/flights/search?date=${depDate}&from=${from}&to=${to}&travellers=${pass}`;
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
		// console.log(stops, alignment, airlines, price);
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
	return (
		<Box sx={{ mt: 8.2 }}>
			<Stack
				direction={"row"}
				justifyContent={"center"}
				alignItems={"center"}
				className="search-pannel"
				gap={4}
				sx={{
					background: "linear-gradient(45deg,#721053,#AD2E41)",
					py: 4,
				}}
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
					sx={{
						mx: 1,
						p: 0.2,
						height: "fit-content",
						border: "2px solid white",
					}}
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
				<ControlledCustomInput
					removeError={removeError}
					label="Departure"
					placeholder="Departure Date"
					value={departureDate}
					setValue={setDepartureDate}
					type="date"
					ref={departureRef}
				></ControlledCustomInput>
				<ControlledCustomInput
					removeError={removeError}
					label="Travellers"
					placeholder="Number of Travellers"
					value={travellers}
					setValue={setTravellers}
					type="number"
					ref={passengerRef}
				></ControlledCustomInput>
				<Button
					sx={{
						color: "#fff",
						py: 1,
						px: 7,
						fontWeight: 700,
						fontSize: "16px",
						borderRadius: "2px",
						backgroundColor: "secondary.hover",
						":hover": { backgroundColor: "secondary.hover" },
					}}
					onClick={validateAndFetch}
				>
					Search
				</Button>
				<Popper
					placement="bottom-start"
					open={anchorEl != null}
					anchorEl={anchorEl}
					sx={{ zIndex: 2000 }}
				>
					<Box sx={{ ...popperSX }}>
						{errorMesaage}{" "}
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
				sx={{
					py: 2,
					px: 2,
					backgroundColor: "#fff",
					boxShadow: "0 0 5px rgba(0,0,0,0.15)",
				}}
				justifyContent={"center"}
			>
				<Stack>
					<Typography>Stops</Typography>
					<FormGroup sx={{ flexDirection: "column" }}>
						<FormControlLabel
							control={
								<Checkbox
									disableRipple
									checked={stops == 2}
									onClick={() => setStops(2)}
								/>
							}
							label="1+ Stops"
						/>
						<FormControlLabel
							control={
								<Checkbox
									disableRipple
									checked={stops == 1}
									onClick={() => setStops(1)}
								/>
							}
							label="1 Stop"
						/>
						<FormControlLabel
							control={
								<Checkbox
									disableRipple
									checked={stops == 0}
									onClick={() => setStops(0)}
								/>
							}
							label="Non Stop"
						/>
					</FormGroup>
				</Stack>
				<Stack>
					<Typography>Departure From {displayFromCity}</Typography>
					{/* <ToggleButtonGroup
						variant="small"
						color="primary"
						sx={{
							mt: 2,
							gap: 1,
							"& button": {
								p: 1,
								border: "1px solid rgba(0,0,0,0.2) !important",
							},
							"& button:hover": {
								color: "#ec5b24",
								bgcolor: "rgba(236, 91, 36, 0.08)",
							},
							"& button.Mui-selected": {
								color: "white",
								bgcolor: "#ec5b24",
							},
							"& button.Mui-selected:hover": {
								color: "white",
								bgcolor: "#ec5b24",
							},
						}}
						value={alignment}
						exclusive
						onChange={handleChange}
					>
						<ToggleButton
							sx={{
								fontSize: "12px",
							}}
							disableRipple
							value="early-morning"
						>
							00:00 - 06:00
						</ToggleButton>
						<ToggleButton
							sx={{ fontSize: "12px" }}
							disableRipple
							value="morning"
						>
							06:00 - 12:00
						</ToggleButton>
						<ToggleButton
							sx={{ fontSize: "12px" }}
							disableRipple
							value="mid-day"
						>
							12:00 - 18:00
						</ToggleButton>
						<ToggleButton
							sx={{ fontSize: "12px" }}
							disableRipple
							value="night"
						>
							18:00 - 24:00
						</ToggleButton>
					</ToggleButtonGroup> */}
					<ToggleButtonGroup
						variant="small"
						color="primary"
						sx={{
							mt: 2,
							gap: 1,
							"& button:hover": {
								color: "#ec5b24",
								bgcolor: "rgba(236, 91, 36, 0.08)",
							},
							"& button.Mui-selected": {
								color: "white",
								bgcolor: "#ec5b24",
							},
							"& button.Mui-selected:hover": {
								color: "white",
								bgcolor: "#ec5b24",
							},
						}}
						value={alignment}
						exclusive
						onChange={handleChange}
					>
						<ToggleButton
							sx={{
								fontSize: "12px",
							}}
							disableRipple
							value="early-morning"
						>
							00:00 - 06:00
							<br />
							Early Morning
						</ToggleButton>
						<ToggleButton
							sx={{ fontSize: "12px" }}
							disableRipple
							value="morning"
						>
							06:00 - 12:00
							<br />
							Morning
						</ToggleButton>
						<ToggleButton
							sx={{ fontSize: "12px" }}
							disableRipple
							value="mid-day"
						>
							12:00 - 18:00
							<br />
							Mid Day
						</ToggleButton>
						<ToggleButton
							sx={{ fontSize: "12px" }}
							disableRipple
							value="night"
						>
							18:00 - 24:00
							<br />
							Night
						</ToggleButton>
					</ToggleButtonGroup>
				</Stack>
				<Stack>
					<Typography>Airlines</Typography>
					<Grid2 container spacing={0} sx={{ width: "250px" }}>
						<Grid2 xs={6}>
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										checked={airlines.AI}
										onClick={() =>
											setAirlines((prev) => {
												return {
													...prev,
													AI: !prev.AI,
												};
											})
										}
									/>
								}
								label={
									<Typography fontSize={"14px"}>
										Air India
									</Typography>
								}
							/>
						</Grid2>
						<Grid2 xs={6}>
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										checked={airlines["6E"]}
										onClick={() =>
											setAirlines((prev) => {
												return {
													...prev,
													"6E": !prev["6E"],
												};
											})
										}
									/>
								}
								label={
									<Typography fontSize={"14px"}>
										IndiGo
									</Typography>
								}
							/>
						</Grid2>
						<Grid2 xs={6}>
							<FormControlLabel
								control={
									<Checkbox
										checked={airlines.UK}
										size="small"
										onClick={() =>
											setAirlines((prev) => {
												return {
													...prev,
													UK: !prev["UK"],
												};
											})
										}
									/>
								}
								label={
									<Typography fontSize={"14px"}>
										Vistara
									</Typography>
								}
							/>
						</Grid2>
						<Grid2 xs={6}>
							<FormControlLabel
								control={
									<Checkbox
										checked={airlines.SG}
										size="small"
										onClick={() =>
											setAirlines((prev) => {
												return {
													...prev,
													SG: !prev["SG"],
												};
											})
										}
									/>
								}
								label={
									<Typography fontSize={"14px"}>
										SpiceJet
									</Typography>
								}
							/>
						</Grid2>
						<Grid2 xs={6}>
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										checked={airlines.G8}
										onClick={() =>
											setAirlines((prev) => {
												return {
													...prev,
													G8: !prev["G8"],
												};
											})
										}
									/>
								}
								label={
									<Typography fontSize={"14px"}>
										Go First
									</Typography>
								}
							/>
						</Grid2>
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
							aria-label="Custom marks"
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
							onChangeCommitted={(e, v) => setPrice(v)}
							valueLabelFormat={priceLabelFormat}
							valueLabelDisplay="auto"
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
						gap={2}
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
								value={sortingMethod}
								label="Sort : "
								onChange={(e) =>
									setSortingMethod(e.target.value)
								}
								sx={{
									fontSize: "12px",
									fontWeight: 600,
									color: "#ec5b24",
								}}
							>
								<MenuItem
									sx={{
										fontSize: "12px",
									}}
									value={"recommended"}
								>
									RECOMMENDED
								</MenuItem>
								<MenuItem
									sx={{
										fontSize: "12px",
									}}
									value={"cheapest"}
								>
									CHEAPTEST
								</MenuItem>
								<MenuItem
									sx={{
										fontSize: "12px",
									}}
									value={"quickest"}
								>
									QUICKEST
								</MenuItem>
								<MenuItem
									sx={{
										fontSize: "12px",
									}}
									value={"earliest"}
								>
									EARLIEST
								</MenuItem>
							</Select>
						</FormControl>
					</Stack>
				</Stack>
			</Stack>
			<Stack gap={2} sx={{ pt: 2 }} className="data-container">
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
						searchParams={searchParams}
					/>
				))}
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
			</Stack>
		</Box>
	);
}
