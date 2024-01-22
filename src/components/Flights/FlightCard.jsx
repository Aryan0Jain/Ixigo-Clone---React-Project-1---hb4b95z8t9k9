import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AILogo from "../../assests/images/airlines/AI.png";
import INLogo from "../../assests/images/airlines/6E.png";
import G8Logo from "../../assests/images/airlines/G8.png";
import SGLogo from "../../assests/images/airlines/SG.png";
import UKLogo from "../../assests/images/airlines/UK.png";
import { MdExpandMore } from "react-icons/md";
import { SlClock } from "react-icons/sl";
import { FaWifi } from "react-icons/fa";
import { FaPlug } from "react-icons/fa";
import { IoMdRestaurant } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";

export default function FlightCard({
	_id,
	flightID,
	source,
	destination,
	departureTime,
	arrivalTime,
	duration,
	stops,
	ticketPrice,
	searchParams,
}) {
	const [detailTab, setDetailTab] = useState(0);
	let airlineImg, airlineName, flightName;
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
		<Accordion
			disableGutters
			key={_id}
			sx={{
				mx: "auto",
				width: "fit-content",
			}}
		>
			<AccordionSummary
				sx={{ p: 0, my: 0 }}
				expandIcon={
					<MdExpandMore
						style={{
							width: "30px",
							height: "30px",
							marginRight: "10px",
							marginLeft: "10px",
						}}
					/>
				}
			>
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
								height:
									airlineName == "AIR INDIA"
										? "50px"
										: "40px",
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
									{calulatedDuration}
								</Typography>
								<Divider
									component={Box}
									width="250px"
									height="1px"
									textAlign="center"
									variant="middle"
									sx={{
										borderWidth: "1px",
										borderColor: "rgb(187, 187, 187)",
									}}
								></Divider>
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
							<Typography
								fontSize={"14px"}
								color="rgba(0,0,0,0.7)"
							>
								{source}
							</Typography>
							<Typography
								fontWeight={600}
								variant="h5"
								fontSize={"22px"}
							>
								{departureTime}
							</Typography>
							<Typography
								fontSize={"12px"}
								color="rgb(0,0,0,0.5)"
							>
								{depDate.toUTCString().slice(0, 11)}
							</Typography>
							<Typography
								fontSize={"12px"}
								color="rgb(0,0,0,0.5)"
							>
								{airports[sourceIndex].city}
							</Typography>
						</Stack>
						{/* <Divider> </Divider> */}
						<Stack textAlign={"left"}>
							<Typography
								fontSize={"14px"}
								color="rgba(0,0,0,0.7)"
							>
								{destination}
							</Typography>
							<Typography
								fontWeight={600}
								variant="h5"
								fontSize={"22px"}
							>
								{arrivalTime}
							</Typography>
							<Typography
								fontSize={"12px"}
								color="rgb(0,0,0,0.5)"
							>
								{arrDate.toUTCString().slice(0, 11)}
							</Typography>
							<Typography
								fontSize={"12px"}
								color="rgb(0,0,0,0.5)"
							>
								{airports[destinationIndex].city}
							</Typography>
						</Stack>
					</Stack>
					<Stack direction={"row"} alignItems={"center"} gap={3}>
						<Typography
							fontWeight={600}
							variant="h5"
							color={"#ec5b24"}
						>
							<span style={{ fontWeight: 400 }}>₹</span>
							{ticketPrice}
						</Typography>
						<Button
							onClick={(e) => e.stopPropagation()}
							sx={{ px: 6, fontWeight: 700 }}
							variant="contained"
						>
							BOOK
						</Button>
					</Stack>
				</Stack>
			</AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Box sx={{ width: "100%" }}>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: "divider",
						}}
					>
						<Tabs
							value={detailTab}
							onChange={(e, v) => setDetailTab(v)}
							aria-label="basic tabs example"
						>
							<Tab disableRipple label="FLIGHT DETAILS" />
							<Tab disableRipple label="BAGGAGE" />
						</Tabs>
					</Box>
					<CustomTabPanel
						className="custom-tab"
						value={detailTab}
						index={0}
					>
						<Stack
							divider={
								<Divider orientation="horizontal" flexItem />
							}
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
										height:
											airlineName == "AIR INDIA"
												? "25px"
												: "20px",
									}}
								/>
								<Typography fontSize={"14px"}>
									{airlineName} {flightID}
								</Typography>
								<Typography fontSize={"14px"}>
									Economy
								</Typography>
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
									<Typography
										color="rgba(0,0,0,0.38)"
										fontSize={"14px"}
									>
										{depDate.toUTCString().slice(0, 11)}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgba(0,0,0,.38)"
									>
										{airports[sourceIndex].name}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgba(0,0,0,.38)"
									>
										{airports[sourceIndex].city}
									</Typography>
								</Stack>
								<Stack
									alignItems={"center"}
									justifyContent={"center"}
								>
									<SlClock
										size={"24px"}
										color="rgba(0,0,0,0.3)"
									/>
									<Typography
										fontSize="14px"
										color="rgba(0,0,0,.38)"
									>
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
									<Typography
										color="rgba(0,0,0,0.38)"
										fontSize={"14px"}
									>
										{arrDate.toUTCString().slice(0, 11)}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgba(0,0,0,.38)"
									>
										{airports[destinationIndex].name}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgba(0,0,0,.38)"
									>
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
												ticketPrice >= 2250 &&
												duration >= 4
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
											color={
												duration >= 6
													? "black"
													: "rgba(0,0,0,0.38)"
											}
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
					</CustomTabPanel>
					<CustomTabPanel
						className="custom-tab"
						value={detailTab}
						index={1}
					>
						<Table
							sx={{
								minWidth: 650,
								borderColor: "#ffffff",
							}}
						>
							<TableHead>
								<TableRow>
									<TableCell
										align="center"
										sx={{
											color: " rgba(0,0,0,.38)",
											fontSize: "12px",
											p: 1,
										}}
									>
										Flight
									</TableCell>
									<TableCell
										align="right"
										sx={{
											color: " rgba(0,0,0,.38)",
											fontSize: "12px",
											p: 1,
										}}
									>
										Cabin Baggage
									</TableCell>
									<TableCell
										align="right"
										sx={{
											color: " rgba(0,0,0,.38)",
											fontSize: "12px",
											p: 1,
										}}
									>
										Check-in Baggage
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow
									sx={{
										bgcolor: "#f3f3f3",
									}}
								>
									<TableCell
										align="center"
										sx={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											gap: 1,
											alignItems: "center",
										}}
									>
										<img
											src={airlineImg}
											style={{
												width: "50px",
												height:
													airlineName == "AIR INDIA"
														? "50px"
														: "40px",
											}}
										/>
										<Box>
											<Typography fontSize={"18px"}>
												{source}-{destination}
											</Typography>
											<Typography
												fontSize={"14px"}
												fontWeight={600}
											>
												{airlineName} {flightName}
											</Typography>
										</Box>
									</TableCell>
									<TableCell align="right">
										{ticketPrice <= 2250
											? "7 kg (1 piece per pax)"
											: "10 kg (1 piece per pax)"}
									</TableCell>
									<TableCell align="right">
										{ticketPrice <= 2250
											? "15 kilograms (1 piece per pax)"
											: "20 kilograms (1 piece per pax)"}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CustomTabPanel>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
}
function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

const airports = [
	{
		name: "Rajiv Gandhi International Airport",
		city: "Hyderabad",
		country: "India",
		iata_code: "HYD",
	},
	{
		name: "Sardar Vallabhbhai Patel International Airport",
		city: "Ahmedabad",
		country: "India",
		iata_code: "AMD",
	},
	{
		name: "Goa International Airport",
		city: "Goa",
		country: "India",
		iata_code: "GOI",
	},
	{
		name: "Pune Airport",
		city: "Pune",
		country: "India",
		iata_code: "PNQ",
	},
	{
		name: "Lokpriya Gopinath Bordoloi International Airport",
		city: "Guwahati",
		country: "India",
		iata_code: "GAU",
	},
	{
		name: "Jaipur International Airport",
		city: "Jaipur",
		country: "India",
		iata_code: "JAI",
	},
	{
		name: "Dr. Babasaheb Ambedkar International Airport",
		city: "Nagpur",
		country: "India",
		iata_code: "NAG",
	},
	{
		name: "Indira Gandhi International Airport",
		city: "Delhi",
		country: "India",
		iata_code: "DEL",
	},
	{
		name: "Chhatrapati Shivaji Maharaj International Airport",
		city: "Mumbai",
		country: "India",
		iata_code: "BOM",
	},
	{
		name: "Kempegowda International Airport",
		city: "Bengaluru",
		country: "India",
		iata_code: "BLR",
	},
	{
		name: "Netaji Subhas Chandra Bose International Airport",
		city: "Kolkata",
		country: "India",
		iata_code: "CCU",
	},
	{
		name: "Chennai International Airport",
		city: "Chennai",
		country: "India",
		iata_code: "MAA",
	},
	{
		name: "Cochin International Airport",
		city: "Kochi",
		country: "India",
		iata_code: "COK",
	},
	{
		name: "Chandigarh International Airport",
		city: "Chandigarh",
		country: "India",
		iata_code: "IXC",
	},
	{
		name: "Biju Patnaik International Airport",
		city: "Bhubaneswar",
		country: "India",
		iata_code: "BBI",
	},
	{
		name: "Coimbatore International Airport",
		city: "Coimbatore",
		country: "India",
		iata_code: "CJB",
	},
	{
		name: "Lucknow International Airport",
		city: "Lucknow",
		country: "India",
		iata_code: "LKO",
	},
	{
		name: "Trivandrum International Airport",
		city: "Thiruvananthapuram",
		country: "India",
		iata_code: "TRV",
	},
	{
		name: "Mangalore International Airport",
		city: "Mangalore",
		country: "India",
		iata_code: "IXE",
	},
	{
		name: "Amritsar International Airport",
		city: "Amritsar",
		country: "India",
		iata_code: "ATQ",
	},
	{
		name: "Dehradun Airport",
		city: "Dehradun",
		country: "India",
		iata_code: "DED",
	},
	{
		name: "Vadodara Airport",
		city: "Vadodara",
		country: "India",
		iata_code: "BDQ",
	},
	{
		name: "Madurai Airport",
		city: "Madurai",
		country: "India",
		iata_code: "IXM",
	},
	{
		name: "Lok Nayak Jayaprakash Airport",
		city: "Patna",
		country: "India",
		iata_code: "PAT",
	},
	{
		name: "Kushok Bakula Rimpochee Airport",
		city: "Leh",
		country: "India",
		iata_code: "IXL",
	},
	{
		name: "Agartala Airport",
		city: "Agartala",
		country: "India",
		iata_code: "IXA",
	},
	{
		name: "Gaya Airport",
		city: "Gaya",
		country: "India",
		iata_code: "GAY",
	},
	{
		name: "Surat Airport",
		city: "Surat",
		country: "India",
		iata_code: "STV",
	},
	{
		name: "Raipur Airport",
		city: "Raipur",
		country: "India",
		iata_code: "RPR",
	},
	{
		name: "Jammu Airport",
		city: "Jammu",
		country: "India",
		iata_code: "IXJ",
	},
];
