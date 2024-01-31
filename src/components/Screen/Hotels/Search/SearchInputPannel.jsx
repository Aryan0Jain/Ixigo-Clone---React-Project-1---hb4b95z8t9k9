import {
	Autocomplete,
	Box,
	Button,
	ClickAwayListener,
	Popper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { LOCATIONS } from "../../../../constants";
import { DatePicker } from "@mui/x-date-pickers";
import { BiSolidError } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { useHotelSearchContext } from "../../../../Contexts/HotelSearchProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
const buttonProps = {
	disableRipple: true,
	sx: {
		p: 0,
		m: 0,
		minWidth: 0,
		minHeight: 0,
	},
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
	left: -2,
	mt: "8px",
	borderBottomRightRadius: "5px",
	borderBottomLeftRadius: "5px",
};
export default function SearchInputPannel({
	guests,
	setGuests,
	rooms,
	setRooms,
}) {
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
	const roomsRef = useRef();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	const [searchParams] = useSearchParams();
	const [openRoomsAndGuestPopper, setOpenRoomsAndGuestPopper] =
		useState(false);
	function handleOpenRnG() {
		setOpenRoomsAndGuestPopper(true);
	}
	function handleCloseRnG() {
		setOpenRoomsAndGuestPopper(false);
	}
	function removeError() {
		setErrorMessage("");
		setAnchorEl(null);
	}
	function validateAndFetch() {
		if (!checkinDate) {
			setErrorMessage("Please Enter A Check-in Date!");
			setAnchorEl(checkinRef.current);
			return;
		}
		if (checkinDate.$d == "Invalid Date") {
			setErrorMessage("Please Enter A Valid Check-in Date!");
			setAnchorEl(checkinRef.current);
			return;
		}
		let difference = checkinDate.diff(new dayjs().hour(0).minute(0));
		if (difference < 0 || difference > 364 * 24 * 3600 * 1000) {
			setErrorMessage("Check-in Date is out of Range!");
			setAnchorEl(checkinRef.current);
			return;
		}
		if (!checkoutDate) {
			setErrorMessage("Please Enter A Check-out Date!");
			setAnchorEl(checkoutRef.current);
			return;
		}
		if (checkoutDate.$d == "Invalid Date") {
			setErrorMessage("Please Enter A Valid Check-out Date!");
			setAnchorEl(checkoutRef.current);
			return;
		}

		difference = checkoutDate.diff(checkinDate.add(1, "day"));
		if (difference < 0) {
			setErrorMessage("Check-out Cannot be before Check-in!");
			setAnchorEl(checkoutRef.current);
			return;
		}
		if (difference > 365 * 24 * 3600 * 1000) {
			setErrorMessage("Check-out date is out of range!");
			setAnchorEl(checkoutRef.current);
			return;
		}
		setAnchorEl(null);
		const checkin = checkinDate.toJSON();
		const checkout = checkoutDate.toJSON();
		const destination = LOCATIONS[location].city;
		const url = `/hotels/search?location=${destination}&from=${checkin}&to=${checkout}&guests=${guests}&rooms=${rooms}`;
		// console.log(url);
		navigate(url);
	}
	useEffect(() => window.scrollTo(0, 0), []);
	useEffect(() => {
		setCheckinDate(new dayjs(searchParams.get("from")));
		setCheckoutDate(new dayjs(searchParams.get("to")));
		setLocation(
			LOCATIONS.findIndex(
				(item) => item.city === searchParams.get("location")
			)
		);
		setGuests(+searchParams.get("guests"));
		setRooms(+searchParams.get("rooms"));
		window.scrollTo(0, 0);
	}, []);
	return (
		<Stack
			direction={"row"}
			sx={{
				bgcolor: "#fff",
				width: "fit-cintent",
				mx: "auto",
				py: 1,
				// px: 3,
				mt: 3,
				zIndex: 1150,
				position: "sticky",
				top: "66px",
			}}
			alignItems={"center"}
			gap={3}
			justifyContent={"center"}
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
						// variant="standard"
						placeholder="Enter Location"
						InputLabelProps={{ shrink: true }}
					/>
				)}
				ref={locationRef}
				onChange={(e, v) => {
					removeError();
					setLocation(
						v ? LOCATIONS.findIndex((i) => i.city == v.city) : ""
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
							}}
						>
							<Typography>{city}</Typography>
							<Typography fontSize={14} color={"rgba(0,0,0,0.6)"}>
								{state}
							</Typography>
						</Stack>
					);
				}}
			/>
			<DatePicker
				ref={checkinRef}
				sx={{
					width: 180,
				}}
				slotProps={{
					textField: {
						InputLabelProps: { shrink: true },
					},
				}}
				format="DD MMM, ddd"
				disablePast
				label="Check-In Date"
				reduceAnimations
				maxDate={new dayjs().add(364, "day")}
				value={checkinDate}
				onChange={(val) => {
					setCheckinDate(val);
					if (checkoutDate.diff(val) <= 0) {
						setCheckoutDate(val.add(1, "day"));
					}
					removeError();
				}}
			/>
			<DatePicker
				ref={checkoutRef}
				sx={{
					width: 180,
				}}
				slotProps={{
					textField: {
						InputLabelProps: { shrink: true },
					},
				}}
				format="DD MMM, ddd"
				// disablePast
				minDate={checkinDate.add(1, "day")}
				label="Check-Out Date"
				reduceAnimations
				maxDate={new dayjs().add(365, "day")}
				value={checkoutDate}
				onChange={(val) => {
					setCheckoutDate(val);
					removeError();
				}}
			/>
			<ClickAwayListener onClickAway={handleCloseRnG}>
				<Box
					ref={roomsRef}
					onClick={handleOpenRnG}
					sx={{
						width: 180,
						textAlign: "center",
						mt: "-8px",
					}}
				>
					<fieldset
						style={{
							borderRadius: "4px",
							border: openRoomsAndGuestPopper
								? "2px solid #0770e4"
								: "1px solid rgba(0,0,0,0.2)",
							padding: "8px 5px 14px",
						}}
					>
						<legend
							style={{
								fontSize: 12,
								color: openRoomsAndGuestPopper
									? "#0770e4"
									: "rgba(0, 0, 0, 0.6)",
								textAlign: "left",
								marginLeft: "3px",
							}}
						>
							Rooms & Guests
						</legend>
						<Typography>
							{rooms} Rooms, {guests} Guests
						</Typography>
					</fieldset>
					<Popper
						anchorEl={roomsRef.current}
						open={openRoomsAndGuestPopper}
						sx={{
							bgcolor: "#fff",
							position: "absolute",
							p: 2,
							boxShadow:
								"0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
							borderRadius: "5px",
							mt: "20px !important",
						}}
					>
						<Stack sx={{ width: 280 }} gap={2}>
							<Stack
								direction={"row"}
								justifyContent={"space-between"}
							>
								<Stack
									direction={"row"}
									alignItems={"center"}
									gap={0.5}
								>
									<BsDoorOpen size={20} />
									<Stack>
										<Typography
											fontSize={14}
											fontWeight={600}
										>
											Rooms
										</Typography>
										<Typography fontSize={12}>
											Minimum 1
										</Typography>
									</Stack>
								</Stack>
								<Stack
									direction={"row"}
									alignItems={"center"}
									sx={{
										color: "#ec5b24",
										fontWeight: 600,
										border: "2px solid #ec5b24",
										borderRadius: "8px",
										px: 1,
										textAlign: "center",
									}}
									gap={1}
								>
									<Button
										{...buttonProps}
										onClick={() =>
											setRooms((prev) => prev - 1)
										}
										disabled={rooms === 1}
									>
										<FiMinus
											size={20}
											style={{
												padding: 0,
												margin: 0,
											}}
										/>
									</Button>
									<Typography
										fontWeight={500}
										sx={{ width: 18 }}
									>
										{rooms}
									</Typography>
									<Button
										{...buttonProps}
										onClick={() =>
											setRooms((prev) => {
												if (prev + 1 > guests)
													setGuests(prev + 1);
												return prev + 1;
											})
										}
										disabled={rooms === 20}
									>
										<FiPlus
											size={20}
											style={{
												paddding: 0,
												margin: 0,
											}}
										/>
									</Button>
								</Stack>
							</Stack>
							<Stack
								direction={"row"}
								justifyContent={"space-between"}
							>
								<Stack
									direction={"row"}
									alignItems={"center"}
									gap={0.5}
								>
									<MdOutlinePeopleAlt size={20} />
									<Stack>
										<Typography
											fontSize={14}
											fontWeight={600}
										>
											Guests
										</Typography>
										<Typography fontSize={12}>
											Including Children
										</Typography>
									</Stack>
								</Stack>
								<Stack
									direction={"row"}
									alignItems={"center"}
									sx={{
										color: "#ec5b24",
										fontWeight: 600,
										border: "2px solid #ec5b24",
										borderRadius: "8px",
										px: 1,
										textAlign: "center",
									}}
									gap={1}
								>
									<Button
										{...buttonProps}
										onClick={() =>
											setGuests((prev) => prev - 1)
										}
										disabled={guests === rooms}
									>
										<FiMinus
											size={20}
											style={{
												padding: 0,
												margin: 0,
											}}
										/>
									</Button>
									<Typography
										fontWeight={500}
										sx={{ width: 18 }}
									>
										{guests}
									</Typography>
									<Button
										{...buttonProps}
										onClick={() =>
											setGuests((prev) => prev + 1)
										}
										disabled={guests === 100}
									>
										<FiPlus
											size={20}
											style={{
												paddding: 0,
												margin: 0,
											}}
										/>
									</Button>
								</Stack>
							</Stack>
							<Button
								variant="contained"
								onClick={(e) => {
									e.stopPropagation();
									handleCloseRnG();
								}}
							>
								Done
							</Button>
						</Stack>
					</Popper>
				</Box>
			</ClickAwayListener>

			<Button
				variant="contained"
				sx={{
					textTransform: "none",
					px: 6,
					py: 1.5,
					fontSize: 20,
					borderRadius: "8px",
					boxShadow: "none",
					bgcolor: "rgb(252, 121, 13)",
					":hover": {
						boxShadow: "none",
						bgcolor: "rgb(253, 148, 61)",
					},
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
					<BiSolidError size="17px" style={{ marginRight: "5px" }} />{" "}
					<Typography fontSize={14}>{errorMesaage}</Typography>
				</Box>
			</Popper>
		</Stack>
	);
}
