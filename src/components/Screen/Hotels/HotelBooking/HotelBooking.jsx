import {
	Autocomplete,
	Button,
	Container,
	Divider,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CURRENCY_FORMATTER, IS_VALID_EMAIL } from "../../../../utils";
import { COUNTRIES } from "../../../../constants";
import { useHotelSearchContext } from "../../../../Contexts/HotelSearchProvider";
import { PiDoorOpenDuotone } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { usePaymentContext } from "../../../../Contexts/PaymentContextProvider";

export default function HotelBooking() {
	const params = useParams();
	const [searchParams] = useSearchParams();
	const { bookHotel } = useHotelSearchContext();
	const navigate = useNavigate();
	const hotelID = params.details;
	const checkin = new dayjs(searchParams.get("checkin"));
	const checkout = new dayjs(searchParams.get("checkout"));
	const rooms = +searchParams.get("rooms");
	const guests = +searchParams.get("guests");
	const cost = +searchParams.get("cost");
	const nights = checkout.diff(checkin, "day");
	const hotel = JSON.parse(searchParams.get("hotel"));
	const {
		paymentIsPending,
		setPaymentisPending,
		setAmount,
		setBookingFunction,
	} = usePaymentContext();
	// const [bookingWait, setBookingWait] = useState({
	// 	startWaiting: false,
	// 	recieved: false,
	// 	message: "",
	// });
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();

	const [title, setTitle] = useState("Mr.");
	const user = JSON.parse(localStorage.getItem("userDetails")) || {};
	const [names, setNames] = useState([
		user?.name ?? "Enter Your First Name",
		"",
	]);
	const [email, setEmail] = useState(user?.email ?? "");
	function isvalidName(name) {
		if (
			name &&
			name.length >= 1 &&
			name.length <= 20 &&
			name.match(/\d/) === null
		)
			return true;
		return false;
	}
	function handleChangeTitle(e, v) {
		setTitle(v);
	}
	function handleNameChange(e, index) {
		setNames((prev) => {
			const newNames = [...prev];
			newNames[index] = e.target.value;
			return newNames;
		});
	}
	async function handlePay() {
		if (!isvalidName(names[0])) {
			firstNameRef.current.focus();
			return;
		}
		if (!isvalidName(names[1])) {
			lastNameRef.current.focus();
			return;
		}
		if (!IS_VALID_EMAIL(email)) {
			emailRef.current.focus();
			return;
		}
		setPaymentisPending(true);
		setAmount(cost * rooms * nights * 1.18);
		const bookingFunc = bookHotel.bind(null, hotelID, checkin, checkout);
		setBookingFunction(bookingFunc);
		// setBookingWait((prev) => {
		// 	return { ...prev, startWaiting: true };
		// });
		// const message = await bookHotel(hotelID, checkin, checkout);
		// setBookingWait((prev) => {
		// 	setTimeout(() => navigate("/"), 5000);
		// 	return { ...prev, message: message.message, recieved: true };
		// });
	}
	useEffect(() => {
		if (paymentIsPending) navigate("/payment");
	}, [paymentIsPending]);
	return (
		<Container sx={{ mt: 10, py: 3 }}>
			<Stack direction={"row"} gap={3}>
				<Stack
					sx={{
						bgcolor: "#fff",
						p: 3,
						borderRadius: "10px",
						height: "fit-content",
					}}
				>
					<Typography fontSize={26} fontWeight={700}>
						Fare Summary
					</Typography>
					<Stack
						gap={2}
						divider={<Divider orientation="horizontal" />}
						sx={{ mt: 2 }}
					>
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
							sx={{ width: "400px" }}
						>
							<Typography>
								{rooms} {rooms === 1 ? "Room" : "Rooms"},{" "}
								{nights} {nights === 1 ? "Night" : "Nights"}
							</Typography>
							<Typography fontWeight={600}>
								{CURRENCY_FORMATTER(cost * rooms * nights)}
							</Typography>
						</Stack>
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
							sx={{ width: "400px" }}
						>
							<Typography>Taxes & Charges</Typography>
							<Typography fontWeight={600}>
								{CURRENCY_FORMATTER(
									cost * rooms * nights * 0.18
								)}
							</Typography>
						</Stack>
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
							sx={{ width: "400px" }}
						>
							<Typography fontSize={20} fontWeight={600}>
								Net Amount Payable
							</Typography>
							<Typography fontSize={20} fontWeight={600}>
								{CURRENCY_FORMATTER(
									cost * rooms * nights * 1.18
								)}
							</Typography>
						</Stack>
						<Button
							variant="contained"
							disableRipple
							onClick={handlePay}
						>
							Make Payment
						</Button>
					</Stack>
				</Stack>
				<Stack gap={3}>
					<Stack sx={{ bgcolor: "#fff", p: 3, borderRadius: "10px" }}>
						<Typography fontSize={26} fontWeight={700}>
							Enter Your Details
						</Typography>

						<RadioGroup
							value={title}
							onChange={handleChangeTitle}
							row
						>
							{["Mr.", "Mrs.", "Miss."].map((value) => {
								return (
									<FormControlLabel
										key={value}
										value={value}
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
										label={value}
									/>
								);
							})}
						</RadioGroup>
						<Stack
							direction={"row"}
							gap={4}
							flexWrap={"wrap"}
							sx={{ mt: 2 }}
							className="hotel-booking"
						>
							<TextField
								inputRef={firstNameRef}
								label="First Name"
								sx={{
									width: "300px",
									borderRadius: "10px",
									".MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":
										{
											borderColor: isvalidName(names[0])
												? "#0770e4"
												: "red",
										},
									".Mui-focused.MuiInputLabel-outlined": {
										color: isvalidName(names[0])
											? "#0770e4"
											: "red",
									},
								}}
								value={names[0]}
								onChange={(e) => handleNameChange(e, 0)}
								error={!isvalidName(names[0])}
								helperText={
									isvalidName(names[0])
										? ""
										: "Your first name should have 1-20 characters and should contain no digits"
								}
							/>
							<TextField
								inputRef={lastNameRef}
								label="Last Name"
								sx={{
									width: "300px",
									borderRadius: "10px",
									".MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":
										{
											borderColor: isvalidName(names[1])
												? "#0770e4"
												: "red",
										},
									".Mui-focused.MuiInputLabel-outlined": {
										color: isvalidName(names[1])
											? "#0770e4"
											: "red",
									},
								}}
								value={names[1]}
								onChange={(e) => handleNameChange(e, 1)}
								error={!isvalidName(names[1])}
								helperText={
									isvalidName(names[1])
										? ""
										: "Your last name should have 1-20 characters and should contain no digits"
								}
							/>
							<TextField
								inputRef={emailRef}
								label="Email Address"
								sx={{
									width: "300px",
									borderRadius: "10px",
									".MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":
										{
											borderColor: IS_VALID_EMAIL(email)
												? "#0770e4"
												: "red",
										},
									".Mui-focused.MuiInputLabel-outlined": {
										color: IS_VALID_EMAIL(email)
											? "#0770e4"
											: "red",
									},
								}}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								error={!IS_VALID_EMAIL(email)}
								helperText={
									IS_VALID_EMAIL(email)
										? ""
										: "Please enter a valid email address"
								}
							/>
							<Autocomplete
								options={COUNTRIES}
								getOptionLabel={(option) => option}
								defaultValue={COUNTRIES[0]}
								disableClearable
								sx={{
									width: "300px",
									borderRadius: "10px",
									".MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":
										{
											borderColor: "#0770e4",
										},
									".MuiInputLabel-root.Mui-focused": {
										color: "#0770e4 !important",
									},
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Nationality"
										InputLabelProps={{
											shrink: true,
											style: {
												color: "rgba(0,0,0,.38)",
											},
										}}
									/>
								)}
							/>
						</Stack>
					</Stack>
					<Stack sx={{ bgcolor: "#fff", p: 3, borderRadius: "10px" }}>
						<Stack direction={"row"} sx={{ gap: 3 }}>
							<img
								src={hotel.image}
								style={{
									width: "100px",
									height: "100px",
									objectFit: "cover",
									borderRadius: "10px",
								}}
							/>
							<Stack gap={1}>
								<Typography fontSize={22} fontWeight={600}>
									{hotel.name}
								</Typography>
								<Typography fontSize={16} color="#5e616e">
									{hotel.location}
								</Typography>
								<Stack
									direction={"row"}
									gap={3}
									alignItems={"center"}
								>
									<Stack
										direction={"row"}
										gap={1}
										alignItems={"center"}
									>
										<PiDoorOpenDuotone size={20} />
										<Typography>
											{rooms} x {hotel.roomtype}{" "}
											{rooms === 1 ? "room" : "rooms"}
										</Typography>
									</Stack>
									<Stack
										direction={"row"}
										gap={1}
										alignItems={"center"}
									>
										<MdOutlinePeopleAlt size={20} />
										<Typography>
											{guests}{" "}
											{guests === 1 ? "guest" : "guests"}
										</Typography>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
}
