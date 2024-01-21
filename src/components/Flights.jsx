import {
	Box,
	Button,
	IconButton,
	Popper,
	Stack,
	Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import flightLogo from "../assests/images/flight-booking.png";
import banner from "../assests/images/banner1.png";
import swapSVG from "../assests/svgs/swap.svg";
import Carousel from "./Carousel";
import { useSearchContext } from "./Contexts/SearchProdiver";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ControlledCustomInput from "./ControlledCustomInput";
import { BiSolidError } from "react-icons/bi";
const whiteDot = {
	display: "inline-block",
	verticalAlign: "middle",
	width: "5px",
	height: "5px",
	backgroundColor: "#fff",
	borderRadius: "10px",
	margin: "0px 10px",
};
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
	mt: "0px",
	borderBottomRightRadius: "5px",
	borderBottomLeftRadius: "5px",
};
export default function Flights() {
	const location = useLocation();
	const fromRef = useRef();
	const toRef = useRef();
	const departureRef = useRef();
	const passengerRef = useRef();
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const {
		fromCity,
		setFromCity,
		toCity,
		setToCity,
		departureDate,
		setDepartureDate,
		travellers,
		setTravellers,
		airports,
	} = useSearchContext();

	function validateAndFetch() {
		const from = fromRef.current.querySelector("input").value.slice(0, 3);
		const to = toRef.current.querySelector("input").value.slice(0, 3);
		if (to == from) {
			setErrorMessage("Form City & to City Can't be same!");
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
		setFromCity(airports.findIndex((item) => item.iata_code == from));
		setToCity(airports.findIndex((item) => item.iata_code == to));
		setDepartureDate(depDate);
		setTravellers(pass - 1);
		let url = `/flights/search?date=${depDate}&from=${from}&to=${to}&travellers=${pass}`;
		navigate(url);
	}
	function removeError() {
		setErrorMessage("");
		setAnchorEl(null);
	}
	return (
		<Box component={"div"} sx={{ width: "100%" }}>
			<Box
				component={"div"}
				position={"absolute"}
				// position={"relative"}
				sx={{ width: "100%" }}
			>
				<Box
					component={"div"}
					position={"absolute"}
					sx={{
						backgroundImage:
							"url('https://images.ixigo.com/image/upload/banner/a75f1fd133a52d1f7d32509d63e3add5-zycdf.webp')",
						width: "100%",
						height: "550px",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						zIndex: "-10",
					}}
				></Box>
				<Box
					component={"div"}
					position={"absolute"}
					sx={{
						backgroundColor: "rgba(0, 0, 0, 0.269)",
						width: "100%",
						height: "550px",
						zIndex: "-5",
					}}
				></Box>
			</Box>
			<Box>
				<div style={{ position: "relative" }}>
					<Stack
						direction={"row"}
						gap={1}
						sx={{
							pt: "150px",
							pb: "120px",
							width: "fit-content",
							margin: "auto",
							alignItems: "center",
						}}
					>
						<img src={flightLogo} />
						<Typography
							variant="h5"
							color={"#fff"}
							fontWeight={600}
						>
							{location.pathname != "/" ? (
								"Flight Booking"
							) : (
								<>
									search
									<span style={whiteDot}></span>
									book
									<span style={whiteDot}></span>
									go
								</>
							)}
						</Typography>
						<div
							style={{
								position: "absolute",
								right: "200px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h5"
								color={"#fff"}
								fontWeight={400}
							>
								Agra
							</Typography>
							<Typography
								variant="body1"
								color={"#fff"}
								fontWeight={300}
							>
								India
							</Typography>
						</div>
					</Stack>
				</div>
			</Box>
			<Stack
				direction={"row"}
				className="flight-search-pannel"
				alignItems={"center"}
				gap={4}
				sx={{
					width: "fit-content",
					m: "auto",
					backgroundColor: "#fff",
					py: 4,
					px: 4,
					borderRadius: "5px",
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
						border: "2px solid",
					}}
				>
					<img src={swapSVG} />
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
						m: "auto",
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
					sx={{ zIndex: 100 }}
				>
					<Box sx={{ ...popperSX }}>
						<BiSolidError
							size="17px"
							style={{ marginRight: "5px" }}
						/>{" "}
						{errorMesaage}
					</Box>
				</Popper>
			</Stack>
			<Box sx={{ m: "auto", width: "fit-content", my: 5 }}>
				<img src={banner} />
			</Box>
			<Carousel />
		</Box>
	);
}
