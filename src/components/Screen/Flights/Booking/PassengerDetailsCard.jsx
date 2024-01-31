import {
	Autocomplete,
	Box,
	Button,
	Divider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { AIRPORTS, COUNTRIES, TITLES } from "../../../../constants";
import FlightInfoCard from "./FlightInfoCard";
export default function PassengerDetailsCard({
	airlineImg,
	airlineName,
	flightName,
	calculatedDuration,
	depDate,
	arrDate,
	source,
	destination,
	stops,
	departureTime,
	arrivalTime,
	sourceIndex,
	destinationIndex,
	contactEmail,
	passengerDetails,
	passgengerIDs,
	setAnchorEl,
	setPassengerDetails,
}) {
	return (
		<Stack sx={{ width: 940 }} gap={5}>
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
					Enter traveller details
				</Typography>
				<Stack
					sx={{
						bgcolor: "#fff",
						p: 3,
						"& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
							{
								borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
							},
					}}
					gap={4}
				>
					{passengerDetails.map(({ id }, i) => {
						return (
							<Box key={i}>
								<Typography
									color="rgba(0,0,0,.87)"
									fontSize={16}
									fontWeight={600}
								>
									Passenger {id}
								</Typography>
								<Stack
									direction={"row"}
									columnGap={4}
									rowGap={2}
									sx={{ mt: 2 }}
									flexWrap={"wrap"}
								>
									<Autocomplete
										options={TITLES}
										componentsProps={{
											paper: {
												sx: {
													position: "absolute",
													width: 100,
													left: 100,
												},
											},
										}}
										getOptionLabel={(option) => option}
										renderInput={(params) => (
											<TextField
												{...params}
												sx={{
													width: 120,
												}}
												variant="standard"
												label="Title"
												InputLabelProps={{
													shrink: true,
													style: {
														color: "rgba(0,0,0,.38)",
													},
												}}
												placeholder="Title"
											/>
										)}
										sx={{
											"& input": {
												fontSize: 14,
											},
										}}
										id={passgengerIDs[i].titleID}
										onChange={(e, v) => {
											setAnchorEl(null);
											setPassengerDetails((prev) => {
												const newDetails = [...prev];
												newDetails[i].title = v;
												return newDetails;
											});
										}}
									/>
									<TextField
										variant="standard"
										label="First Name"
										placeholder="First Name & Middle Name(if any)"
										InputLabelProps={{
											shrink: true,
											style: {
												color: "rgba(0,0,0,.38)",
											},
										}}
										sx={{
											width: 240,
											"& input": {
												fontSize: 14,
											},
										}}
										id={passgengerIDs[i].firstNameID}
										onChange={(e) => {
											setAnchorEl(null);
											setPassengerDetails((prev) => {
												const newDetails = [...prev];
												newDetails[i].firstName =
													e.target.value;
												return newDetails;
											});
										}}
									/>
									<TextField
										variant="standard"
										label="Last Name"
										placeholder="Last Name"
										InputLabelProps={{
											shrink: true,
											style: {
												color: "rgba(0,0,0,.38)",
											},
										}}
										sx={{
											width: 240,
											"& input": {
												fontSize: 14,
											},
										}}
										id={passgengerIDs[i].lastNameID}
										onChange={(e) => {
											setAnchorEl(null);
											setPassengerDetails((prev) => {
												const newDetails = [...prev];
												newDetails[i].lastName =
													e.target.value;
												return newDetails;
											});
										}}
									/>
									<Autocomplete
										options={COUNTRIES}
										getOptionLabel={(option) => option}
										renderInput={(params) => (
											<TextField
												{...params}
												sx={{
													width: 320,
												}}
												variant="standard"
												label="Nationality"
												InputLabelProps={{
													shrink: true,
													style: {
														color: "rgba(0,0,0,.38)",
													},
												}}
												placeholder="Select Country"
											/>
										)}
										sx={{
											"& input": {
												fontSize: 14,
											},
										}}
										id={passgengerIDs[i].nationalityID}
										onChange={(e, v) => {
											setAnchorEl(null);
											setPassengerDetails((prev) => {
												const newDetails = [...prev];
												newDetails[i].nationality = v;
												return newDetails;
											});
										}}
									/>
								</Stack>
							</Box>
						);
					})}
				</Stack>
			</Box>
		</Stack>
	);
}
