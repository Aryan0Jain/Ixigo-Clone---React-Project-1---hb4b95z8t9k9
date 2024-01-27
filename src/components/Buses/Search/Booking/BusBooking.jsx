import {
	Autocomplete,
	Box,
	Button,
	Divider,
	FormControl,
	FormControlLabel,
	FormLabel,
	Popper,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { BiSolidError } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useBusSearchContext } from "../../../Contexts/BusSearchProvider";
import { useSearchContext } from "../../../Contexts/SearchProdiver";
import Travellers from "../../../Trains/Booking/Travellers";
import BookingModal from "../../../Flights/BookingModal";
import dayjs from "dayjs";

export default function BusBooking() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const params = useParams();
	const nameRef = useRef();
	const ageRef = useRef();
	const pincodeRef = useRef();
	const contactEmailRef = useRef();
	const [gender, setGender] = useState("male");
	const nationalityRef = useRef();
	const bus_id = params.details;
	const busdata = JSON.parse(searchParams.get("busdetails"));
	const fare = +busdata.fare;
	const seats = busdata.seats;
	const depDate = new dayjs(searchParams.get("date"))
		.hour(+busdata.departureTime.slice(0, 2))
		.minute(+busdata.departureTime.slice(3, 5));
	let arrDate = depDate
		.hour(+busdata.arrivalTime.slice(0, 2))
		.minute(+busdata.arrivalTime.slice(3, 5));
	const difference = arrDate.diff(depDate);
	if (difference < 0) {
		arrDate = arrDate.add(24, "hour");
	}
	const duration = arrDate.diff(depDate, "minute");
	const durationString =
		("" + Math.floor(duration / 60)).padStart(2, "0") +
		":" +
		("" + (duration % 60)).padStart(2, "0") +
		" hrs";
	const [travellers, setTravellers] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	const [bookingWait, setBookingWait] = useState({
		startWaiting: false,
		recieved: false,
		message: "",
	});
	const { bookBus } = useBusSearchContext();
	const user = JSON.parse(localStorage.getItem("userDetails")) || {};
	const { countries } = useSearchContext();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	function getDateToString(date) {
		return date.format("ddd, DD MMM");
	}
	function handleAddTraveller() {
		if (nameRef.current.value.length < 4) {
			setAnchorEl(nameRef.current);
			nameRef.current.focus();
			setErrorMessage("Please Enter a valid name!");
			return;
		}
		if (ageRef.current.value === "") {
			setAnchorEl(ageRef.current);
			ageRef.current.focus();
			setErrorMessage("Please Enter Traveller's age!");
			return;
		}
		if (!nationalityRef.current.value) {
			setAnchorEl(nationalityRef.current);
			nationalityRef.current.focus();
			setErrorMessage("Please Select Your Nationality!");
			return;
		}
		const data = {
			name: nameRef.current.value,
			age: ageRef.current.value,
			gender: gender,
			nationality: nationalityRef.current.value,
		};
		setTravellers((prev) => {
			const newDetails = [...prev];
			newDetails.push(data);
			return newDetails;
		});
		nameRef.current.value = "";
		ageRef.current.value = "";
		setGender("male");
	}
	function isValidPincode(code) {
		return code.length == 6 && code[0] != "0";
	}
	function isValidEmail(email) {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return pattern.test(email);
	}
	function getTotalFare() {
		let total = travellers.reduce(
			(cur, passenger) => (passenger.age > 4 ? cur + fare : cur),
			0
		);
		return total;
	}
	async function handlePay() {
		if (!isValidPincode(pincodeRef.current.value)) {
			setAnchorEl(pincodeRef.current);
			pincodeRef.current.focus();
			setErrorMessage("Please Enter Valid Pincode!");
			return;
		}
		if (!isValidEmail(contactEmailRef.current.value)) {
			setAnchorEl(contactEmailRef.current);
			contactEmailRef.current.focus();
			setErrorMessage("Please Enter Email!");
			return;
		}
		setBookingWait((prev) => {
			return { ...prev, startWaiting: true };
		});
		const message = await bookBus(bus_id, depDate, arrDate);
		setBookingWait((prev) => {
			setTimeout(() => navigate("/"), 5000);
			return { ...prev, message: message.message, recieved: true };
		});
	}
	return (
		<Box sx={{ mt: 8.2, width: "100%", mb: 3 }}>
			<Box
				sx={{
					background: "linear-gradient(45deg,#721053,#AD2E41)",
					width: "100%",
					p: 2,
				}}
			>
				<Stack sx={{ mx: "auto", width: "fit-content", color: "#fff" }}>
					<Typography>Booking Details:</Typography>
					<Stack direction={"row"} alignItems={"center"} gap={1}>
						{busdata.source.split(",")[0]} <FaArrowRightLong />{" "}
						{busdata.destination.split(",")[0]}{" "}
						<div
							style={{
								width: 5,
								height: 5,
								backgroundColor: "#fff",
								borderRadius: "50%",
							}}
						></div>
						{getDateToString(depDate)}
					</Stack>
				</Stack>
			</Box>
			<Stack alignItems={"center"} gap={2} className="train-booking-page">
				<Box>
					<Typography
						sx={{
							py: 2,
							pl: 1,
							bgcolor: "#e6e7e8",
							color: "rgba(0,0,0,.54)",
							fontSize: 15,
							fontWeight: 400,
						}}
					>
						BOOKING DETAILS
					</Typography>
					<Stack sx={{ width: "800px", bgcolor: "#fff" }}>
						<Stack
							direction={"row"}
							sx={{ width: "100%", p: 2 }}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Typography fontWeight={600}>
								₹{fare} per seat
							</Typography>
							<Typography>{seats} Seats Available</Typography>
							{/* <Typography
								sx={{
									color: "#559b09",
									bgcolor: "rgba(85,155,9,.08)",
									p: 0.75,
									fontSize: 12,
									fontWeight: 600,
									border: "1px solid rgba(85,155,9,.4)",
									borderRadius: "4px",
								}}
							>
								AVL {seats}
							</Typography> */}
						</Stack>
						<Divider orientation="horizontal" />
						<Stack sx={{ p: 2 }} gap={1}>
							<Typography fontSize={13} fontWeight={300}>
								{getDateToString(depDate)}
							</Typography>
							<Typography fontSize={17} fontWeight={600}>
								{busdata.name}
							</Typography>
							<Stack
								direction={"row"}
								alignItems={"center"}
								// sx={{ width: "100%" }}
								justifyContent={"space-between"}
							>
								<Box sx={{ textAlign: "center" }}>
									<Typography fontSize={14}>
										{busdata.departureTime}
									</Typography>
									<Typography fontSize={11} fontWeight={600}>
										{busdata.source.split(",")[0]}
									</Typography>
								</Box>
								<Divider
									orientation="horizontal"
									sx={{ flex: 1, minWidth: "100px" }}
								>
									<Typography fontSize={11}>
										{durationString}
									</Typography>
								</Divider>
								<Box sx={{ textAlign: "center" }}>
									<Typography fontSize={14}>
										{busdata.arrivalTime}
									</Typography>
									<Typography fontSize={11} fontWeight={600}>
										{busdata.destination.split(",")[0]}
									</Typography>
								</Box>
							</Stack>
						</Stack>
					</Stack>
				</Box>
				<Box>
					<Typography
						sx={{
							py: 2,
							pl: 1,
							bgcolor: "#e6e7e8",
							color: "rgba(0,0,0,.54)",
							fontSize: 15,
							fontWeight: 400,
						}}
					>
						TRAVELLERS{" "}
						<span
							style={{ fontSize: 10, color: "rgba(0,0,0,0.66)" }}
						>
							(Seats are not allotted or mentioned in the ticket
							for infant passengers (0-4 years), as no booking
							amount is charged.)
						</span>
					</Typography>
					<Stack sx={{ width: "800px" }}>
						<Stack
							sx={{ m: 2 }}
							direction={"row"}
							flexWrap={"wrap"}
							gap={3}
						>
							<TextField
								variant="standard"
								label="Name"
								inputRef={nameRef}
								placeholder="Enter Traveller's Name"
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
								onChange={(e) => {
									setAnchorEl(null);
								}}
							/>
							<TextField
								variant="standard"
								label="Age"
								placeholder="Enter Age"
								inputRef={ageRef}
								InputLabelProps={{
									shrink: true,
									style: {
										color: "rgba(0,0,0,.38)",
									},
								}}
								InputProps={{
									type: "number",
									inputProps: { min: 0 },
								}}
								sx={{
									width: 150,
									"& input": {
										fontSize: 14,
									},
								}}
								onChange={(e) => {
									setAnchorEl(null);
									// setNewTraveller((prev) => {
									// 	return {
									// 		...prev,
									// 		age: e.target.value,
									// 	};
									// });
								}}
							/>
							<FormControl>
								<FormLabel
									sx={{
										fontSize: 11,
										color: "rgba(0,0,0,.38)",
									}}
								>
									Gender
								</FormLabel>
								<RadioGroup
									defaultValue="male"
									row
									value={gender}
									onChange={(e) => {
										setGender(gender);
										// setNewTraveller((prev) => {
										// 	return {
										// 		...prev,
										// 		age: e.target.value,
										// 	};
										// });
									}}
								>
									<FormControlLabel
										value="male"
										control={
											<Radio disableRipple size="small" />
										}
										label="Male"
									/>
									<FormControlLabel
										value="female"
										control={
											<Radio disableRipple size="small" />
										}
										label="Female"
									/>
								</RadioGroup>
							</FormControl>
							<Autocomplete
								options={countries}
								getOptionLabel={(option) => option}
								renderInput={(params) => (
									<TextField
										{...params}
										sx={{
											width: 320,
										}}
										inputRef={nationalityRef}
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
								onChange={(e, v) => {
									setAnchorEl(null);
								}}
							/>
							<Button
								disableRipple
								variant="contained"
								sx={{ m: "auto" }}
								onClick={handleAddTraveller}
							>
								Add Traveller
							</Button>
						</Stack>
						<Travellers
							travellers={travellers}
							setTravellers={setTravellers}
						/>
					</Stack>
				</Box>
				<Box>
					<Typography
						sx={{
							py: 2,
							pl: 1,
							bgcolor: "#e6e7e8",
							color: "rgba(0,0,0,.54)",
							fontSize: 15,
							fontWeight: 400,
						}}
					>
						BILLING ADDRESS
					</Typography>
					<Stack sx={{ width: "800px" }}>
						<Stack
							sx={{ m: 2 }}
							direction={"row"}
							flexWrap={"wrap"}
							gap={3}
						>
							<TextField
								label="Pincode"
								required
								variant="standard"
								defaultValue={400000}
								InputLabelProps={{
									shrink: true,
									style: {
										color: "rgba(0,0,0,.38)",
									},
								}}
								InputProps={{
									type: "number",
								}}
								sx={{
									width: 150,
									"& input": {
										fontSize: 14,
									},
								}}
								inputRef={pincodeRef}
								onChange={() => setAnchorEl(null)}
							/>
							<TextField
								sx={{
									width: 500,
									"& input": {
										fontSize: 14,
									},
								}}
								label="Address"
								variant="standard"
								placeholder="Enter Billing Address"
								InputLabelProps={{
									shrink: true,
									style: {
										color: "rgba(0,0,0,.38)",
									},
								}}
								onChange={() => setAnchorEl(null)}
							/>
						</Stack>
					</Stack>
				</Box>
				<Box>
					<Typography
						sx={{
							py: 2,
							pl: 1,
							bgcolor: "#e6e7e8",
							color: "rgba(0,0,0,.54)",
							fontSize: 15,
							fontWeight: 400,
						}}
					>
						CONTACT DETAILS{" "}
						<span
							style={{ fontSize: 10, color: "rgba(0,0,0,0.66)" }}
						>
							(We will share the booking details via E-mail. )
						</span>
					</Typography>
					<Stack sx={{ width: "800px" }}>
						<Stack
							sx={{ m: 2 }}
							direction={"row"}
							flexWrap={"wrap"}
							gap={3}
						>
							<TextField
								sx={{
									width: 500,
									"& input": {
										fontSize: 14,
									},
								}}
								defaultValue={user.email}
								required
								label="Email"
								variant="standard"
								placeholder="Enter Email Address"
								InputLabelProps={{
									shrink: true,
									style: {
										color: "rgba(0,0,0,.38)",
									},
								}}
								inputRef={contactEmailRef}
								onChange={() => setAnchorEl(null)}
							/>
						</Stack>
					</Stack>
				</Box>
				<Button
					disableRipple
					disabled={travellers.length < 1}
					variant="contained"
					sx={{
						px: 3,
					}}
					onClick={handlePay}
				>
					Pay: ₹{getTotalFare()}
				</Button>
			</Stack>
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
			<BookingModal {...{ bookingWait }} />
		</Box>
	);
}
