import React, { useRef, useState } from "react";
import {
	Box,
	Button,
	ClickAwayListener,
	Container,
	Divider,
	IconButton,
	Paper,
	Popper,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { BiSolidBlanket } from "react-icons/bi";
import { FaBottleWater } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { FaPlug } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { GiRoundStar } from "react-icons/gi";
const facilities = [
	{ type: "Blanket", svg: BiSolidBlanket },
	{ type: "Water Bottle", svg: FaBottleWater },
	{ type: "WiFi", svg: FaWifi },
	{ type: "Charging Point", svg: FaPlug },
	{ type: "Snack Box", svg: IoFastFood },
];
export default function BusCard({ busDetails, departureDate, handleBook }) {
	const {
		amenities,
		arrivalTime,
		available,
		departureTime,
		destination,
		fare,
		name,
		seats,
		source,
		type,
		_id,
	} = busDetails;
	const rating = amenities.length;
	const from = source.split(",")[0];
	const to = destination.split(",")[0];
	const [open, setOpen] = useState(false);
	const amenitiesRef = useRef();

	const depDate = departureDate
		.hour(+departureTime.slice(0, 2))
		.minute(+departureTime.slice(3, 5));
	let arrDate = depDate
		.hour(+arrivalTime.slice(0, 2))
		.minute(+arrivalTime.slice(3, 5));
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
	function toggleButton() {
		setOpen((prev) => !prev);
	}
	function handleClose() {
		setOpen(false);
	}
	return (
		<Stack
			sx={{
				bgcolor: "#FFF",
				p: 2,
				borderRadius: "8px",
				":hover": { boxShadow: "0 0 10px 0px rgba(0,0,0,0.2)" },
			}}
		>
			<Stack direction={"row"} alignItems={"center"} gap={2}>
				<Stack sx={{ width: "30%" }} gap={0.5}>
					<Typography fontSize={18} fontWeight={600}>
						{name}
					</Typography>
					<Typography fontSize={14} color="#b0b0b0">
						{type}
					</Typography>
					{/* <Stack direction={"row"}>
						{amenities.map((cur) => {
							const Icon =
								facilities[
									facilities.findIndex(
										(item) => item.type == cur
									)
								].svg;
							const title = (
								<Box
									sx={{
										bgcolor: "#fff",
										filter: "drop-shadow(0 0px 10px rgba(0, 0, 0, .5))",
										borderRadius: "8px",
									}}
								>
									<Typography
										color={"rgba(0,0,0,0.85)"}
										fontSize={12}
										sx={{ p: 1 }}
									>
										{cur}
									</Typography>
								</Box>
							);
							return (
								<Tooltip key={cur} title={title} color="black">
									<IconButton disableRipple>
										<Icon color="#ec5b24" />
									</IconButton>
								</Tooltip>
							);
						})}
					</Stack> */}
					<Stack direction={"row"} gap={2} sx={{ mt: 1 }}>
						<Stack
							direction={"row"}
							alignItems={"center"}
							gap={0.5}
							sx={{
								py: 0.75,
								px: 1,
								bgcolor: `${
									rating >= 4
										? "#61b00f"
										: rating >= 2
										? "#ffa800"
										: "red"
								}`,
								color: "#fff",
								width: "fit-content",
								fontSize: 14,
								borderRadius: "4px",
							}}
						>
							<GiRoundStar size={12} />
							{rating}
						</Stack>
						<Button
							// variant="contained"
							sx={{ width: "fit-content", fontSize: 12, p: 0 }}
							disableRipple
							ref={amenitiesRef}
							onClick={toggleButton}
						>
							Amenities{" "}
							<IoIosArrowDown
								size={16}
								style={{
									marginLeft: "5px",
									transform: `rotate(${
										open ? "180deg" : "0deg"
									})`,
									transition: "transform 150ms",
								}}
							/>
						</Button>
						<Popper
							placement="bottom-start"
							open={open}
							anchorEl={amenitiesRef.current}
						>
							<Paper
								sx={{
									m: 0,
									p: 0,
									boxShadow: "0 0 10px 1px rgba(0,0,0,0.2)",
								}}
							>
								<ClickAwayListener onClickAway={handleClose}>
									<Stack
										direction={"row"}
										gap={2}
										sx={{ px: 2, py: 0.5 }}
									>
										{amenities.map((cur) => {
											const Icon =
												facilities[
													facilities.findIndex(
														(item) =>
															item.type == cur
													)
												].svg;
											return (
												<Stack
													key={cur}
													direction={"row"}
													gap={0.75}
													alignItems={"center"}
													sx={{ fontSize: 12 }}
												>
													<Icon color="#ec5b24" />
													<Typography>
														{cur}
													</Typography>
												</Stack>
											);
										})}
									</Stack>
								</ClickAwayListener>
							</Paper>
						</Popper>
					</Stack>
				</Stack>
				<Stack sx={{ width: "120px" }}>
					<Typography fontSize={14} color="#868686">
						{depDate.format("DD MMM")}
					</Typography>
					<Typography fontSize={18} fontWeight={600}>
						{departureTime}
					</Typography>
					<Typography fontSize={14} fontWeight={400} color="#868686">
						{from}
					</Typography>
				</Stack>
				<Divider
					orientation="horizontal"
					sx={{
						width: 150,
						"::before": {
							borderTopStyle: "dashed",
							borderTopWidth: "2px",
							borderColor: "#d1d1d1",
						},
						"::after": {
							borderTopStyle: "dashed",
							borderTopWidth: "2px",
							borderColor: "#d1d1d1",
						},
					}}
				>
					<Typography
						fontSize={12}
						color={"#444"}
						sx={{
							border: "1px solid #d1d1d1",
							borderRadius: "4px",
							px: 0.5,
							py: 0.25,
							":hover": { color: "#919191" },
						}}
					>
						{durationString}
					</Typography>
				</Divider>
				<Stack textAlign={"right"} sx={{ width: "120px" }}>
					<Typography fontSize={14} color="#868686">
						{arrDate.format("DD MMM")}
					</Typography>
					<Typography fontSize={18} fontWeight={600}>
						{arrivalTime}
					</Typography>
					<Typography fontSize={14} fontWeight={400} color="#868686">
						{to}
					</Typography>
				</Stack>
				<Stack alignItems={"flex-end"} gap={0.5}>
					<Typography fontSize={20} fontWeight={600} color="#212121">
						₹{fare}
					</Typography>
					<Button
						variant="contained"
						disableRipple
						sx={{
							px: 3,
							textTransform: "none",
							width: "fit-content",
						}}
						onClick={() => handleBook(_id)}
					>
						Book
					</Button>
					<Typography fontSize={13} color="#868686">
						{seats} seats Available
					</Typography>
				</Stack>
			</Stack>
			<Box></Box>
		</Stack>
	);
}
