import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Checkbox,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
	Slider,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import CustomInput from "./CustomInput";
import swapSVG from "../assests/svgs/swap-white.svg";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import AILogo from "../assests/images/airlines/AI.png";
import INLogo from "../assests/images/airlines/6E.png";
import G8Logo from "../assests/images/airlines/G8.png";
import SGLogo from "../assests/images/airlines/SG.png";
import UKLogo from "../assests/images/airlines/UK.png";
const crossProps = {
	crossDefaulFill: "rgba(255, 255, 255, 0.5)",
	crossHoverFill: "white",
};
const timeStamps = [];
for (let i = 0; i < 24; i++) {
	timeStamps.push(("" + i).padStart(2, "0") + ":00");
	timeStamps.push(("" + i).padStart(2, "0") + ":30");
}
timeStamps.push("24:00");
const timeMarks = timeStamps
	.filter((item, index) => index % 6 == 0)
	.map((time, index) => {
		return { label: time, value: index * 6 };
	});
console.log(timeMarks);
function timeLabelFormat(x) {
	return timeStamps[x];
}

export default function Search() {
	const type = useParams().type;
	const [params, setParams] = useSearchParams();
	const location = useLocation();
	console.log(params.get("type"));
	// console.log(location);
	// console.log(search[0].get("from"));
	console.log(type);
	const [value, setValue] = useState("");
	const [stops, setStops] = useState(2);
	const [alignment, setAlignment] = useState("web");
	const [price, setPrice] = useState(50000);
	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};
	const [value2, setValue2] = React.useState([0, 48]);
	const minDistance = 2;
	const handleChange2 = (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) {
			return;
		}

		if (newValue[1] - newValue[0] < minDistance) {
			if (activeThumb === 0) {
				const clamped = Math.min(newValue[0], 48 - minDistance);
				setValue2([clamped, clamped + minDistance]);
			} else {
				const clamped = Math.max(newValue[1], minDistance);
				setValue2([clamped - minDistance, clamped]);
			}
		} else {
			setValue2(newValue);
		}
	};
	const priceLabelFormat = (x) =>
		"₹" +
		(x < 1000
			? x
			: Math.floor(x / 1000) + "," + ("" + (x % 1000)).padStart(3, "0"));
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
					py: 3,
				}}
			>
				<CustomInput
					label="From"
					value={value}
					setValue={setValue}
					{...crossProps}
				></CustomInput>
				<IconButton
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
				<CustomInput
					label="From"
					value={value}
					setValue={setValue}
					{...crossProps}
				></CustomInput>
				<CustomInput
					label="From"
					value={value}
					setValue={setValue}
					{...crossProps}
				></CustomInput>
				<CustomInput
					label="From"
					value={value}
					setValue={setValue}
					{...crossProps}
				></CustomInput>
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
				>
					Search
				</Button>
			</Stack>
			<Stack
				className="filter-options"
				direction="row"
				divider={<Divider orientation="vertical" flexItem />}
				spacing={2}
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
					<Typography>Departure From BOM</Typography>
					<ToggleButtonGroup
						color="primary"
						value={alignment}
						exclusive
						onChange={handleChange}
						aria-label="Platform"
					>
						<ToggleButton value="early-morning">
							00:00 - 06:00
							<br />
							Early Morning
						</ToggleButton>
						<ToggleButton value="morning">
							06:00 - 12:00
							<br />
							Morning
						</ToggleButton>
						<ToggleButton value="mid-day">
							12:00 - 18:00
							<br />
							Mid Day
						</ToggleButton>
						<ToggleButton value="night">
							18:00 - 24:00
							<br />
							Night
						</ToggleButton>
					</ToggleButtonGroup>
					<Slider
						// size="small"
						sx={{
							width: "400px",
							mx: "auto",
							my: 2,
							".MuiSlider-markLabel": {
								fontSize: "12px",
							},
						}}
						value={value2}
						valueLabelFormat={timeLabelFormat}
						onChange={handleChange2}
						valueLabelDisplay="auto"
						max={48}
						marks={timeMarks}
						// getAriaValueText={valuetext}
						disableSwap
					/>
				</Stack>
				<Stack>
					<Typography>Airlines</Typography>
					{/* <FormGroup sx={{ flexDirection: "row", flexWrap: "wrap" }}> */}
					<Grid2 container spacing={0} sx={{ width: "300px" }}>
						<Grid2 xs={6}>
							<FormControlLabel
								control={<Checkbox />}
								label={
									<Box>
										<Typography>Air India</Typography>
									</Box>
								}
							/>
						</Grid2>
						<Grid2 xs={6}>
							<FormControlLabel
								control={<Checkbox />}
								label={
									<Box>
										<Typography>IndiGo</Typography>
									</Box>
								}
							/>
						</Grid2>
						<Grid2 xs={6}>
							<FormControlLabel
								control={<Checkbox />}
								label={
									<Box>
										<Typography>Vistara</Typography>
									</Box>
								}
							/>
						</Grid2>
						<Grid2 xs={6}>
							<FormControlLabel
								control={<Checkbox />}
								label={
									<Box>
										<Typography>SpiceJet</Typography>
									</Box>
								}
							/>
						</Grid2>
						<Grid2 xs={6}>
							<FormControlLabel
								control={<Checkbox />}
								label={
									<Box>
										<Typography>Go First</Typography>
									</Box>
								}
							/>
						</Grid2>
					</Grid2>
					{/* </FormGroup> */}
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
							// size="small"
							aria-label="Custom marks"
							sx={{
								".MuiSlider-markLabel": {
									fontSize: "16px",
								},
								// width: "200px",
							}}
							defaultValue={20}
							max={50000}
							step={500}
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							valueLabelFormat={priceLabelFormat}
							valueLabelDisplay="off"
							marks={[
								{ label: "₹0", value: 0 },
								{ label: "₹50,000", value: 50000 },
							]}
							// marks={marks}
						/>
					</Box>

					<Stack
						alignItems={"center"}
						justifyContent="center"
						flexDirection={"row"}
					>
						<Button
							disableRipple
							variant="contained"
							sx={{ px: 4, fontWeight: 700 }}
						>
							Apply
						</Button>
						<Button>Reset Filters</Button>
						<Typography>1 Selected</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Stack>
				{/* <Stack
                        direction="row"
                        divider={
                            <Divider orientation="vertical" flexItem />
                        }
                        spacing={2}
                    >
                        <Stack></Stack>
                        <Stack></Stack>
                    </Stack> */}
				{fligts.map(
					({
						_id,
						flightID,
						source,
						destination,
						departureTime,
						arrivalTime,
						duration,
						stops,
						ticketPrice,
					}) => {
						let airlineImg, airlineName, flightName;
						const calulatedDuration =
							("" + duration).padStart(2, "0") + "hr 00min";
						switch (flightID.slice(0, 2).toUpperCase()) {
							case "6E":
								airlineImg = INLogo;
								airlineName = "INDIGO";
								flightName = "6E" + flightID.split("-")[2];
								break;
							case "AI":
								airlineImg = AILogo;
								airlineName = "AIR INDIA";
								flightName = "AI" + flightID.split("-")[2];
								break;
							case "G8":
								airlineImg = G8Logo;
								airlineName = "GO FAST";
								flightName = "GO" + flightID.split("-")[2];
								break;
							case "SG":
								airlineImg = SGLogo;
								airlineName = "SPICE JET";
								flightName = "SG" + flightID.split("-")[2];
								break;
							case "UK":
								airlineImg = UKLogo;
								airlineName = "VISTARA";
								flightName = "UK" + flightID.split("-")[2];
								break;
						}
						return (
							<Stack
								key={_id}
								sx={{
									mt: 2,
									mx: "auto",
									px: 4,
									py: 2,
									minWidth: "500px",
									width: "fit-content",
									flexDirection: "row",
									bgcolor: "#fff",
									boxShadow: "0 0 5px rgba(0,0,0,0.15)",
								}}
								divider={
									<Divider orientation="vertical" flexItem />
								}
								gap={4}
							>
								<Stack
									justifyContent={"center"}
									alignItems={"center"}
								>
									<img
										src={airlineImg}
										style={{
											width: "50px",
											height:
												airlineName == "AIR INDIA"
													? "50px"
													: "40px",
											marginBottom: "10px",
										}}
									/>
									<Typography
										fontSize={"12px"}
										color="rgba(0,0,0,0.4)"
									>
										{airlineName}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgba(0,0,0,0.4)"
									>
										{flightName}
									</Typography>
								</Stack>
								<Stack
									divider={
										<Divider
											component={Box}
											width="250px"
											textAlign="center"
											variant="middle"
											sx={{
												"::before": {
													borderTop:
														"3px solid rgb(0,0,0,0.5)",
												},
												"::after": {
													borderTop:
														"3px solid rgb(0,0,0,0.5)",
												},
											}}
										>
											<Typography color="rgb(0,0,0,0.5)">
												{calulatedDuration}
											</Typography>
										</Divider>
									}
									flexDirection={"row"}
									alignItems={"center"}
									justifyContent={"center"}
								>
									<Stack textAlign={"right"}>
										<Typography color="rgba(0,0,0,0.7)">
											{source}
										</Typography>
										<Typography
											fontWeight={600}
											variant="h5"
										>
											{departureTime}
										</Typography>
										<Typography
											fontSize={"12px"}
											color="rgb(0,0,0,0.5)"
										>
											{new Date()
												.toUTCString()
												.slice(0, 11)}
										</Typography>
										<Typography
											fontSize={"12px"}
											color="rgb(0,0,0,0.5)"
										>
											{
												IATA_CODE_TO_CITY_AND_AIRPORT[
													source
												].city
											}
										</Typography>
									</Stack>
									{/* <Divider> </Divider> */}
									<Stack textAlign={"left"}>
										<Typography
											fontSize={"12px"}
											color="rgba(0,0,0,0.7)"
										>
											{destination}
										</Typography>
										<Typography
											fontWeight={600}
											variant="h5"
										>
											{arrivalTime}
										</Typography>
										<Typography
											fontSize={"12px"}
											color="rgb(0,0,0,0.5)"
										>
											{new Date()
												.toUTCString()
												.slice(0, 11)}
										</Typography>
										<Typography
											fontSize={"12px"}
											color="rgb(0,0,0,0.5)"
										>
											{
												IATA_CODE_TO_CITY_AND_AIRPORT[
													destination
												].city
											}
										</Typography>
									</Stack>
								</Stack>
								<Stack
									direction={"row"}
									alignItems={"center"}
									gap={3}
								>
									<Typography
										fontWeight={600}
										variant="h5"
										color={"#ec5b24"}
									>
										<span style={{ fontWeight: 400 }}>
											₹
										</span>
										{ticketPrice}
									</Typography>
									<Button
										sx={{ px: 6, fontWeight: 700 }}
										variant="contained"
									>
										BOOK
									</Button>
								</Stack>
							</Stack>
						);
					}
				)}
			</Stack>
		</Box>
	);
}
const fligts = [
	{
		_id: "651d4ffa8c0d859355224b89",
		flightID: "6E001-DELBOM-326",
		airline: "65144a1b664a43628887c45e",
		aircraftModel: "65144571e16702a399cea7f9",
		source: "DEL",
		destination: "BOM",
		departureTime: "12:10",
		arrivalTime: "14:10",
		duration: 2,
		stops: 2,
		ticketPrice: 2160,
		availableSeats: 117,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d50148c0d859355225255",
		flightID: "6E001-DELBOM-101",
		airline: "65144a1b664a43628887c45e",
		aircraftModel: "65144571e16702a399cea7f7",
		source: "DEL",
		destination: "BOM",
		departureTime: "23:00",
		arrivalTime: "05:00",
		duration: 6,
		stops: 1,
		ticketPrice: 2046,
		availableSeats: 91,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d50488c0d859355225fed",
		flightID: "6E001-DELBOM-728",
		airline: "65144a1b664a43628887c45e",
		aircraftModel: "65144571e16702a399cea7fa",
		source: "DEL",
		destination: "BOM",
		departureTime: "05:30",
		arrivalTime: "09:30",
		duration: 4,
		stops: 1,
		ticketPrice: 2458,
		availableSeats: 91,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d50618c0d8593552266b9",
		flightID: "6E001-DELBOM-661",
		airline: "65144a1b664a43628887c45e",
		aircraftModel: "65144571e16702a399cea7fc",
		source: "DEL",
		destination: "BOM",
		departureTime: "13:10",
		arrivalTime: "15:10",
		duration: 2,
		stops: 2,
		ticketPrice: 2037,
		availableSeats: 174,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d50948c0d859355227451",
		flightID: "UK001-DELBOM-540",
		airline: "65144a1b664a43628887c460",
		aircraftModel: "65144571e16702a399cea7f9",
		source: "DEL",
		destination: "BOM",
		departureTime: "02:50",
		arrivalTime: "07:50",
		duration: 5,
		stops: 0,
		ticketPrice: 2270,
		availableSeats: 116,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d50ae8c0d859355227b1d",
		flightID: "UK001-DELBOM-996",
		airline: "65144a1b664a43628887c460",
		aircraftModel: "65144571e16702a399cea7f7",
		source: "DEL",
		destination: "BOM",
		departureTime: "01:25",
		arrivalTime: "03:25",
		duration: 2,
		stops: 0,
		ticketPrice: 2039,
		availableSeats: 112,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d50c88c0d8593552281e9",
		flightID: "UK001-DELBOM-873",
		airline: "65144a1b664a43628887c460",
		aircraftModel: "65144571e16702a399cea7fb",
		source: "DEL",
		destination: "BOM",
		departureTime: "22:30",
		arrivalTime: "23:30",
		duration: 1,
		stops: 0,
		ticketPrice: 2270,
		availableSeats: 190,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d50fb8c0d859355228f81",
		flightID: "UK001-DELBOM-407",
		airline: "65144a1b664a43628887c460",
		aircraftModel: "65144571e16702a399cea7fc",
		source: "DEL",
		destination: "BOM",
		departureTime: "12:25",
		arrivalTime: "14:25",
		duration: 2,
		stops: 1,
		ticketPrice: 2327,
		availableSeats: 60,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d51528c0d85935522a3e5",
		flightID: "AI001-DELBOM-371",
		airline: "65144a1b664a43628887c45d",
		aircraftModel: "65144571e16702a399cea7f7",
		source: "DEL",
		destination: "BOM",
		departureTime: "07:00",
		arrivalTime: "13:00",
		duration: 6,
		stops: 1,
		ticketPrice: 2384,
		availableSeats: 167,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d51868c0d85935522b17d",
		flightID: "AI001-DELBOM-789",
		airline: "65144a1b664a43628887c45d",
		aircraftModel: "65144571e16702a399cea7fa",
		source: "DEL",
		destination: "BOM",
		departureTime: "03:55",
		arrivalTime: "04:55",
		duration: 1,
		stops: 1,
		ticketPrice: 2146,
		availableSeats: 70,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d51a08c0d85935522b849",
		flightID: "AI001-DELBOM-983",
		airline: "65144a1b664a43628887c45d",
		aircraftModel: "65144571e16702a399cea7fc",
		source: "DEL",
		destination: "BOM",
		departureTime: "06:05",
		arrivalTime: "09:05",
		duration: 3,
		stops: 1,
		ticketPrice: 2128,
		availableSeats: 173,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d51f28c0d85935522ccad",
		flightID: "SG001-DELBOM-578",
		airline: "65144a1b664a43628887c45f",
		aircraftModel: "65144571e16702a399cea7f7",
		source: "DEL",
		destination: "BOM",
		departureTime: "14:20",
		arrivalTime: "19:20",
		duration: 5,
		stops: 2,
		ticketPrice: 2047,
		availableSeats: 60,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d52268c0d85935522da45",
		flightID: "SG001-DELBOM-024",
		airline: "65144a1b664a43628887c45f",
		aircraftModel: "65144571e16702a399cea7fa",
		source: "DEL",
		destination: "BOM",
		departureTime: "21:10",
		arrivalTime: "00:10",
		duration: 3,
		stops: 1,
		ticketPrice: 2291,
		availableSeats: 84,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d52408c0d85935522e111",
		flightID: "SG001-DELBOM-179",
		airline: "65144a1b664a43628887c45f",
		aircraftModel: "65144571e16702a399cea7fc",
		source: "DEL",
		destination: "BOM",
		departureTime: "02:20",
		arrivalTime: "07:20",
		duration: 5,
		stops: 2,
		ticketPrice: 2378,
		availableSeats: 163,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d52768c0d85935522eea9",
		flightID: "G801-DELBOM-180",
		airline: "65144a1b664a43628887c461",
		aircraftModel: "65144571e16702a399cea7f9",
		source: "DEL",
		destination: "BOM",
		departureTime: "05:10",
		arrivalTime: "07:10",
		duration: 2,
		stops: 1,
		ticketPrice: 2374,
		availableSeats: 101,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d52a98c0d85935522fc41",
		flightID: "G801-DELBOM-915",
		airline: "65144a1b664a43628887c461",
		aircraftModel: "65144571e16702a399cea7fb",
		source: "DEL",
		destination: "BOM",
		departureTime: "11:30",
		arrivalTime: "12:30",
		duration: 1,
		stops: 0,
		ticketPrice: 2440,
		availableSeats: 122,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d52c38c0d85935523030d",
		flightID: "G801-DELBOM-978",
		airline: "65144a1b664a43628887c461",
		aircraftModel: "65144571e16702a399cea7fa",
		source: "DEL",
		destination: "BOM",
		departureTime: "21:35",
		arrivalTime: "00:35",
		duration: 3,
		stops: 2,
		ticketPrice: 2497,
		availableSeats: 73,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
	{
		_id: "651d52e18c0d8593552309d9",
		flightID: "G801-DELBOM-334",
		airline: "65144a1b664a43628887c461",
		aircraftModel: "65144571e16702a399cea7fc",
		source: "DEL",
		destination: "BOM",
		departureTime: "17:00",
		arrivalTime: "20:00",
		duration: 3,
		stops: 0,
		ticketPrice: 2445,
		availableSeats: 132,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
	},
];
const IATA_CODE_TO_CITY_AND_AIRPORT = {
	HYD: { name: "Rajiv Gandhi International Airport", city: "Hyderabad" },
	AMD: {
		name: "Sardar Vallabhbhai Patel International Airport",
		city: "Ahmedabad",
	},
	GOI: { name: "Goa International Airport", city: "Goa" },
	PNQ: { name: "Pune Airport", city: "Pune" },
	GAU: {
		name: "Lokpriya Gopinath Bordoloi International Airport",
		city: "Guwahati",
	},
	JAI: { name: "Jaipur International Airport", city: "Jaipur" },
	NAG: {
		name: "Dr. Babasaheb Ambedkar International Airport",
		city: "Nagpur",
	},
	DEL: { name: "Indira Gandhi International Airport", city: "Delhi" },
	BOM: {
		name: "Chhatrapati Shivaji Maharaj International Airport",
		city: "Mumbai",
	},
	BLR: { name: "Kempegowda International Airport", city: "Bengaluru" },
	CCU: {
		name: "Netaji Subhas Chandra Bose International Airport",
		city: "Kolkata",
	},
	MAA: { name: "Chennai International Airport", city: "Chennai" },
	COK: { name: "Cochin International Airport", city: "Kochi" },
	IXC: { name: "Chandigarh International Airport", city: "Chandigarh" },
	BBI: { name: "Biju Patnaik International Airport", city: "Bhubaneswar" },
	CJB: { name: "Coimbatore International Airport", city: "Coimbatore" },
	LKO: { name: "Lucknow International Airport", city: "Lucknow" },
	TRV: {
		name: "Trivandrum International Airport",
		city: "Thiruvananthapuram",
	},
	IXE: { name: "Mangalore International Airport", city: "Mangalore" },
	ATQ: { name: "Amritsar International Airport", city: "Amritsar" },
	DED: { name: "Dehradun Airport", city: "Dehradun" },
	BDQ: { name: "Vadodara Airport", city: "Vadodara" },
	IXM: { name: "Madurai Airport", city: "Madurai" },
	PAT: { name: "Lok Nayak Jayaprakash Airport", city: "Patna" },
	IXL: { name: "Kushok Bakula Rimpochee Airport", city: "Leh" },
	IXA: { name: "Agartala Airport", city: "Agartala" },
	GAY: { name: "Gaya Airport", city: "Gaya" },
	STV: { name: "Surat Airport", city: "Surat" },
	RPR: { name: "Raipur Airport", city: "Raipur" },
	IXJ: { name: "Jammu Airport", city: "Jammu" },
};
