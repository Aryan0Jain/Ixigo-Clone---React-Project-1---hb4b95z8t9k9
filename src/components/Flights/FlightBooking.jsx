import {
	Autocomplete,
	Box,
	Button,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Popper,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import AILogo from "../../assests/images/airlines/AI.png";
import INLogo from "../../assests/images/airlines/6E.png";
import G8Logo from "../../assests/images/airlines/G8.png";
import SGLogo from "../../assests/images/airlines/SG.png";
import UKLogo from "../../assests/images/airlines/UK.png";
import FlightDetailsTab from "./FlightDetailsTab";
import { MdExpandMore } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";
import { useSearchContext } from "../Contexts/SearchProdiver";
const progressStages = [
	{ name: "Review", id: "review" },
	{ name: "Traveller Details", id: "traveller-details" },
	{ name: "Payment", id: "payment" },
];
function isValidEmail(email) {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return pattern.test(email);
}
export default function FlightBooking() {
	const [showDetails, setShowDetails] = useState(false);
	const contactEmailRef = useRef();
	const [hasError, setHasError] = useState(false);
	const [title, setTile] = useState("");
	const [searchParams] = useSearchParams();
	const params = useParams();
	const flight_id = params.details;
	const departureDate = searchParams.get("date");
	const travellers = searchParams.get("travellers");
	const [flightData, setFlightData] = useState({});
	const progressIndex = progressStages.findIndex(
		({ id }) => id == params.progress
	);
	console.log(searchParams.get("date"));
	const user = JSON.parse(localStorage.getItem("userDetails")) || {};
	const { airports } = useSearchContext();
	const {
		source,
		destination,
		departureTime,
		arrivalTime,
		duration,
		flightID,
		ticketPrice,
		stops,
	} = tempData;
	const sourceIndex = airports.findIndex((item) => item.iata_code == source);
	const destinationIndex = airports.findIndex(
		(item) => item.iata_code == destination
	);
	useEffect(() => {
		async function getFlightDetails() {
			const data = await (
				await fetch(
					`https://academics.newtonschool.co/api/v1/bookingportals/flight/${flight_id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							projectID: projectID,
						},
					}
				)
			).json();
		}
	}, []);
	function handleContinue() {
		if (!isValidEmail(contactEmailRef.current.value)) {
			setHasError(true);
			contactEmailRef.current.focus();
			return;
		}
	}
	let airlineImg, airlineName, flightName;
	const calulatedDuration = ("" + duration).padStart(2, "0") + "hr 00min";
	const depDate = new Date(searchParams.get("date"));
	depDate.setHours(
		+departureTime.slice(0, 2) + 5 + (+departureTime.slice(3, 5) + 30) / 60,
		(+departureTime.slice(3, 5) + 30) % 60
	);
	const arrDate = new Date(depDate.getTime() + duration * 60 * 60 * 1000);
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
			airlineName = "GO FIRST";
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
		<Box sx={{ mt: 8.2, width: "100%" }}>
			<Box
				sx={{
					background: "linear-gradient(45deg,#721053,#AD2E41)",
					width: "100%",
					pt: 2,
					pb: 4,
				}}
			>
				<Stack
					direction={"row"}
					gap={0}
					sx={{ width: "fit-content", mx: "auto" }}
					alignItems={"center"}
					divider={
						<Divider
							orientation="horizontal"
							sx={{
								border: "2px solid rgba(255,255,255,0.7)",
								width: 250,
							}}
						/>
					}
				>
					{progressStages.map(({ name, id }, index) => {
						return (
							<Stack key={index} position={"relative"}>
								<Stack
									alignItems={"center"}
									justifyContent={"center"}
									sx={{
										width: 24,
										height: 24,
										border: "2px solid #fff",
										borderRadius: "50%",
										backgroundColor:
											progressIndex >= index
												? "#fff"
												: "none",
									}}
								>
									{progressIndex > index && (
										<FaCheck color="#550F5D" />
									)}
								</Stack>
								<Typography
									color={"#fff"}
									fontSize={12}
									position={"absolute"}
									top={"120%"}
									right={-40}
									width={100}
									textAlign={"center"}
									whiteSpace={"nowrap"}
								>
									{name}
								</Typography>
							</Stack>
						);
					})}
				</Stack>
			</Box>
			<Stack direction={"row"} gap={5} sx={{ m: 4, ml: 15 }}>
				{progressIndex == 0 && (
					<Stack
						sx={{ width: "fit-content" }}
						gap={3}
						className="flight-booking-page"
					>
						<Box
							sx={{
								bgcolor: "#E1E1E1",
								// width: "fit-content",
								boxShadow: "0 0 10px rgba(0,0,0,.3)",
							}}
						>
							<Typography
								sx={{ ml: 3, my: 2 }}
								color="rgba(0,0,0,.64)"
								fontWeight={600}
								fontSize={14}
							>
								Mumbai to New Delhi
							</Typography>
							<FlightDetailsTab
								{...{
									flightID,
									source,
									destination,
									departureTime,
									arrivalTime,
									duration,
									ticketPrice,
									searchParams,
								}}
							/>
							<Stack direction={"row"} gap={10} sx={{ p: 3 }}>
								<Stack>
									<Typography
										color="rgba(0,0,0,0.54)"
										fontWeight={700}
										fontSize={12}
									>
										BAGGAGE
									</Typography>
									<Typography
										color={"rgba(0,0,0,.87)"}
										fontSize={18}
										fontWeight={600}
									>
										{source}-{destination}
									</Typography>
								</Stack>
								<Stack>
									<Typography
										color="rgba(0,0,0,.54)"
										fontSize={14}
										fontWeight={600}
									>
										CHECK-IN
									</Typography>
									<Typography
										color={"rgba(0,0,0,.54)"}
										fontSize={14}
										fontWeight={600}
									>
										{ticketPrice <= 2250
											? "15 kilograms (1 piece per pax)"
											: "20 kilograms (1 piece per pax)"}
									</Typography>
								</Stack>
								<Stack>
									<Typography
										color="rgba(0,0,0,.54)"
										fontSize={14}
										fontWeight={600}
									>
										CABIN
									</Typography>
									<Typography
										color={"rgba(0,0,0,.54)"}
										fontSize={14}
										fontWeight={600}
									>
										{ticketPrice <= 2250
											? "7 kg (1 piece per pax)"
											: "10 kg (1 piece per pax)"}
									</Typography>
								</Stack>
							</Stack>
						</Box>
						<Box
							sx={{
								bgcolor: "#E1E1E1",
								width: "100%",
								boxShadow: "0 0 10px rgba(0,0,0,.3)",
							}}
						>
							<Typography
								sx={{ ml: 3, my: 2 }}
								color={"rgba(0,0,0,.38)"}
								fontSize={14}
								fontWeight={400}
							>
								<span
									style={{
										color: "rgba(0,0,0,.64)",
										fontWeight: 600,
									}}
								>
									Contact Details
								</span>{" "}
								(Your ticket and flight info will be sent here)
							</Typography>
							<Stack
								sx={{ pl: 3, py: 2, bgcolor: "#fff" }}
								direction={"row"}
							>
								<TextField
									label="Email Address"
									variant="standard"
									defaultValue={user.email}
									InputLabelProps={{ shrink: true }}
									inputRef={contactEmailRef}
									onChange={() => setHasError(false)}
								/>
								{hasError && (
									<Box
										sx={{
											border: 0,
											py: 0.5,
											px: 1,
											fontSize: "14px",
											bgcolor: "rgba(255,0,0,0.1)",
											color: "#D50000",
											fontWeight: 500,
											display: "flex",
											alignItems: "center",
											mt: "0px",
											borderRadius: "5px",
										}}
									>
										<BiSolidError
											size="17px"
											style={{ marginRight: "5px" }}
										/>{" "}
										Please Enter a valid email!
									</Box>
								)}
							</Stack>
						</Box>
						<Box
							sx={{
								bgcolor: "#E1E1E1",
								width: "100%",
								boxShadow: "0 0 10px rgba(0,0,0,.3)",
							}}
						>
							<Typography
								sx={{ ml: 3, my: 2 }}
								color="rgba(0,0,0,.64)"
								fontWeight={600}
								fontSize={14}
							>
								Billing Address
							</Typography>
							<Stack
								sx={{ pl: 3, py: 2, bgcolor: "#fff" }}
								direction={"row"}
								gap={3}
							>
								<TextField
									label="Pincode"
									required
									variant="standard"
									defaultValue={400000}
									InputLabelProps={{ shrink: true }}
									inputRef={contactEmailRef}
									InputProps={{ type: "number" }}
									onChange={() => setHasError(false)}
								/>
								<TextField
									sx={{ width: 500 }}
									label="Address"
									variant="standard"
									placeholder="Enter Billing Address"
									InputLabelProps={{ shrink: true }}
									inputRef={contactEmailRef}
									onChange={() => setHasError(false)}
								/>
								{hasError && (
									<Box
										sx={{
											border: 0,
											py: 0.5,
											px: 1,
											fontSize: "14px",
											bgcolor: "rgba(255,0,0,0.1)",
											color: "#D50000",
											fontWeight: 500,
											display: "flex",
											alignItems: "center",
											mt: "0px",
											borderRadius: "5px",
										}}
									>
										<BiSolidError
											size="17px"
											style={{ marginRight: "5px" }}
										/>{" "}
										Please Enter a valid email!
									</Box>
								)}
							</Stack>
						</Box>
					</Stack>
				)}
				{progressIndex == 1 && (
					<Stack sx={{ width: 940 }} gap={5}>
						<Stack
							sx={{
								mx: "auto",
								pl: 2,
								p: 2,
								width: "100%",
								flexDirection: "row",
								bgcolor: "#fff",
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
									<Stack alignItems={"center"} gap={1}>
										<Typography
											color="rgb(0,0,0,0.5)"
											fontSize={"12px"}
										>
											{calulatedDuration}
										</Typography>
										<Stack
											justifyContent={"space-between"}
											alignItems={"center"}
											direction={"row"}
											sx={{
												height: "2px",
												bgcolor: "rgb(187, 187, 187) ",
												width: "250px",
												mx: 3,
											}}
										>
											<div
												style={{
													width: "6px",
													height: "6px",
													borderRadius: "6px",
													backgroundColor:
														"rgb(117, 117, 117)",
													mt: "-2px",
												}}
											></div>
											<div
												style={{
													width: "6px",
													height: "6px",
													borderRadius: "6px",
													backgroundColor:
														"rgb(117, 117, 117)",
													mt: "-2px",
												}}
											></div>
										</Stack>
										<Typography
											color="rgb(0,0,0,0.5)"
											fontSize={"12px"}
										>
											Stops: {stops}
										</Typography>
									</Stack>
								}
								flexDirection={"row"}
								alignItems={"center"}
								justifyContent={"center"}
							>
								<Stack textAlign={"right"}>
									<Typography
										fontSize={"14px"}
										color="rgba(0,0,0,0.7)"
									>
										{source}
									</Typography>
									<Typography
										fontWeight={600}
										variant="h5"
										fontSize={"22px"}
									>
										{departureTime}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgb(0,0,0,0.5)"
									>
										{depDate.toUTCString().slice(0, 11)}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgb(0,0,0,0.5)"
									>
										{airports[sourceIndex].city}
									</Typography>
								</Stack>
								{/* <Divider> </Divider> */}
								<Stack textAlign={"left"}>
									<Typography
										fontSize={"14px"}
										color="rgba(0,0,0,0.7)"
									>
										{destination}
									</Typography>
									<Typography
										fontWeight={600}
										variant="h5"
										fontSize={"22px"}
									>
										{arrivalTime}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgb(0,0,0,0.5)"
									>
										{arrDate.toUTCString().slice(0, 11)}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgb(0,0,0,0.5)"
									>
										{airports[destinationIndex].city}
									</Typography>
								</Stack>
							</Stack>
							<Stack
								width="100%"
								direction={"row"}
								alignItems={"center"}
								justifyContent={"space-between"}
							>
								<Typography
									color="rgba(0,0,0,.64)"
									fontSize={12}
								>
									aryanajjain@gmail.com
								</Typography>
								<Button disableRipple sx={{ fontSize: 16 }}>
									Modify
								</Button>
							</Stack>
						</Stack>
						<Box
							sx={{
								bgcolor: "#E1E1E1",
								width: "100%",
								boxShadow: "0 0 10px rgba(0,0,0,.3)",
							}}
						>
							<Typography
								sx={{ ml: 3, my: 2 }}
								color="rgba(0,0,0,.64)"
								fontWeight={600}
								fontSize={14}
							>
								Enter traveller details
							</Typography>
							<Stack sx={{ bgcolor: "#fff", p: 3 }} gap={2}>
								{Array.from({ length: 2 }).map((_, i) => {
									return (
										<Box key={i}>
											<Typography>
												Passenger {i + 1}
											</Typography>
											<Stack
												direction={"row"}
												gap={2}
												flexWrap={"wrap"}
											>
												<FormControl>
													<Select
														variant="standard"
														placeholder="Title"
														value={title}
														onChange={(e) =>
															setTile(
																e.target.value
															)
														}
														sx={{ width: 100 }}
													>
														<MenuItem value={"mr"}>
															Mr
														</MenuItem>
														<MenuItem value={"ms"}>
															Ms
														</MenuItem>
														<MenuItem value={"mrs"}>
															Mrs
														</MenuItem>
													</Select>
												</FormControl>
												<TextField
													variant="standard"
													label="First Name"
													placeholder="First Name & Middle Name(if any)"
													InputLabelProps={{
														shrink: true,
													}}
												/>
												<TextField
													variant="standard"
													label="Last Name"
													placeholder="Last Name"
													InputLabelProps={{
														shrink: true,
													}}
												/>
												<Autocomplete
													options={countries}
													getOptionLabel={(option) =>
														option
													}
													renderInput={(params) => (
														<TextField
															{...params}
															sx={{
																width: 400,
															}}
															variant="standard"
															label="Nationality"
															InputLabelProps={{
																shrink: true,
															}}
															placeholder="Select Country"
														/>
													)}
												/>
											</Stack>
										</Box>
									);
								})}
							</Stack>
						</Box>
					</Stack>
				)}
				<Stack gap={10}>
					<Box
						sx={{
							bgcolor: "#E1E1E1",
							boxShadow: "0 0 10px rgba(0,0,0,.3)",
							width: "270px",
						}}
					>
						{" "}
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
							sx={{ p: 2, cursor: "pointer" }}
							onClick={() => setShowDetails((prev) => !prev)}
						>
							<Typography
								color="rgba(0,0,0,.64)"
								fontSize={16}
								fontWeight={600}
							>
								Fare Summary{" "}
								<span
									style={{
										color: "rgba(0,0,0,.38)",
										fontWeight: 400,
									}}
								>
									(1 traveller)
								</span>
							</Typography>
							<MdExpandMore
								size={20}
								style={{
									transform: `rotate(${
										showDetails ? 180 : 0
									}deg)`,
									transition: "transform 200ms",
								}}
							/>
						</Stack>
						<Stack sx={{ bgcolor: "#fff", p: 2 }} gap={2}>
							{showDetails && (
								<>
									<Stack
										direction={"row"}
										justifyContent={"space-between"}
									>
										<Typography
											color={"rgba(0,0,0,.64)"}
											fontSize={14}
										>
											Base Fare
										</Typography>
										<Typography
											color={"rgba(0,0,0,.87)"}
											fontSize={14}
											fontWeight={600}
										>
											₹{ticketPrice}
										</Typography>
									</Stack>
									<Stack
										direction={"row"}
										justifyContent={"space-between"}
									>
										<Stack>
											<Typography
												color={"rgba(0,0,0,.64)"}
												fontSize={14}
											>
												Taxes & Fees
											</Typography>
											<Typography
												color={"rgba(0,0,0,.64)"}
												fontSize={10}
											>
												(18% GST + Conv. fee ₹309/- per
												traveller)
											</Typography>
										</Stack>
										<Typography
											color={"rgba(0,0,0,.87)"}
											fontSize={14}
											fontWeight={600}
										>
											₹{ticketPrice * 0.18 + 2 * 309}
										</Typography>
									</Stack>
								</>
							)}
							<Stack
								direction={"row"}
								justifyContent={"space-between"}
							>
								<Typography
									color={"rgba(0,0,0,.87)"}
									fontSize={16}
									fontWeight={600}
								>
									Total Fare
								</Typography>
								<Typography
									color={"#EC5B24"}
									fontSize={20}
									fontWeight={600}
								>
									₹{ticketPrice * 1.18 + 2 * 309}
								</Typography>
							</Stack>
						</Stack>
					</Box>
					<Button
						onClick={handleContinue}
						disableRipple
						variant="contained"
					>
						Continue
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
}
const tempData = {
	_id: "651d50098c0d859355224f59",
	flightID: "6E001-HYDAMD-235",
	airline: "65144a1b664a43628887c45e",
	aircraftModel: "65144571e16702a399cea7f7",
	source: "HYD",
	destination: "AMD",
	departureTime: "04:50",
	arrivalTime: "05:50",
	duration: 1,
	stops: 2,
	ticketPrice: 2080,
	availableSeats: 85,
	amenities: ["In-flight entertainment", "Complimentary beverage"],
	__v: 1,
};

const countries = [
	"India",
	"United States",
	"China",
	"United Kingdom",
	"Afghanistan",
	"Aland Islands",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua And Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia",
	"Bosnia And Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory",
	"British Virgin Islands",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cape Verde",
	"Cayman Islands",
	"Central African Republic",
	"Chad",
	"Chile",
	"Christmas Island",
	"Cocos Islands",
	"Colombia",
	"Comoros",
	"Congo Brazzaville",
	"Congo Kinshasa",
	"Cook Islands",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"East Timor",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Ethiopia",
	"Falkland Islands",
	"Faroe Islands",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea Bissau",
	"Guyana",
	"Haiti",
	"Heard Island And Mcdonald Islands",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Isle Of Man",
	"Israel",
	"Italy",
	"Ivory Coast",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Kosovo",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Macedonia",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"Netherlands Antilles",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"North Korea",
	"Northern Mariana Islands",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestinian Territory",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Reunion",
	"Romania",
	"Russia",
	"Rwanda",
	"Saint Barthélemy",
	"Saint Helena",
	"Saint Kitts And Nevis",
	"Saint Lucia",
	"Saint Martin",
	"Saint Pierre And Miquelon",
	"Saint Vincent And The Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome And Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Serbia And Montenegro",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia And The South Sandwich Islands",
	"South Korea",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Svalbard And Jan Mayen",
	"Swaziland",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad And Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks And Caicos Islands",
	"Tuvalu",
	"U.s. Virgin Islands",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United States Minor Outlying Islands",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican",
	"Venezuela",
	"Vietnam",
	"Wallis And Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
];
