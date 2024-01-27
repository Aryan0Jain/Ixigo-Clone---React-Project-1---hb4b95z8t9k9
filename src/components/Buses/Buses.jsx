import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import busBG from "../../assests/images/bus-banner.webp";
import { IoSwapHorizontal } from "react-icons/io5";
import { FaBusAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { BiSolidError } from "react-icons/bi";
import BusOffersCarousel from "./BusOffersCarousel";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useBusSearchContext } from "../Contexts/BusSearchProvider";
import { useNavigate } from "react-router-dom";
import { Popper } from "@mui/material";
import BusCityInput from "./BusCityInput";

const popperSX = {
	border: 0,
	py: 0.5,
	// px: 1,
	fontSize: "14px",
	// bgcolor: "rgba(255,0,0,0.1)",
	color: "#D50000",
	fontWeight: 500,
	display: "flex",
	alignItems: "center",
	left: -2,
	mt: "8px",
	borderBottomRightRadius: "5px",
	borderBottomLeftRadius: "5px",
};

export default function Buses() {
	const {
		source,
		setSource,
		destination,
		setDestination,
		departureDate,
		setDepartureDate,
		cities,
	} = useBusSearchContext();
	const sourceRef = useRef();
	const destinationRef = useRef();
	const depDateRef = useRef();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	function removeError() {
		setErrorMessage("");
		setAnchorEl(null);
	}
	function validateAndFetch() {
		if (source === destination) {
			setErrorMessage("Source & Destination Can't be same!");
			setAnchorEl(sourceRef.current);
			return;
		}
		if (!departureDate) {
			setErrorMessage("Please Enter A Date!");
			setAnchorEl(depDateRef.current);
			return;
		}
		if (departureDate.$d == "Invalid Date") {
			setErrorMessage("Please Enter A Valid Date!");
			setAnchorEl(depDateRef.current);
			return;
		}
		const difference = departureDate.diff(new dayjs().hour(0).minute(0));
		if (difference < 0 || difference > 91 * 24 * 3600 * 1000) {
			setErrorMessage("Date is out of Range!");
			setAnchorEl(depDateRef.current);
			return;
		}
		setAnchorEl(null);
		const date = departureDate.toJSON();
		const from = encodeURI(cities[source]);
		const to = encodeURI(cities[destination]);
		// console.log(from);
		const url = `/buses/search?date=${date}&from=${from}&to=${to}`;
		// console.log(url);
		navigate(url);
	}
	useEffect(() => window.scrollTo(0, 0), []);
	return (
		<Box sx={{ mt: 8.2 }}>
			<Stack
				position={"relative"}
				sx={{
					backgroundImage: `url(${busBG})`,
					minHeight: "428px",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<Typography position={"absolute"} top={"100px"} variant="h4">
					Book Bus Tickets
				</Typography>
				<Stack
					direction={"row"}
					sx={{
						bgcolor: "#fff",
						width: "fit-cintent",
						mx: "auto",
						p: 3,
						borderRadius: "15px",
					}}
					className="bus-search-pannel"
					alignItems={"center"}
					gap={3}
				>
					<BusCityInput
						Icon={FaBusAlt}
						placeholder="From City"
						value={source}
						setValue={setSource}
						removeError={removeError}
						ref={sourceRef}
					/>
					<IoSwapHorizontal
						size={40}
						style={{
							backgroundColor: "#f2f2f2",
							padding: "10px",
							borderRadius: "8px",
							color: "grey",
						}}
					/>
					<BusCityInput
						Icon={FaMapMarkerAlt}
						placeholder="To City"
						value={destination}
						setValue={setDestination}
						removeError={removeError}
						ref={destinationRef}
					/>
					<Box
						sx={{
							display: "flex",
							border: "1px solid rgba(0,0,0,0.1)",
							borderRadius: "15px",
							alignItems: "center",
							height: "fit-content",
							p: 0.75,
							px: 2,
						}}
					>
						<DatePicker
							ref={depDateRef}
							sx={{
								width: 150,
							}}
							slotProps={{
								textField: {
									variant: "standard",
									InputLabelProps: { shrink: true },
									InputProps: {
										disableUnderline: true,
									},
								},
								inputAdornment: {
									position: "start",
								},
							}}
							slots={{ openPickerIcon: FcCalendar }}
							format="DD/MM/YYYY"
							disablePast
							reduceAnimations
							maxDate={new dayjs().add(90, "day")}
							value={departureDate}
							onChange={(val) => {
								setDepartureDate(val);
								removeError();
							}}
						/>
					</Box>

					<Button
						variant="contained"
						sx={{
							textTransform: "none",
							px: 6,
							py: 1.5,
							fontSize: 20,
							borderRadius: "8px",
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
			</Stack>
			<BusOffersCarousel />
		</Box>
	);
}
