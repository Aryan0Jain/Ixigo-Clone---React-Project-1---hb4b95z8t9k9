import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	IconButton,
	Popper,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TrainStationInput from "./TrainStationInput";
import { DatePicker } from "@mui/x-date-pickers";
import { BiSolidError } from "react-icons/bi";
import swapSVG from "../assests/svgs/swap.svg";
import { useTrainSearchContext } from "./Contexts/TrainSearchProvider";
import dayjs from "dayjs";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TrainCard from "./TrainCard";

const popperSX = {
	border: 0,
	py: 0.5,
	px: 1,
	fontSize: "14px",
	bgcolor: "#FFFFFF",
	color: "#D50000",
	fontWeight: 500,
	display: "flex",
	alignItems: "center",
	mt: "0px",
	borderBottomRightRadius: "5px",
	borderBottomLeftRadius: "5px",
};

export default function TrainsSearch() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	const fromRef = useRef();
	const toRef = useRef();
	const navigate = useNavigate();
	const location = useLocation();
	const depDateRef = useRef();
	const [depTimeRange, setDepTimeRange] = useState(null);
	const [sortBy, setSortBy] = useState("departure");
	const [classes, setClasses] = useState({
		CC: false,
		"2S": false,
		"1A": false,
		"2A": false,
		"3A": false,
		SL: false,
		"3E": false,
	});
	const {
		fromStation,
		setFromStation,
		toStation,
		setToStation,
		departureDate,
		setDepartureDate,
		trainStations,
		searchTrains,
		trainRoutes,
	} = useTrainSearchContext();
	useEffect(() => {
		searchTrains();
	}, [location]);
	function removeError() {
		setErrorMessage("");
		setAnchorEl(null);
	}
	function validateAndFetch() {
		if (fromStation == toStation) {
			setErrorMessage("Source & Destination Can't be same!");
			setAnchorEl(fromRef.current);
			return;
		}
		if (!departureDate) {
			setErrorMessage("Please Enter A Date!");
			setAnchorEl(depDateRef.current);
			return;
		}
		if (departureDate.$d == "Invalid Date") {
			setErrorMessage("Please Enter A Valid Date!");
			setAnchorEl(depDateRef.current);
			return;
		}
		const difference = departureDate.diff(new dayjs().hour(0).minute(0));
		// console.log(difference);
		if (difference < 0 || difference > 121 * 24 * 3600 * 1000) {
			setErrorMessage("Date is out of Range!");
			setAnchorEl(depDateRef.current);
			return;
		}
		setAnchorEl(null);
		const date = departureDate.toJSON();
		const from = encodeURI(trainStations[fromStation]);
		const to = encodeURI(trainStations[toStation]);
		// console.log(from);
		const url = `/trains/search?date=${date}&from=${from}&to=${to}`;
		// console.log(url);
		navigate(url);
	}

	return (
		<Box sx={{ mt: 8.2 }}>
			<Stack
				direction={"row"}
				justifyContent={"center"}
				alignItems={"center"}
				className="search-pannel"
				gap={4}
				sx={{
					background: "linear-gradient(45deg,#721053,#AD2E41)",
					py: 4,
				}}
			>
				<TrainStationInput
					removeError={removeError}
					ref={fromRef}
					options={trainStations}
					value={fromStation}
					setValue={setFromStation}
					label={"From"}
					placeholder="Leaving From"
				/>
				<IconButton
					onClick={() => {
						setFromStation(toStation);
						setToStation(fromStation);
					}}
					disableRipple
					sx={{
						mx: 1,
						p: 0.2,
						height: "fit-content",
						border: "2px solid",
					}}
				>
					<img src={swapSVG} />
				</IconButton>
				<TrainStationInput
					removeError={removeError}
					ref={toRef}
					options={trainStations}
					value={toStation}
					setValue={setToStation}
					label={"To"}
					placeholder="Going To"
				/>
				<DatePicker
					sx={{ width: 150 }}
					ref={depDateRef}
					slotProps={{
						textField: {
							variant: "standard",
							InputLabelProps: { shrink: true },
						},
					}}
					disablePast
					label="Departure"
					reduceAnimations
					maxDate={new dayjs().add(120, "day")}
					value={departureDate}
					onChange={(val) => {
						setDepartureDate(val);
						setAnchorEl(null);
					}}
				/>
				<Button
					sx={{
						color: "#fff",
						py: 1,
						px: 7,
						fontWeight: 700,
						fontSize: "16px",
						borderRadius: "2px",
						backgroundColor: "secondary.hover",
						":hover": { backgroundColor: "secondary.hover" },
					}}
					onClick={validateAndFetch}
				>
					Search
				</Button>
				<Popper
					placement="bottom-start"
					open={anchorEl != null}
					anchorEl={anchorEl}
					sx={{ zIndex: 100 }}
				>
					<Box sx={{ ...popperSX }}>
						<BiSolidError
							size="17px"
							style={{ marginRight: "5px" }}
						/>{" "}
						{errorMesaage}
					</Box>
				</Popper>
			</Stack>
			<Stack
				direction={"row"}
				justifyContent={"center"}
				alignItems={"center"}
				gap={2}
				divider={<Divider orientation="vertical" flexItem />}
				sx={{
					py: 2,
					px: 2,
					backgroundColor: "#fff",
					boxShadow: "0 0 5px rgba(0,0,0,0.15)",
				}}
			>
				<Stack>
					<Typography>Class</Typography>
					<Grid2 container spacing={0} sx={{ width: 250 }}>
						{Object.keys(classes).map((type) => {
							return (
								<Grid2 key={type} xs={4}>
									<ClassCheckBox
										classes={classes}
										setClasses={setClasses}
										name={type}
									/>
								</Grid2>
							);
						})}
					</Grid2>
				</Stack>
				<Stack gap={2}>
					<Typography>
						Departure From {trainStations[fromStation]}
					</Typography>
					<ToggleButtonGroup
						variant="small"
						color="primary"
						value={depTimeRange}
						onChange={(e, v) => {
							setDepTimeRange(v);
						}}
						sx={{
							gap: 1,
							"& button": {
								border: "1px solid rgba(0,0,0,0.5) !important",
								borderRadius: "1px",
								px: 1.5,
								py: 0.8,
								color: "#000000",
								fontSize: "12px",
								fontWeight: 600,
							},
							"& button:hover": {
								border: "1px solid #ec5b24 !important",
								color: "#ec5b24",
							},
							"& button.Mui-selected": {
								border: "1px solid #ec5b24 !important",
								bgcolor: "#ec5b24",
								color: "#ffffff",
							},
							"& button.Mui-selected:hover": {
								border: "1px solid #ec5b24 !important",
								bgcolor: "#ec5b24",
								color: "#ffffff",
							},
							"& p": {
								color: "rgba(0,0,0,0.7)",
								fontSize: "12px",
								fontWeight: 600,
							},
							"& div": {
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: 1,
							},
						}}
					>
						<Box>
							<ToggleButton disableRipple value="early-morning">
								00:00 - 06:00
							</ToggleButton>
							<Typography>Early Morning</Typography>
						</Box>
						<Box>
							<ToggleButton disableRipple value="morning">
								06:00 - 12:00
							</ToggleButton>
							<Typography>Morning</Typography>
						</Box>
						<Box>
							<ToggleButton disableRipple value="mid-day">
								12:00 - 18:00
							</ToggleButton>
							<Typography>Mid Day</Typography>
						</Box>
						<Box>
							<ToggleButton disableRipple value="night">
								18:00 - 24:00
							</ToggleButton>
							<Typography>Night</Typography>
						</Box>
					</ToggleButtonGroup>
				</Stack>
				<Stack gap={2} alignItems={"center"}>
					<Box>
						Sort by:
						<ToggleButtonGroup
							exclusive
							value={sortBy}
							onChange={(e, v) => {
								setSortBy(v);
							}}
							sx={{
								ml: 1,
								"& button": {
									border: "none",
									background: "none",
									p: 0,
									m: 0,
									fontWeight: 600,
								},
								"& button:hover": {
									background: "none",
									color: "#ec5b24",
								},
								"& button.Mui-selected": {
									background: "none",
									color: "#ec5b24",
								},
								"& button.Mui-selected:hover": {
									background: "none",
									// color: "#ec5b24",
								},
								"& button:active": {
									// border: "none",
									// p: 0,
									// m: 0,
									// fontWeight: 600,
									background: "none",
									color: "#ec5b24",
								},
							}}
						>
							<Stack
								divider={
									<Divider
										orientation="vertical"
										flexItem
										sx={{
											borderWidth: "1px",
											borderColor: "rgba(0,0,0,0.4)",
										}}
									/>
								}
								direction={"row"}
								gap={1}
							>
								<ToggleButton disableRipple value="departure">
									Departure Time
								</ToggleButton>
								<ToggleButton disableRipple value="arrival">
									Arrival Time
								</ToggleButton>
								<ToggleButton disableRipple value="duration">
									Duration Time
								</ToggleButton>
								<ToggleButton disableRipple value="name">
									Name
								</ToggleButton>
							</Stack>
						</ToggleButtonGroup>
					</Box>
					<Box>
						<Button
							disableRipple
							variant="contained"
							sx={{ px: 2, fontWeight: 700, mr: 1 }}
						>
							Apply Filters
						</Button>
						<Button disableRipple>Remove Filters</Button>
					</Box>
				</Stack>
			</Stack>
			<Stack>
				{trainRoutes.map((train) => {
					return (
						<TrainCard
							key={train._id}
							train={train}
							departureDate={departureDate}
						/>
					);
				})}
			</Stack>
		</Box>
	);
}
function ClassCheckBox({ classes, setClasses, name }) {
	return (
		<FormControlLabel
			control={
				<Checkbox
					size="small"
					disableRipple
					checked={classes[name]}
					onClick={() =>
						setClasses((prev) => {
							const newObj = { ...prev };
							newObj[name] = !prev[name];
							return newObj;
						})
					}
				/>
			}
			label={<Typography fontSize={"14px"}>{name}</Typography>}
		/>
	);
}
