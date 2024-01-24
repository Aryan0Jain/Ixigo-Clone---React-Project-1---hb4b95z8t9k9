import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";

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
				<Stack
					sx={{
						mx: "auto",
						pl: 2,
						p: 2,
						width: "100%",
						flexDirection: "row",
						bgcolor: "#fff",
					}}
					divider={<Divider orientation="vertical" flexItem />}
					gap={4}
				>
					<Stack
						justifyContent={"center"}
						alignItems={"center"}
						direction={"row"}
						gap={1}
					>
						<img
							src={airlineImg}
							style={{
								width: "50px",
								height:
									airlineName == "AIR INDIA"
										? "50px"
										: "40px",
								marginBottom: "10px",
							}}
						/>
						<Stack justifyContent={"center"} alignItems={"center"}>
							<Typography
								fontSize={"12px"}
								color="rgba(0,0,0,0.4)"
							>
								{airlineName}
							</Typography>
							<Typography
								fontSize={"12px"}
								color="rgba(0,0,0,0.4)"
							>
								{flightName}
							</Typography>
						</Stack>
					</Stack>
					<Stack
						divider={
							<Stack alignItems={"center"} gap={1}>
								<Typography
									color="rgb(0,0,0,0.5)"
									fontSize={"12px"}
								>
									{calculatedDuration}
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
											backgroundColor:
												"rgb(117, 117, 117)",
											mt: "-2px",
										}}
									></div>
									<div
										style={{
											width: "6px",
											height: "6px",
											borderRadius: "6px",
											backgroundColor:
												"rgb(117, 117, 117)",
											mt: "-2px",
										}}
									></div>
								</Stack>
								<Typography
									color="rgb(0,0,0,0.5)"
									fontSize={"12px"}
								>
									Stops: {stops}
								</Typography>
							</Stack>
						}
						flexDirection={"row"}
						alignItems={"center"}
						justifyContent={"center"}
					>
						<Stack textAlign={"right"}>
							<Stack direction={"row"} gap={1}>
								<Typography
									fontSize={"18px"}
									color="rgba(0,0,0,0.7)"
								>
									{source}
								</Typography>
								<Typography fontWeight={600} fontSize={"18px"}>
									{departureTime}
								</Typography>
							</Stack>
							<Typography
								fontSize={"12px"}
								color="rgb(0,0,0,0.5)"
							>
								{depDate.toUTCString().slice(0, 11)}
							</Typography>
						</Stack>
						{/* <Divider> </Divider> */}
						<Stack textAlign={"left"}>
							<Stack direction={"row"} gap={1}>
								<Typography
									fontSize={"18px"}
									color="rgba(0,0,0,0.7)"
								>
									{destination}
								</Typography>
								<Typography fontWeight={600} fontSize={"18px"}>
									{arrivalTime}
								</Typography>
							</Stack>
							<Typography
								fontSize={"12px"}
								color="rgb(0,0,0,0.5)"
							>
								{arrDate.toUTCString().slice(0, 11)}
							</Typography>
						</Stack>
					</Stack>
					<Stack
						width="100%"
						direction={"row"}
						alignItems={"center"}
						justifyContent={"space-between"}
					>
						<Typography color="rgba(0,0,0,.64)" fontSize={12}>
							{contactEmail}
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
