import React from "react";
import { useSearchContext } from "../Contexts/SearchProdiver";
import AILogo from "../../assests/images/airlines/AI.png";
import INLogo from "../../assests/images/airlines/6E.png";
import G8Logo from "../../assests/images/airlines/G8.png";
import SGLogo from "../../assests/images/airlines/SG.png";
import UKLogo from "../../assests/images/airlines/UK.png";
import { SlClock } from "react-icons/sl";
import { FaWifi } from "react-icons/fa";
import { FaPlug } from "react-icons/fa";
import { IoMdRestaurant } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { Divider, Stack, Typography } from "@mui/material";
export default function FlightDetailsTab({
	flightID,
	source,
	destination,
	departureTime,
	arrivalTime,
	duration,
	ticketPrice,
	searchParams,
}) {
	let airlineImg, airlineName, flightName;
	const { airports } = useSearchContext();
	const sourceIndex = airports.findIndex((item) => item.iata_code == source);
	const destinationIndex = airports.findIndex(
		(item) => item.iata_code == destination
	);
	const depDate = new Date(searchParams.get("date"));
	depDate.setHours(
		+departureTime.slice(0, 2) + 5 + (+departureTime.slice(3, 5) + 30) / 60,
		(+departureTime.slice(3, 5) + 30) % 60
	);
	const arrDate = new Date(depDate.getTime() + duration * 60 * 60 * 1000);
	const calulatedDuration = ("" + duration).padStart(2, "0") + "hr 00min";
	switch (flightID.slice(0, 2).toUpperCase()) {
		case "6E":
			airlineImg = INLogo;
			airlineName = "INDIGO";
			flightName = "6E" + flightID.split("-")[2];
			break;
		case "AI":
			airlineImg = AILogo;
			airlineName = "AIR INDIA";
			flightName = "AI" + flightID.split("-")[2];
			break;
		case "G8":
			airlineImg = G8Logo;
			airlineName = "GO FIRST";
			flightName = "GO" + flightID.split("-")[2];
			break;
		case "SG":
			airlineImg = SGLogo;
			airlineName = "SPICE JET";
			flightName = "SG" + flightID.split("-")[2];
			break;
		case "UK":
			airlineImg = UKLogo;
			airlineName = "VISTARA";
			flightName = "UK" + flightID.split("-")[2];
			break;
	}
	return (
		<Stack
			divider={<Divider orientation="horizontal" flexItem />}
			sx={{ bgcolor: "white" }}
		>
			<Stack
				direction={"row"}
				sx={{ p: 2 }}
				alignItems="center"
				gap={2}
				divider={
					<div
						style={{
							width: "5px",
							height: "5px",
							verticalAlign: "middle",
							borderRadius: "50%",
							backgroundColor: "#000000",
						}}
					></div>
				}
			>
				<img
					src={airlineImg}
					style={{
						width: "25px",
						height: airlineName == "AIR INDIA" ? "25px" : "20px",
					}}
				/>
				<Typography fontSize={"14px"}>
					{airlineName} {flightID}
				</Typography>
				<Typography fontSize={"14px"}>Economy</Typography>
			</Stack>
			<Stack direction={"row"} sx={{ p: 2 }} gap={3}>
				<Stack>
					<Typography fontSize={"26px"}>
						{source}{" "}
						<span
							style={{
								fontWeight: 600,
							}}
						>
							{departureTime}
						</span>
					</Typography>
					<Typography color="rgba(0,0,0,0.38)" fontSize={"14px"}>
						{depDate.toUTCString().slice(0, 11)}
					</Typography>
					<Typography fontSize={"12px"} color="rgba(0,0,0,.38)">
						{airports[sourceIndex].name}
					</Typography>
					<Typography fontSize={"12px"} color="rgba(0,0,0,.38)">
						{airports[sourceIndex].city}
					</Typography>
				</Stack>
				<Stack alignItems={"center"} justifyContent={"center"}>
					<SlClock size={"24px"} color="rgba(0,0,0,0.3)" />
					<Typography fontSize="14px" color="rgba(0,0,0,.38)">
						{calulatedDuration}
					</Typography>
				</Stack>
				<Stack>
					<Typography fontSize={"26px"}>
						{destination}{" "}
						<span
							style={{
								fontWeight: 600,
							}}
						>
							{arrivalTime}
						</span>
					</Typography>
					<Typography color="rgba(0,0,0,0.38)" fontSize={"14px"}>
						{arrDate.toUTCString().slice(0, 11)}
					</Typography>
					<Typography fontSize={"12px"} color="rgba(0,0,0,.38)">
						{airports[destinationIndex].name}
					</Typography>
					<Typography fontSize={"12px"} color="rgba(0,0,0,.38)">
						{airports[destinationIndex].city}
					</Typography>
				</Stack>
				<Divider orientation="vertical" flexItem />
				<Stack>
					<Stack direction={"row"}>
						<Stack
							direction={"row"}
							gap={2}
							alignItems={"center"}
							width={"125px"}
							height={"40px"}
							color={
								ticketPrice >= 2250 && duration >= 4
									? "black"
									: "rgba(0,0,0,0.38)"
							}
						>
							<FaWifi /> Wifi
						</Stack>
						<Stack
							direction={"row"}
							gap={2}
							alignItems={"center"}
							width={"170px"}
							height={"40px"}
							color={
								ticketPrice >= 2400
									? "black"
									: "rgba(0,0,0,0.38)"
							}
						>
							<FaPlug /> In-seat Power
						</Stack>
					</Stack>
					<Stack direction={"row"}>
						<Stack
							direction={"row"}
							gap={2}
							alignItems={"center"}
							width={"125px"}
							height={"40px"}
							color={duration >= 6 ? "black" : "rgba(0,0,0,0.38)"}
						>
							<IoMdRestaurant /> Food
						</Stack>
						<Stack
							direction={"row"}
							gap={2}
							alignItems={"center"}
							width={"170px"}
							height={"40px"}
							color={
								ticketPrice >= 2100
									? "black"
									: "rgba(0,0,0,0.38)"
							}
						>
							<FaYoutube /> On demand video
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
}
