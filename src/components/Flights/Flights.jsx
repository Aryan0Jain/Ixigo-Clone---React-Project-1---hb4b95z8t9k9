import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BiSolidError } from "react-icons/bi";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useSearchContext } from "../Contexts/SearchProdiver";
import ControlledCustomInput from "./ControlledCustomInput";
import Carousel from "./Carousel";
import BannerOfTheDay from "./BannerOfTheDay";
import BackgroundCarousel from "./BackgroundCarousel";
import SpecialFares from "./SpecialFares";
import swapSVG from "../../assests/svgs/swap.svg";

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
	} = useSearchContext();
	useEffect(() => window.scrollTo(0, 0), []);
	function validateAndFetch() {
		const from = fromRef.current.querySelector("input").value.slice(0, 3);
		const to = toRef.current.querySelector("input").value.slice(0, 3);
		if (to === from) {
			setErrorMessage("Form City & to City Can't be same!");
			setAnchorEl(fromRef.current);
			return;
		}
		if (!departureDate) {
			setErrorMessage("Please Enter A Date!");
			setAnchorEl(departureRef.current);
			return;
		}
		if (departureDate.$d === "Invalid Date") {
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
		// const depDate = weekDays[departureDate.day()];
		const pass = passengerRef.current.querySelector("input").value.at(0);
		let url = `/flights/search?date=${departureDate.toJSON()}&from=${from}&to=${to}&travellers=${pass}`;
		navigate(url);
	}
	function removeError() {
		setErrorMessage("");
		setAnchorEl(null);
	}
	return (
		<Box component={"div"} sx={{ width: "100%" }}>
			<BackgroundCarousel />
			<Stack
				gap={2}
				sx={{
					width: "fit-content",
					m: "auto",
					py: 3,
					px: 4,
					backgroundColor: "#fff",
					borderRadius: "5px",
					boxShadow: "0 0 10px rgba(0,0,0,.3)",
				}}
			>
				<Stack
					direction={"row"}
					className="flight-search-pannel"
					alignItems={"center"}
					gap={4}
					sx={{}}
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
					<DatePicker
						ref={departureRef}
						sx={{ width: 200 }}
						slotProps={{
							textField: {
								variant: "standard",
								InputLabelProps: { shrink: true },
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
				<Stack
					direction={"row"}
					alignItems={"center"}
					gap={1}
					sx={{ mt: 2 }}
				>
					<Typography
						fontSize={"13px"}
						fontWeight={400}
						color={"rgba(0,0,0,.54)"}
					>
						Special Fares(Coming Soon):{" "}
					</Typography>
					<SpecialFares />
				</Stack>
			</Stack>
			<BannerOfTheDay />
			<Carousel />
		</Box>
	);
}
