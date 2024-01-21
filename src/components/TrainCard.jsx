import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
function getFare(type, baseFare) {
	switch (type) {
		case "CC":
			return Math.round(baseFare * 1.25);
		case "2S":
			return Math.round(baseFare * 0.75);
		case "SL":
			return Math.round(baseFare);
		case "1A":
			return Math.round(baseFare * 6);
		case "2A":
			return Math.round(baseFare * 4);
		case "3A":
			return Math.round(baseFare * 2.5);
		case "3E":
			return Math.round(baseFare * 1.75);
	}
	return baseFare;
}
function getDateString(dateObj) {
	return `${dateObj.format("ddd")}, ${dateObj.format("D")} ${dateObj.format(
		"MMM"
	)}`;
}
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function TrainCard({ train, departureDate }) {
	const {
		_id,
		arrivalTime,
		availableSeats,
		coaches,
		daysOfOperation,
		departureTime,
		destination,
		fare,
		source,
		trainName,
		trainNumber,
		trainType,
		travelDuration,
	} = train;
	function getColor(day) {
		if (daysOfOperation.includes(day)) return "rgba(0,0,0,.87)";
		else return "rgba(0,0,0,0.2)";
	}

	const depHour = +departureTime.slice(0, 2);
	const depMin = +departureTime.slice(3, 5);
	const durationHours = +travelDuration.split(" ")[0].slice(0, -1);
	const durationMin = +travelDuration.split(" ")[1].slice(0, -1);
	const depDate = new dayjs(departureDate).hour(depHour).minute(depMin);
	const arrDate = depDate
		.add(durationHours, "hour")
		.add(durationMin, "minute");
	const [isAvailablityBoxVisible, setISAvailablityBoxVisible] =
		useState(false);
	const [cardID, setCardID] = useState(0);
	function handleShowAvailability() {
		setISAvailablityBoxVisible(!isAvailablityBoxVisible);
	}
	return (
		<Stack
			// key={_id}
			sx={{
				my: 2,
				mx: "auto",
				width: "fit-content",
				boxShadow: "0 0 10px rgba(0,0,0,.3)",
				bgcolor: "#fff",
			}}
			divider={<Divider orientation="horizontal" variant="fullwidth" />}
		>
			<Stack
				direction={"row"}
				alignItems={"center"}
				gap={2}
				sx={{ m: 2 }}
				divider={<Divider orientation="vertical" flexItem />}
			>
				<Box>
					<Typography
						sx={{ textTransform: "uppercase" }}
						fontSize={"16px"}
						color="rgb(236, 88, 36)"
						fontWeight={600}
					>
						{trainNumber} {trainName}
					</Typography>
					<Stack
						direction={"row"}
						gap={2}
						sx={{
							color: "rgba(0,0,0,.87)",
							"& p": { fontSize: "12px" },
							mt: 2,
						}}
					>
						<Typography>Runs on:</Typography>
						{weekDays.map((day) => (
							<Typography key={day} color={getColor(day)}>
								{day[0]}
							</Typography>
						))}
						<Box
							sx={{
								width: 5,
								height: 5,
								bgcolor: "#000",
								borderRadius: "50%",
								alignSelf: "center",
							}}
						></Box>
						<Typography>{trainType}</Typography>
					</Stack>
				</Box>
				<Stack
					direction={"row"}
					sx={{ p: 2 }}
					gap={3}
					alignItems={"center"}
				>
					<Stack>
						<Typography
							sx={{
								textTransform: "uppercase",
								fontSize: "14px",
								color: "#ec5b24",
							}}
						>
							{source}
						</Typography>
						<Typography
							sx={{
								color: " rgba(0,0,0,.87)",
								fontWeight: 600,
								fontSize: "20px",
							}}
						>
							{departureTime}
						</Typography>
						<Typography
							sx={{
								color: "rgba(0,0,0,.54)",
								fontWeight: 400,
								fontSize: "12px",
							}}
						>
							{getDateString(depDate)}
						</Typography>
					</Stack>
					<Stack sx={{ width: "130px" }} alignItems={"center"}>
						<Typography>{travelDuration}</Typography>
						<Stack
							justifyContent={"space-between"}
							alignItems={"center"}
							direction={"row"}
							sx={{
								height: "2px",
								bgcolor: "rgb(187, 187, 187) ",
								width: "100%",
							}}
						>
							<div
								style={{
									width: "6px",
									height: "6px",
									borderRadius: "6px",
									backgroundColor: "rgb(117, 117, 117)",
									mt: "-2px",
								}}
							></div>
							<div
								style={{
									width: "6px",
									height: "6px",
									borderRadius: "6px",
									backgroundColor: "rgb(117, 117, 117)",
									mt: "-2px",
								}}
							></div>
						</Stack>
					</Stack>
					<Stack>
						<Typography
							sx={{
								textTransform: "uppercase",
								fontSize: "14px",
								color: "#ec5b24",
							}}
						>
							{destination}
						</Typography>
						<Typography
							sx={{
								color: " rgba(0,0,0,.87)",
								fontWeight: 600,
								fontSize: "20px",
							}}
						>
							{arrivalTime}
						</Typography>
						<Typography
							sx={{
								color: "rgba(0,0,0,.54)",
								fontWeight: 400,
								fontSize: "12px",
							}}
						>
							{getDateString(arrDate)}
						</Typography>
					</Stack>
					<Button
						variant="contained"
						disableRipple
						sx={{
							py: 1,
							px: 2,
							fontWeight: 600,
							fontSize: "12px",
							borderRadius: 0,
						}}
						onClick={handleShowAvailability}
					>
						{isAvailablityBoxVisible ? (
							<>
								Hide Availability{" "}
								<IoIosArrowUp
									size={"20px"}
									fontWeight={"600"}
									style={{ marginLeft: "6px" }}
								/>
							</>
						) : (
							<>
								Show Availability{" "}
								<IoIosArrowDown
									size={"20px"}
									fontWeight={"600"}
									style={{ marginLeft: "6px" }}
								/>
							</>
						)}
					</Button>
				</Stack>
			</Stack>
			<Stack direction={"row"} gap={2} sx={{ m: 2 }}>
				{coaches.map(({ coachType, numberOfSeats }, index) => {
					return (
						<Stack alignItems={"center"} gap={1}>
							<Box
								key={index}
								sx={{
									color: "#559b09",
									bgcolor: "rgba(85,155,9,.08)",
									py: 1,
									px: 3,
									border: "1px solid rgba(85,155,9,.4)",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								<Stack
									direction={"row"}
									alignItems={"center"}
									gap={1}
								>
									<Typography
										color={"rgba(0,0,0,.87)"}
										fontSize={"14px"}
									>
										{coachType}
									</Typography>
									<span
										style={{
											width: "3px",
											height: "3px",
											borderRadius: "5px",
											background: "rgba(0,0,0,.87)",
										}}
									></span>
									<Typography
										color={"rgba(0,0,0,.87)"}
										fontSize={"14px"}
									>
										₹{getFare(coachType, fare)}
									</Typography>
								</Stack>

								<Typography
									fontSize={"16px"}
									color={"green"}
									sx={{
										width: "fit-content",
										mx: "auto",
										mt: "5px",
									}}
								>
									AVL {numberOfSeats}
								</Typography>
							</Box>
							<Typography color={"#757575"} fontSize={"11px"}>
								10 min ago
							</Typography>
						</Stack>
					);
				})}
			</Stack>
			{isAvailablityBoxVisible && (
				<DropDownCard date={depDate} seats={availableSeats} />
			)}
		</Stack>
	);
}
function DropDownCard({ date, seats }) {
	return (
		<Stack
			sx={{
				p: 3,
				background: "#FCF5F2",
				boxShadow: "inset 0 2px 20px rgba(0,0,0,.1)",
			}}
		>
			<Box width={"fit-content"}>
				<Stack
					alignItems={"center"}
					justifyContent={"center"}
					gap={1}
					sx={{
						width: "120px",
						height: "90px",
						background: "#FFF",
						border: "1px solid rgba(236,91,36,.2)",
						bordeRadius: "2px 2px 0 0",
					}}
				>
					<Typography fontSize={"12px"}>
						{getDateString(date)}
					</Typography>
					<Typography
						fontSize={"12px"}
						color={"green"}
						fontWeight={600}
					>
						AVL {seats}
					</Typography>
				</Stack>
				<Button
					disableRipple
					variant="contained"
					sx={{
						width: "100%",
						fontSize: "12px",
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,
					}}
				>
					BOOK
				</Button>
			</Box>
		</Stack>
	);
}
