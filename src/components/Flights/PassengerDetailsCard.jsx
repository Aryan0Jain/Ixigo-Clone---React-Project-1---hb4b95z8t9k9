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
import { useSearchContext } from "../Contexts/SearchProdiver";

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
	titles,
}) {
	const { airports, countries } = useSearchContext();
	return (
		<Stack sx={{ width: 940 }} gap={5}>
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
				<Stack justifyContent={"center"} alignItems={"center"}>
					<img
						src={airlineImg}
						style={{
							width: "50px",
							height:
								airlineName == "AIR INDIA" ? "50px" : "40px",
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
						<Typography fontSize={"14px"} color="rgba(0,0,0,0.7)">
							{source}
						</Typography>
						<Typography
							fontWeight={600}
							variant="h5"
							fontSize={"22px"}
						>
							{departureTime}
						</Typography>
						<Typography fontSize={"12px"} color="rgb(0,0,0,0.5)">
							{depDate.toUTCString().slice(0, 11)}
						</Typography>
						<Typography fontSize={"12px"} color="rgb(0,0,0,0.5)">
							{airports[sourceIndex].city}
						</Typography>
					</Stack>
					{/* <Divider> </Divider> */}
					<Stack textAlign={"left"}>
						<Typography fontSize={"14px"} color="rgba(0,0,0,0.7)">
							{destination}
						</Typography>
						<Typography
							fontWeight={600}
							variant="h5"
							fontSize={"22px"}
						>
							{arrivalTime}
						</Typography>
						<Typography fontSize={"12px"} color="rgb(0,0,0,0.5)">
							{arrDate.toUTCString().slice(0, 11)}
						</Typography>
						<Typography fontSize={"12px"} color="rgb(0,0,0,0.5)">
							{airports[destinationIndex].city}
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
					<Button disableRipple sx={{ fontSize: 16 }}>
						Modify
					</Button>
				</Stack>
			</Stack>
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
										options={titles}
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
										options={countries}
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
