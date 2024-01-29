import { Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { AIRPORTS } from "../../../../constants";

export default function FlightCardSummary({
	sourceIndex,
	destinationIndex,
	stops,
	airlineImg,
	airlineName,
	flightName,
	calulatedDuration,
	source,
	destination,
	depDate,
	arrDate,
	arrivalTime,
	departureTime,
	ticketPrice,
	handleBook,
	_id,
}) {
	return (
		<Stack
			sx={{
				mx: "auto",
				pl: 2,
				py: 0,
				minWidth: "500px",
				width: "fit-content",
				flexDirection: "row",
			}}
			divider={<Divider orientation="vertical" flexItem />}
			gap={4}
		>
			<Stack justifyContent={"center"} alignItems={"center"}>
				<img
					src={airlineImg}
					style={{
						width: "50px",
						height: airlineName == "AIR INDIA" ? "50px" : "40px",
						marginBottom: "10px",
					}}
				/>
				<Typography fontSize={"12px"} color="rgba(0,0,0,0.4)">
					{airlineName}
				</Typography>
				<Typography fontSize={"12px"} color="rgba(0,0,0,0.4)">
					{flightName}
				</Typography>
			</Stack>
			<Stack
				divider={
					<Stack alignItems={"center"} gap={1}>
						<Typography color="rgb(0,0,0,0.5)" fontSize={"12px"}>
							{calulatedDuration}
						</Typography>
						<Stack
							justifyContent={"space-between"}
							alignItems={"center"}
							direction={"row"}
							sx={{
								height: "2px",
								bgcolor: "rgb(187, 187, 187) ",
								width: "250px",
								mx: 3,
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
						<Typography color="rgb(0,0,0,0.5)" fontSize={"12px"}>
							Stops: {stops}
						</Typography>
					</Stack>
				}
				flexDirection={"row"}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<Stack textAlign={"right"}>
					<Typography fontSize={"14px"} color="rgba(0,0,0,0.7)">
						{source}
					</Typography>
					<Typography fontWeight={600} variant="h5" fontSize={"22px"}>
						{departureTime}
					</Typography>
					<Typography fontSize={"12px"} color="rgb(0,0,0,0.5)">
						{depDate.toUTCString().slice(0, 11)}
					</Typography>
					<Typography fontSize={"12px"} color="rgb(0,0,0,0.5)">
						{AIRPORTS[sourceIndex].city}
					</Typography>
				</Stack>
				{/* <Divider> </Divider> */}
				<Stack textAlign={"left"}>
					<Typography fontSize={"14px"} color="rgba(0,0,0,0.7)">
						{destination}
					</Typography>
					<Typography fontWeight={600} variant="h5" fontSize={"22px"}>
						{arrivalTime}
					</Typography>
					<Typography fontSize={"12px"} color="rgb(0,0,0,0.5)">
						{arrDate.toUTCString().slice(0, 11)}
					</Typography>
					<Typography fontSize={"12px"} color="rgb(0,0,0,0.5)">
						{AIRPORTS[destinationIndex].city}
					</Typography>
				</Stack>
			</Stack>
			<Stack direction={"row"} alignItems={"center"} gap={5}>
				<Typography fontWeight={600} variant="h5" color={"#ec5b24"}>
					<span style={{ fontWeight: 400 }}>₹</span>
					{ticketPrice}
				</Typography>
				<Button
					onClick={(e) => {
						e.stopPropagation();
						handleBook(_id);
					}}
					sx={{ px: 6, fontWeight: 700 }}
					variant="contained"
				>
					BOOK
				</Button>
			</Stack>
		</Stack>
	);
}
