import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import FlightInfoCard from "./FlightInfoCard";

export default function ReviewAndPay({
	airlineImg,
	airlineName,
	flightName,
	calculatedDuration,
	stops,
	source,
	departureTime,
	depDate,
	destination,
	arrivalTime,
	arrDate,
	contactEmail,
	travellers,
	passengerDetails,
	handlePayButton,
	ticketPrice,
	extraCharges,
}) {
	return (
		<Stack sx={{ width: 940 }} gap={5}>
			<Box
				sx={{
					bgcolor: "#E1E1E1",
					width: "100%",
					boxShadow: "0 0 10px rgba(0,0,0,.3)",
				}}
			>
				<FlightInfoCard
					{...{
						airlineImg,
						airlineName,
						flightName,
						calculatedDuration,
						stops,
						source,
						depDate,
						departureTime,
						destination,
						arrDate,
						arrivalTime,
						contactEmail,
					}}
				/>
			</Box>
			<Box
				sx={{
					bgcolor: "#E1E1E1",
					width: "100%",
					boxShadow: "0 0 10px rgba(0,0,0,.3)",
				}}
			>
				<Typography
					sx={{ ml: 3, my: 2 }}
					color="rgba(0,0,0,.64)"
					fontWeight={600}
					fontSize={14}
				>
					Travellers ({travellers})
				</Typography>
				<Stack sx={{ bgcolor: "#fff", p: 3 }} gap={4}>
					{passengerDetails.map(
						({ id, title, firstName, lastName, nationality }) => {
							return (
								<Typography
									key={id}
									fontSize={16}
									color="rgba(0,0,0,.64)"
								>
									{id}. {title}. {firstName} {lastName} -{" "}
									<span
										style={{
											color: "rgba(0,0,0,.38)",
										}}
									>
										{nationality}
									</span>
								</Typography>
							);
						}
					)}
				</Stack>
			</Box>
			<Stack width={"100%"}>
				<Button
					variant="contained"
					disableRipple
					sx={{
						my: 2,
						mx: "auto",
						py: 1,
						px: 3,
						fontSize: 18,
						fontWeight: 600,
					}}
					onClick={handlePayButton}
				>
					Confirm And Pay: ₹{travellers * ticketPrice + extraCharges}
				</Button>
			</Stack>
		</Stack>
	);
}
