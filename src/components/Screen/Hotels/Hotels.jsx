import React, { useEffect, useRef, useState } from "react";
import hotelbg from "../../../assests/images/hotel-background.jpg";
import {
	Autocomplete,
	Box,
	Button,
	Container,
	Popper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useHotelSearchContext } from "../../../Contexts/HotelSearchProvider";
import { useNavigate } from "react-router-dom";
import { BiSolidError } from "react-icons/bi";
import { LOCATIONS } from "../../../constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import OffersCarousel from "./OffersCarousel";
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
export default function Hotels() {
	const {
		location,
		setLocation,
		checkinDate,
		setCheckinDate,
		hotelsData,
		searchHotels,
		checkoutDate,
		setCheckoutDate,
	} = useHotelSearchContext();
	const locationRef = useRef();
	const checkinRef = useRef();
	const checkoutRef = useRef();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	function removeError() {
		setErrorMessage("");
		setAnchorEl(null);
	}
	function validateAndFetch() {
		if (!checkinDate) {
			setErrorMessage("Please Enter A Date!");
			setAnchorEl(checkinRef.current);
			return;
		}
		if (checkinDate.$d == "Invalid Date") {
			setErrorMessage("Please Enter A Valid Date!");
			setAnchorEl(checkinRef.current);
			return;
		}
		if (!checkoutDate) {
			setErrorMessage("Please Enter A Date!");
			setAnchorEl(checkoutRef.current);
			return;
		}
		if (checkoutDate.$d == "Invalid Date") {
			setErrorMessage("Please Enter A Valid Date!");
			setAnchorEl(checkoutRef.current);
			return;
		}
		// const difference = departureDate.diff(new dayjs().hour(0).minute(0));
		// if (difference < 0 || difference > 91 * 24 * 3600 * 1000) {
		// 	setErrorMessage("Date is out of Range!");
		// 	setAnchorEl(depDateRef.current);
		// 	return;
		// }
		// setAnchorEl(null);
		// const date = departureDate.toJSON();
		// const from = encodeURI(BUS_CITIES[source]);
		// const to = encodeURI(BUS_CITIES[destination]);
		// console.log(from);
		// const url = `/buses/search?date=${date}&from=${from}&to=${to}`;
		// console.log(url);
		// navigate(url);
	}
	useEffect(() => window.scrollTo(0, 0), []);
	return (
		<Box sx={{ mt: 8.2, pt: 4 }}>
			<Container>
				{/* <Stack
					position={"relative"}
					sx={{
						// backgroundImage: `url(${hotelbg})`,
						minHeight: "428px",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}
					alignItems={"center"}
					justifyContent={"center"}
				> */}
				<Typography
					// position={"absolute"}
					// top={"100px"}
					variant="h4"
					// color={"#fff"}
				>
					Plan Your Holidays
				</Typography>
				<Stack
					direction={"row"}
					sx={{
						bgcolor: "#fff",
						width: "fit-cintent",
						mx: "auto",
						p: 3,
						borderRadius: "15px",
						mt: 3,
					}}
					className="hotel-search-pannel"
					alignItems={"center"}
					// gap={3}
					justifyContent={"space-between"}
				>
					<Autocomplete
						disablePortal
						disableClearable
						openOnFocus
						options={LOCATIONS}
						sx={{ width: 200 }}
						value={LOCATIONS[location]}
						getOptionLabel={(option) => option.city}
						renderInput={(props) => (
							<TextField
								{...props}
								label="Destination"
								variant="standard"
								placeholder="Enter Location"
								InputLabelProps={{ shrink: true }}
							/>
						)}
						ref={locationRef}
						onChange={(e, v) => {
							removeError();
							setLocation(
								v
									? LOCATIONS.findIndex(
											(i) => i.city == v.city
									  )
									: ""
							);
						}}
						renderOption={(props, option) => {
							const { city, state } = option;
							return (
								<Stack
									{...props}
									alignItems={"center"}
									textAlign={"center"}
									sx={{
										width: 320,
										":hover": {
											borderLeft:
												"2px soild #ec5b24 !important",
										},
									}}
								>
									<Typography>{city}</Typography>
									<Typography
										fontSize={14}
										color={"rgba(0,0,0,0.6)"}
									>
										{state}
									</Typography>
								</Stack>
							);
						}}
					/>
					<DatePicker
						ref={checkinRef}
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
						}}
						// slots={{ openPickerIcon: FcCalendar }}
						format="DD/MM/YYYY"
						disablePast
						label="Check-In Date"
						reduceAnimations
						maxDate={new dayjs().add(90, "day")}
						value={checkinDate}
						onChange={(val) => {
							setCheckinDate(val);
							removeError();
						}}
					/>
					<DatePicker
						ref={checkoutRef}
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
						}}
						// slots={{ openPickerIcon: FcCalendar }}
						format="DD/MM/YYYY"
						disablePast
						label="Check-Out Date"
						reduceAnimations
						maxDate={new dayjs().add(90, "day")}
						value={checkoutDate}
						onChange={(val) => {
							setCheckoutDate(val);
							removeError();
						}}
					/>

					<Button
						variant="contained"
						sx={{
							textTransform: "none",
							px: 6,
							py: 1.5,
							fontSize: 20,
							borderRadius: "8px",
						}}
						// onClick={validateAndFetch}
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
							<Typography fontSize={14}>
								{errorMesaage}
							</Typography>
						</Box>
					</Popper>
				</Stack>
				{/* </Stack> */}
			</Container>
			<OffersCarousel />
		</Box>
	);
}
