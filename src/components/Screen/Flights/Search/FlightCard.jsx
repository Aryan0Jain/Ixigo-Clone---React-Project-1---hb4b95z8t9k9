import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AILogo from "../../../../assests/images/airlines/AI.png";
import INLogo from "../../../../assests/images/airlines/6E.png";
import G8Logo from "../../../../assests/images/airlines/G8.png";
import SGLogo from "../../../../assests/images/airlines/SG.png";
import UKLogo from "../../../../assests/images/airlines/UK.png";
import { MdExpandMore } from "react-icons/md";
import FlightDetailsTab from "./FlightDetailsTab";
import FlightCardSummary from "./FlightCardSummary";
import { AIRPORTS } from "../../../../constants";

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
	handleBook,
}) {
	const [detailTab, setDetailTab] = useState(0);
	let airlineImg, airlineName, flightName;
	const sourceIndex = AIRPORTS.findIndex((item) => item.iata_code == source);
	const destinationIndex = AIRPORTS.findIndex(
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
				<FlightCardSummary
					{...{
						sourceIndex,
						destinationIndex,
						stops,
						airlineImg,
						airlineName,
						flightName,
						calulatedDuration,
						source,
						destination,
						arrivalTime,
						departureTime,
						depDate,
						arrDate,
						ticketPrice,
						handleBook,
						_id,
					}}
				/>
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
					</CustomTabPanel>
					<CustomTabPanel
						className="custom-tab"
						value={detailTab}
						index={1}
					>
						<Table
							sx={{
								width: 940,
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
