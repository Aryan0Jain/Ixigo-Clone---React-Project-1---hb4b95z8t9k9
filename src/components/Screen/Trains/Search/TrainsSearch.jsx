import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { BiSolidError } from "react-icons/bi";
import swapSVG from "../../../../assests/svgs/swap-white.svg";
import dayjs from "dayjs";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTrainSearchContext } from "../../../../Contexts/TrainSearchProvider";
import TrainStationInput from "../TrainStationInput";
import TrainCard from "../TrainCard";
import notFound from "../../../../assests/images/trainNotFound.png";
import { useAuthContext } from "../../../../Contexts/AuthProvider";
import { Pagination } from "@mui/material";
import { TRAIN_STATIONS } from "../../../../constants";

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
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();
	const depDateRef = useRef();
	const [depTimeRange, setDepTimeRange] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sortBy, setSortBy] = useState("departure");
	const [filtered, setFiltered] = useState(false);
	const [filteredData, setFilteredData] = useState([]);
	const [availablityBoxId, setAvailablityBoxId] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const [classes, setClasses] = useState({
		CC: false,
		"2S": false,
		"1A": false,
		"2A": false,
		"3A": false,
		SL: false,
		"3E": false,
		EA: false,
	});
	const {
		fromStation,
		setFromStation,
		toStation,
		setToStation,
		departureDate,
		setDepartureDate,
		searchTrains,
		trainRoutes,
		getFare,
	} = useTrainSearchContext();
	const { setShowLoginSignupForm, isLoggedIn, setRedirect, setRedirectTo } =
		useAuthContext();
	useEffect(() => {
		const from = searchParams.get("from");
		const to = searchParams.get("to");
		setFromStation(TRAIN_STATIONS.findIndex((item) => item == from));
		setToStation(TRAIN_STATIONS.findIndex((item) => item == to));
		setDepartureDate(new dayjs(searchParams.get("date")));
		// setTravellers(searchParams.get("travellers") - 1);
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		searchTrains(setIsLoading);
		handleResetFilters();
	}, [location]);
	function handleBook(id, coachType) {
		const { coaches, daysOfOperation, ...trainDetails } =
			trainRoutes[trainRoutes.findIndex((item) => item._id == id)];
		const seats = coaches.find(
			(item) => item.coachType == coachType
		).numberOfSeats;
		const fare = getFare(coachType, trainDetails.fare);
		let url = `/trains/booking/${id}?date=${departureDate.toJSON()}&coach=${coachType}&seats=${seats}&fare=${fare}&traindetails=${JSON.stringify(
			trainDetails
		)}`;
		if (!isLoggedIn) {
			setShowLoginSignupForm(true);
			setRedirect(true);
			setRedirectTo(url);
			return;
		}
		navigate(url);
	}
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
		const from = encodeURI(TRAIN_STATIONS[fromStation]);
		const to = encodeURI(TRAIN_STATIONS[toStation]);
		// console.log(from);
		const url = `/trains/search?date=${date}&from=${from}&to=${to}`;
		// console.log(url);
		setIsLoading(true);
		navigate(url);
	}
	function handleApplyFiltersButton() {
		setIsLoading(true);
		setFiltered(true);
		handleApplyFilters();
	}
	function handleApplyFilters() {
		let newData = [...trainRoutes];
		console.log(trainRoutes);
		if (Object.values(classes).includes(true)) {
			newData = newData.filter(({ coaches }) => {
				return coaches.some(({ coachType }) => classes[coachType]);
			});
		}
		if (depTimeRange.length > 0 && depTimeRange.length < 4) {
			newData = newData.filter(({ departureTime }) =>
				depTimeRange.includes(getTimeRange(departureTime))
			);
		}
		console.log(sortBy === "arrival");
		if (sortBy === "arrival") {
			newData = newData.sort((a, b) => {
				const aTime =
					+a.arrivalTime.slice(0, 2) * 60 +
					+a.arrivalTime.slice(3, 5);
				const bTime =
					+b.arrivalTime.slice(0, 2) * 60 +
					+b.arrivalTime.slice(3, 5);
				console.log(aTime - bTime);
				return aTime - bTime;
			});
		}
		if (sortBy === "duration") {
			newData = newData.sort((a, b) => {
				let duration = a.travelDuration.split(" ");
				const aDuration =
					+duration[0].slice(0, -1) * 60 + +duration[1].slice(0, -1);
				duration = b.travelDuration.split(" ");
				const bDuration =
					+duration[0].slice(0, -1) * 60 + +duration[1].slice(0, -1);
				return aDuration - bDuration;
			});
		}
		if (sortBy === "name") {
			newData = newData.sort((a, b) =>
				a.trainName.localeCompare(b.trainName)
			);
		}
		setFilteredData(newData);
		setIsLoading(false);
	}
	function handleResetFiltersButton() {
		setIsLoading(true);
		handleResetFilters();
	}
	function handleResetFilters() {
		setFiltered(false);
		Object.keys(classes).forEach((key) => (classes[key] = false));
		setDepTimeRange([]);
		setSortBy("departure");
		setIsLoading(false);
	}
	function getTimeRange(time) {
		if (time >= "00:00" && time <= "06:00") return "early-morning";
		if (time > "06:00" && time <= "12:00") return "morning";
		if (time > "12:00" && time <= "18:00") return "mid-day";
		if (time > "18:00" && time <= "24:00") return "night";
	}

	return (
		<Box sx={{ mt: 8.2 }}>
			<Stack
				direction={"row"}
				justifyContent={"center"}
				alignItems={"center"}
				className="train-search-pannel"
				gap={4}
				sx={{
					background: "linear-gradient(45deg,#721053,#AD2E41)",
					py: 1,
				}}
			>
				<TrainStationInput
					removeError={removeError}
					ref={fromRef}
					options={TRAIN_STATIONS}
					value={fromStation}
					setValue={setFromStation}
					label={"From"}
					placeholder="Leaving From"
					lightMode={true}
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
						border: "2px solid white",
					}}
				>
					<img src={swapSVG} />
				</IconButton>
				<TrainStationInput
					removeError={removeError}
					ref={toRef}
					options={TRAIN_STATIONS}
					value={toStation}
					setValue={setToStation}
					label={"To"}
					placeholder="Going To"
					lightMode={true}
				/>
				<DatePicker
					sx={{ width: 180 }}
					ref={depDateRef}
					slotProps={{
						textField: {
							variant: "standard",
							sx: { color: "#fff" },
							InputLabelProps: { shrink: true },
						},
						inputAdornment: {
							sx: { "& svg": { fill: "white" } },
						},
					}}
					format="DD MMM, dddd"
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
						Departure From {TRAIN_STATIONS[fromStation]}
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
							onClick={handleApplyFiltersButton}
						>
							Apply Filters
						</Button>
						<Button
							disableRipple
							onClick={handleResetFiltersButton}
						>
							Remove Filters
						</Button>
					</Box>
				</Stack>
			</Stack>
			{isLoading &&
				Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
					<div key={i} className="train-cards-loader"></div>
				))}
			{!isLoading && trainRoutes == null && (
				<Stack
					direction={"row"}
					alignItems={"center"}
					sx={{
						width: "fit-content",
						mx: "auto",
						my: 4,
					}}
					gap={5}
				>
					<img src={notFound} style={{ width: "400px" }} />
					<Box sx={{ width: 380 }}>
						<Typography fontSize={20} color="rgba(0,0,0,.64)">
							Oops! Some Error occurred.
						</Typography>
						<Typography fontSize={14} color="rgba(0,0,0,.64)">
							Please retry after sometime.
						</Typography>
					</Box>
				</Stack>
			)}
			{!isLoading && trainRoutes != null && (
				<>
					{!filtered && trainRoutes.length == 0 && (
						<Stack
							direction={"row"}
							alignItems={"center"}
							sx={{
								width: "fit-content",
								mx: "auto",
								my: 4,
							}}
							gap={5}
						>
							<img src={notFound} style={{ width: "400px" }} />
							<Box sx={{ width: 380 }}>
								<Typography
									fontSize={20}
									color="rgba(0,0,0,.64)"
								>
									No trains found
								</Typography>
								<Typography
									fontSize={14}
									color="rgba(0,0,0,.64)"
								>
									Sorry! No trains found in the selected
									route. Please choose a different origin and
									destination & try again
								</Typography>
							</Box>
						</Stack>
					)}
					{!filtered && trainRoutes.length > 0 && (
						<Stack gap={2} sx={{ my: 5 }}>
							{trainRoutes
								.slice(
									5 * (pageNumber - 1),
									Math.min(5 * pageNumber, trainRoutes.length)
								)
								.map((train) => {
									return (
										<TrainCard
											handleBook={handleBook}
											key={train._id}
											train={train}
											departureDate={departureDate}
											availablityBoxId={availablityBoxId}
											setAvailablityBoxId={
												setAvailablityBoxId
											}
										/>
									);
								})}
						</Stack>
					)}
					{filtered && filteredData.length > 0 && (
						<Stack gap={2} sx={{ my: 5 }}>
							{filteredData
								.slice(
									5 * (pageNumber - 1),
									Math.min(
										5 * pageNumber,
										filteredData.length
									)
								)
								.map((train) => {
									return (
										<TrainCard
											handleBook={handleBook}
											key={train._id}
											train={train}
											departureDate={departureDate}
											availablityBoxId={availablityBoxId}
											setAvailablityBoxId={
												setAvailablityBoxId
											}
										/>
									);
								})}
						</Stack>
					)}
					{filtered && filteredData.length == 0 && (
						<Stack
							direction={"row"}
							alignItems={"center"}
							sx={{
								width: "fit-content",
								mx: "auto",
								my: 4,
							}}
							gap={5}
						>
							<img src={notFound} style={{ width: "400px" }} />
							<Stack
								sx={{ width: 380 }}
								alignItems={"center"}
								gap={1}
							>
								<Typography
									fontSize={20}
									color="rgba(0,0,0,.64)"
								>
									No trains found
								</Typography>
								<Typography
									fontSize={14}
									color="rgba(0,0,0,.64)"
								>
									Sorry! No trains found for the selected
									filters.
								</Typography>
								<Button
									disableRipple
									variant="contained"
									sx={{
										px: 2,
										fontWeight: 700,
										mr: 1,
										mt: 1,
									}}
									onClick={handleResetFiltersButton}
								>
									Reset Filters
								</Button>
							</Stack>
						</Stack>
					)}
					{((filtered && filteredData.length != 0) ||
						(!filtered && trainRoutes.length != 0)) && (
						<Pagination
							color="secondary"
							className="pagination"
							sx={{
								alignSelf: "center",
								m: 2,
								mx: "auto",
								width: "fit-content",
							}}
							page={pageNumber}
							onChange={(e, p) => setPageNumber(p)}
							count={
								filtered
									? Math.ceil(filteredData.length / 5)
									: Math.ceil(trainRoutes.length / 5)
							}
							shape="rounded"
						/>
					)}
				</>
			)}
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
