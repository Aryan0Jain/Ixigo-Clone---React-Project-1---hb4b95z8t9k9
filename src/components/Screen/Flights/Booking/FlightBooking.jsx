import { Box, Button, Divider, Popper, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import AILogo from "../../../../assests/images/airlines/AI.png";
import INLogo from "../../../../assests/images/airlines/6E.png";
import G8Logo from "../../../../assests/images/airlines/G8.png";
import SGLogo from "../../../../assests/images/airlines/SG.png";
import UKLogo from "../../../../assests/images/airlines/UK.png";
import { MdExpandMore } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";
import { useSearchContext } from "../../../../Contexts/SearchProdiver";
import ReviewCard from "./ReviewCard";
import PassengerDetailsCard from "./PassengerDetailsCard";
import ReviewAndPay from "./ReviewAndPay";
import {
	FLIGHT_BOOKING_PROGRESS_STAGES,
	AIRPORTS,
} from "../../../../constants";
import { usePaymentContext } from "../../../../Contexts/PaymentContextProvider";
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
	const [contactEmail, setContactEmail] = useState();
	const pincodeRef = useRef();
	const billingAddressRef = useRef();
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const params = useParams();
	const flight_id = params.details;
	const departureDate = searchParams.get("date");
	const travellers = searchParams.get("travellers");
	const {
		paymentIsPending,
		setPaymentisPending,
		setAmount,
		setBookingFunction,
	} = usePaymentContext();
	const [passengerDetails, setPassengerDetails] = useState(
		Array.from({ length: travellers }).map((_, i) => {
			return {
				id: i + 1,
				title: "",
				firstName: "",
				lastName: "",
				nationality: "",
			};
		})
	);
	const passgengerIDs = Array.from({ length: travellers }).map((_, i) => {
		return {
			id: i + 1,
			titleID: `title-${i + 1}`,
			firstNameID: `firstname-${i + 1}`,
			lastNameID: `lastname-${i + 1}`,
			nationalityID: `nationality-${i + 1}`,
		};
	});
	const { bookFlight, tempData } = useSearchContext();
	const [flightData, setFlightData] = useState(tempData);
	const progressIndex = FLIGHT_BOOKING_PROGRESS_STAGES.findIndex(
		({ id }) => id == params.progress
	);
	const user = JSON.parse(localStorage.getItem("userDetails")) || {};
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
	const calculatedDuration = ("" + duration).padStart(2, "0") + "hr 00min";
	const depDate = new Date(departureDate);
	depDate.setHours(
		+departureTime.slice(0, 2) + 5 + (+departureTime.slice(3, 5) + 30) / 60,
		(+departureTime.slice(3, 5) + 30) % 60
	);
	const arrDate = new Date(depDate.getTime() + duration * 60 * 60 * 1000);
	const sourceIndex = AIRPORTS.findIndex((item) => item.iata_code == source);
	const destinationIndex = AIRPORTS.findIndex(
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
	useEffect(() => {
		setFlightData(JSON.parse(searchParams.get("flightdata")));
		setIsLoading(false);
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
			const progress =
				FLIGHT_BOOKING_PROGRESS_STAGES[progressIndex + 1].id;
			const emailID = contactEmailRef.current.value;
			setContactEmail(emailID);
			const pinCode = pincodeRef.current.value;
			let url = `/flights/booking/${progress}/${flight_id}?date=${departureDate}&travellers=${travellers}&email=${emailID}&pincode=${pinCode}`;
			navigate(url);
		}
		if (progressIndex == 1) {
			for (let i = 0; i < travellers; i++) {
				const { title, firstName, lastName, nationality } =
					passengerDetails[i];
				if (!title) {
					const element = document.getElementById(
						passgengerIDs[i].titleID
					);
					setAnchorEl(element);
					element.focus();
					setErrorMessage("Please select your title!");
					return;
				}
				if (firstName === "") {
					const element = document.getElementById(
						passgengerIDs[i].firstNameID
					);
					setAnchorEl(element);
					element.focus();
					setErrorMessage("Please enter a valid first name!");
					return;
				}
				if (lastName === "") {
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
					setAnchorEl(element);
					element.focus();
					setErrorMessage("Please select your Nationality!");
					return;
				}
			}
			const progress =
				FLIGHT_BOOKING_PROGRESS_STAGES[progressIndex + 1].id;
			const emailID = searchParams.get("email");
			const pinCode = searchParams.get("pincode");
			let url = `/flights/booking/${progress}/${flight_id}?date=${departureDate}&travellers=${travellers}&email=${emailID}&pincode=${pinCode}&passengerdetails=${JSON.stringify(
				passengerDetails
			)}`;
			navigate(url);
		}
	}
	async function handlePayButton() {
		setPaymentisPending(true);
		setAmount(travellers * ticketPrice + extraCharges);
		setBookingFunction({
			bookingFunction: bookFlight.bind(null, flight_id, depDate, arrDate),
		});
		// setBookingWait((prev) => {
		// 	return { ...prev, startWaiting: true };
		// });
		// const message = await bookFlight(flight_id, depDate, arrDate);
		// setBookingWait((prev) => {
		// 	setTimeout(() => navigate("/"), 5000);
		// 	return { ...prev, message: message.message, recieved: true };
		// });
	}
	useEffect(() => {
		if (paymentIsPending) navigate("/payment");
	}, [paymentIsPending]);

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
					{FLIGHT_BOOKING_PROGRESS_STAGES.map(({ name }, index) => {
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
						<ReviewCard
							{...{
								sourceIndex,
								destinationIndex,
								flightID,
								source,
								destination,
								departureTime,
								arrivalTime,
								duration,
								ticketPrice,
								searchParams,
								user,
								contactEmailRef,
								billingAddressRef,
								pincodeRef,
								setAnchorEl,
							}}
						/>
					)}
					{progressIndex == 1 && (
						<PassengerDetailsCard
							{...{
								airlineImg,
								airlineName,
								flightName,
								calculatedDuration,
								depDate,
								arrDate,
								source,
								destination,
								stops,
								departureTime,
								arrivalTime,
								sourceIndex,
								destinationIndex,
								contactEmail,
								passengerDetails,
								passgengerIDs,
								setAnchorEl,
								setPassengerDetails,
							}}
						/>
					)}
					{progressIndex == 2 && (
						<ReviewAndPay
							{...{
								airlineImg,
								airlineName,
								flightName,
								calculatedDuration,
								stops,
								source,
								departureTime,
								depDate,
								destination,
								arrivalTime,
								arrDate,
								contactEmail,
								travellers,
								passengerDetails,
								handlePayButton,
								ticketPrice,
								extraCharges,
							}}
						/>
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
						{progressIndex < 2 && (
							<Button
								onClick={handleContinue}
								disableRipple
								variant="contained"
							>
								Continue
							</Button>
						)}
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
					<Typography fontSize={14}>{errorMesaage}</Typography>
				</Box>
			</Popper>
		</Box>
	);
}
