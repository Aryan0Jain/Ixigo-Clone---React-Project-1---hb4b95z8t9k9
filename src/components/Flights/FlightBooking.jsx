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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
function isValidPincode(code) {
	return code.length == 6 && code[0] != "0";
}
export default function FlightBooking() {
	const [showDetails, setShowDetails] = useState(false);
	const contactEmailRef = useRef();
	const pincodeRef = useRef();
	const billingAddressRef = useRef();
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	const [title, setTile] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const params = useParams();
	const flight_id = params.details;
	const departureDate = searchParams.get("date");
	const travellers = searchParams.get("travellers");
	const [passengerDetails, setPassengerDetails] = useState(
		Array.from({ length: travellers }).map((_, i) => {
			return { id: i + 1, firstName: "", lastName: "", nationality: "" };
		})
	);
	const passgengerIDs = Array.from({ length: travellers }).map((_, i) => {
		return {
			id: i + 1,
			firstNameID: `firstname-${i + 1}`,
			lastNameID: `lastname-${i + 1}`,
			nationalityID: `nationality-${i + 1}`,
		};
	});
	const { airports, getFlightDetails, countries, tempData } =
		useSearchContext();
	const [flightData, setFlightData] = useState(tempData);
	const progressIndex = progressStages.findIndex(
		({ id }) => id == params.progress
	);
	const user = JSON.parse(localStorage.getItem("userDetails")) || {};

	useEffect(() => {
		async function getData() {
			const data = await getFlightDetails(flight_id);
			setFlightData(data.data);
			setIsLoading(false);
		}
		getData();
	}, []);
	function handleContinue() {
		if (progressIndex == 0) {
			if (!isValidEmail(contactEmailRef.current.value)) {
				setAnchorEl(contactEmailRef.current);
				setErrorMessage("Please enter a valid email!");
				contactEmailRef.current.focus();
				return;
			}
			if (!isValidPincode(pincodeRef.current.value)) {
				setAnchorEl(pincodeRef.current);
				setErrorMessage("Please enter a valid pincode!");
				pincodeRef.current.focus();
				return;
			}
			const progress = progressStages[progressIndex + 1].id;
			const emailID = contactEmailRef.current.value;
			const pinCode = pincodeRef.current.value;
			let url = `/flights/booking/${progress}/${flight_id}?date=${departureDate}&travellers=${travellers}&email=${emailID}&pincode=${pinCode}`;
			navigate(url);
		}
		if (progressIndex == 1) {
			for (let i = 0; i < travellers; i++) {
				const { firstName, lastName, nationality } =
					passengerDetails[i];
				if (firstName.length < 4) {
					const element = document.getElementById(
						passgengerIDs[i].firstNameID
					);
					setAnchorEl(element);
					element.focus();
					setErrorMessage("Please enter a valid first name!");
					return;
				}
				if (lastName.length < 4) {
					const element = document.getElementById(
						passgengerIDs[i].lastNameID
					);
					setAnchorEl(element);
					element.focus();
					setErrorMessage("Please enter a valid last name!");
					return;
				}
				if (!nationality) {
					const element = document.getElementById(
						passgengerIDs[i].nationalityID
					);
					console.log(nationality);
					setAnchorEl(element);
					element.focus();
					setErrorMessage("Please select your Nationality!");
					return;
				}
			}
			const progress = progressStages[progressIndex + 1].id;
			const emailID = searchParams.get("email");
			const pinCode = searchParams.get("pincode");
			let url = `/flights/booking/${progress}/${flight_id}?date=${departureDate}&travellers=${travellers}&email=${emailID}&pincode=${pinCode}&passengerdetails=${JSON.stringify(
				passengerDetails
			)}`;
			navigate(url);
		}
	}
	const {
		source,
		destination,
		departureTime,
		arrivalTime,
		duration,
		flightID,
		ticketPrice,
		stops,
	} = flightData;
	let airlineImg, airlineName, flightName;
	const calulatedDuration = ("" + duration).padStart(2, "0") + "hr 00min";
	const depDate = new Date(departureDate);
	depDate.setHours(
		+departureTime.slice(0, 2) + 5 + (+departureTime.slice(3, 5) + 30) / 60,
		(+departureTime.slice(3, 5) + 30) % 60
	);
	const arrDate = new Date(depDate.getTime() + duration * 60 * 60 * 1000);
	const sourceIndex = airports.findIndex((item) => item.iata_code == source);
	const destinationIndex = airports.findIndex(
		(item) => item.iata_code == destination
	);
	const extraCharges = +(travellers * (ticketPrice * 0.18 + 309)).toFixed(0);
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
			{isLoading && (
				<>
					{Array.from({ length: 8 }).map((_, i) => (
						<div key={i} className="flight-booking-loader"></div>
					))}
				</>
			)}
			{!isLoading && (
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
									{airports[sourceIndex].city} to{" "}
									{airports[destinationIndex].city}
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
									(Your ticket and flight info will be sent
									here)
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
										onChange={() => setAnchorEl(null)}
									/>
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
										inputRef={pincodeRef}
										InputProps={{ type: "number" }}
										onChange={() => setAnchorEl(null)}
									/>
									<TextField
										sx={{ width: 500 }}
										label="Address"
										variant="standard"
										placeholder="Enter Billing Address"
										InputLabelProps={{ shrink: true }}
										inputRef={billingAddressRef}
										onChange={() => setAnchorEl(null)}
									/>
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
													bgcolor:
														"rgb(187, 187, 187) ",
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
								<Stack
									sx={{
										bgcolor: "#fff",
										p: 3,
										"& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
											{
												borderBottom:
													"1px solid rgba(0, 0, 0, 0.42)",
											},
									}}
									gap={4}
								>
									{passengerDetails.map(({ id }, i) => {
										return (
											<Box key={i}>
												<Typography
													color="rgba(0,0,0,.87)"
													fontSize={16}
													fontWeight={600}
												>
													Passenger {id}
												</Typography>
												<Stack
													direction={"row"}
													columnGap={4}
													rowGap={2}
													sx={{ mt: 2 }}
													flexWrap={"wrap"}
												>
													<TextField
														variant="standard"
														label="First Name"
														placeholder="First Name & Middle Name(if any)"
														InputLabelProps={{
															shrink: true,
															style: {
																color: "rgba(0,0,0,.38)",
															},
														}}
														sx={{
															width: 240,
															"& input": {
																fontSize: 14,
															},
														}}
														id={
															passgengerIDs[i]
																.firstNameID
														}
														onChange={(e) => {
															setAnchorEl(null);
															setPassengerDetails(
																(prev) => {
																	const newDetails =
																		[
																			...prev,
																		];
																	newDetails[
																		i
																	].firstName =
																		e.target.value;
																	return newDetails;
																}
															);
														}}
													/>
													<TextField
														variant="standard"
														label="Last Name"
														placeholder="Last Name"
														InputLabelProps={{
															shrink: true,
															style: {
																color: "rgba(0,0,0,.38)",
															},
														}}
														sx={{
															width: 240,
															"& input": {
																fontSize: 14,
															},
														}}
														id={
															passgengerIDs[i]
																.lastNameID
														}
														onChange={(e) => {
															setAnchorEl(null);
															setPassengerDetails(
																(prev) => {
																	const newDetails =
																		[
																			...prev,
																		];
																	newDetails[
																		i
																	].lastName =
																		e.target.value;
																	return newDetails;
																}
															);
														}}
													/>
													<Autocomplete
														options={countries}
														getOptionLabel={(
															option
														) => option}
														renderInput={(
															params
														) => (
															<TextField
																{...params}
																sx={{
																	width: 320,
																}}
																variant="standard"
																label="Nationality"
																InputLabelProps={{
																	shrink: true,
																	style: {
																		color: "rgba(0,0,0,.38)",
																	},
																}}
																placeholder="Select Country"
															/>
														)}
														sx={{
															"& input": {
																fontSize: 14,
															},
														}}
														id={
															passgengerIDs[i]
																.nationalityID
														}
														onChange={(e, v) => {
															setAnchorEl(null);
															setPassengerDetails(
																(prev) => {
																	const newDetails =
																		[
																			...prev,
																		];
																	newDetails[
																		i
																	].nationality =
																		v;
																	return newDetails;
																}
															);
														}}
													/>
												</Stack>
											</Box>
										);
									})}
								</Stack>
							</Box>
						</Stack>
					)}
					{progressIndex == 2 && (
						<Stack sx={{ width: 940 }}>
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
									Summary
								</Typography>
								<Stack></Stack>
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
										({travellers} travellers)
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
												₹{travellers * ticketPrice}
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
													(18% GST + Conv. fee ₹309/-
													per traveller)
												</Typography>
											</Stack>
											<Typography
												color={"rgba(0,0,0,.87)"}
												fontSize={14}
												fontWeight={600}
											>
												₹{extraCharges}
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
										₹
										{travellers * ticketPrice +
											extraCharges}
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
			)}
			<Popper
				placement="bottom-start"
				open={anchorEl != null}
				anchorEl={anchorEl}
				sx={{ zIndex: 100 }}
			>
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
					<BiSolidError size="17px" style={{ marginRight: "5px" }} />{" "}
					{errorMesaage}
				</Box>
			</Popper>
		</Box>
	);
}
