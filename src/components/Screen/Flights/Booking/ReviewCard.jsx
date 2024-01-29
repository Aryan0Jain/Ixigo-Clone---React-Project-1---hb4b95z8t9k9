import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import FlightDetailsTab from "../Search/FlightDetailsTab";
import { AIRPORTS } from "../../../../constants";

export default function ReviewCard({
	sourceIndex,
	destinationIndex,
	flightID,
	source,
	destination,
	departureTime,
	arrivalTime,
	duration,
	ticketPrice,
	searchParams,
	user,
	contactEmailRef,
	billingAddressRef,
	pincodeRef,
	setAnchorEl,
}) {
	return (
		<Stack
			sx={{ width: "fit-content" }}
			gap={3}
			className="flight-booking-page"
		>
			<Box
				sx={{
					bgcolor: "#E1E1E1",
					boxShadow: "0 0 10px rgba(0,0,0,.3)",
				}}
			>
				<Typography
					sx={{ ml: 3, my: 2 }}
					color="rgba(0,0,0,.64)"
					fontWeight={600}
					fontSize={14}
				>
					{AIRPORTS[sourceIndex].city} to{" "}
					{AIRPORTS[destinationIndex].city}
				</Typography>
				<FlightDetailsTab
					{...{
						flightID,
						source,
						destination,
						departureTime,
						arrivalTime,
						duration,
						ticketPrice,
						searchParams,
					}}
				/>
				<Stack direction={"row"} gap={10} sx={{ p: 3 }}>
					<Stack>
						<Typography
							color="rgba(0,0,0,0.54)"
							fontWeight={700}
							fontSize={12}
						>
							BAGGAGE
						</Typography>
						<Typography
							color={"rgba(0,0,0,.87)"}
							fontSize={18}
							fontWeight={600}
						>
							{source}-{destination}
						</Typography>
					</Stack>
					<Stack>
						<Typography
							color="rgba(0,0,0,.54)"
							fontSize={14}
							fontWeight={600}
						>
							CHECK-IN
						</Typography>
						<Typography
							color={"rgba(0,0,0,.54)"}
							fontSize={14}
							fontWeight={600}
						>
							{ticketPrice <= 2250
								? "15 kilograms (1 piece per pax)"
								: "20 kilograms (1 piece per pax)"}
						</Typography>
					</Stack>
					<Stack>
						<Typography
							color="rgba(0,0,0,.54)"
							fontSize={14}
							fontWeight={600}
						>
							CABIN
						</Typography>
						<Typography
							color={"rgba(0,0,0,.54)"}
							fontSize={14}
							fontWeight={600}
						>
							{ticketPrice <= 2250
								? "7 kg (1 piece per pax)"
								: "10 kg (1 piece per pax)"}
						</Typography>
					</Stack>
				</Stack>
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
					color={"rgba(0,0,0,.38)"}
					fontSize={14}
					fontWeight={400}
				>
					<span
						style={{
							color: "rgba(0,0,0,.64)",
							fontWeight: 600,
						}}
					>
						Contact Details
					</span>{" "}
					(Your ticket and flight info will be sent here)
				</Typography>
				<Stack sx={{ pl: 3, py: 2, bgcolor: "#fff" }} direction={"row"}>
					<TextField
						label="Email Address"
						variant="standard"
						defaultValue={user.email}
						InputLabelProps={{ shrink: true }}
						inputRef={contactEmailRef}
						onChange={() => setAnchorEl(null)}
					/>
				</Stack>
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
					Billing Address
				</Typography>
				<Stack
					sx={{ pl: 3, py: 2, bgcolor: "#fff" }}
					direction={"row"}
					gap={3}
				>
					<TextField
						label="Pincode"
						required
						variant="standard"
						defaultValue={400000}
						InputLabelProps={{ shrink: true }}
						inputRef={pincodeRef}
						InputProps={{ type: "number" }}
						onChange={() => setAnchorEl(null)}
					/>
					<TextField
						sx={{ width: 500 }}
						label="Address"
						variant="standard"
						placeholder="Enter Billing Address"
						InputLabelProps={{ shrink: true }}
						inputRef={billingAddressRef}
						onChange={() => setAnchorEl(null)}
					/>
				</Stack>
			</Box>
		</Stack>
	);
}
