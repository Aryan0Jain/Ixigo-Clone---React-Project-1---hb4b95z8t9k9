import {
	AppBar,
	Box,
	Button,
	Container,
	Divider,
	Popper,
	Stack,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
	useLocation,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { useHotelSearchContext } from "../../../../Contexts/HotelSearchProvider";
import { CHILD_AND_EXTRA_BEDS, HOTEL_AMENITIES } from "../../../../constants";
import dayjs from "dayjs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CURRENCY_FORMATTER } from "../../../../utils";
import { IoKeySharp } from "react-icons/io5";
import { TbMoodKid } from "react-icons/tb";
import { FiFileText } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useAuthContext } from "../../../../Contexts/AuthProvider";

function getRating(rating) {
	if (rating >= 9) return "Exceptional";
	if (rating >= 8) return "Excellent";
	if (rating >= 7) return "Very Good";
	if (rating >= 6) return "Good";
	return "Pleasant";
}
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Box
			id={`tabpanel-${index}`}
			{...other}
			sx={{ bgcolor: "#fff", p: 2, borderRadius: "10px" }}
		>
			{children}
		</Box>
	);
}
export default function HotelDetail() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();
	const checkindate = new dayjs(searchParams.get("checkin"));
	const checkoutdate = new dayjs(searchParams.get("checkout"));
	const rooms = +searchParams.get("rooms");
	const guests = +searchParams.get("guests");
	const params = useParams();
	const hotelID = params.id;
	const [isLoading, setIsLoading] = useState(true);
	const [hotel, setHotel] = useState({});
	const { getHotelData } = useHotelSearchContext();
	const [hasError, setHasError] = useState(false);
	const [tabIndex, setTabIndex] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [openPolicy, setOpenPolicy] = useState(false);
	const { setShowLoginSignupForm, isLoggedIn, setRedirect, setRedirectTo } =
		useAuthContext();
	function handleMouseIn(e) {
		setAnchorEl(e.target);
		setOpenPolicy(true);
	}
	function handleMouseOut() {
		setOpenPolicy(false);
		setAnchorEl(null);
	}
	function handleTabChange(e, v) {
		setTabIndex(v);
		const tabPanel = document.getElementById(`tabpanel-${v}`);
		if (tabPanel) {
			const position =
				tabPanel.getBoundingClientRect().top + window.scrollY - 150;
			window.scrollTo({ top: position, behavior: "smooth" });
		}
	}
	function handleBookButton(costPerNight, roomtype) {
		const hotelData = {
			name: hotel.name,
			location: hotel.location,
			image: hotel.images[0],
			roomtype,
		};
		let url = `/hotels/booking/${hotelID}?checkin=${checkindate.toJSON()}&checkout=${checkoutdate.toJSON()}&rooms=${rooms}&guests=${guests}&cost=${costPerNight}&hotel=${JSON.stringify(
			hotelData
		)}`;
		if (!isLoggedIn) {
			setShowLoginSignupForm(true);
			setRedirect(true);
			setRedirectTo(url);
			return;
		}
		navigate(url);
	}
	useEffect(() => {
		async function getData() {
			const data = await getHotelData(hotelID);
			if (data) {
				setHotel(data);
			} else {
				setHasError(true);
			}
			setIsLoading(false);
		}
		getData();
		function addScrollEvent(e) {
			const tab1 = document
				.getElementById(`tabpanel-0`)
				?.getBoundingClientRect();
			if (!tab1) return;
			const tab2 = document
				.getElementById(`tabpanel-1`)
				.getBoundingClientRect();
			const tab3 = document
				.getElementById(`tabpanel-2`)
				.getBoundingClientRect();
			if (tab1.bottom > window.innerHeight / 2) {
				setTabIndex(0);
			}
			if (tab2.top < window.innerHeight / 2) {
				setTabIndex(1);
			}
			if (tab3.top < window.innerHeight / 2) {
				setTabIndex(2);
			}
		}
		window.addEventListener("scroll", addScrollEvent);
		return () => {
			window.removeEventListener("scroll", addScrollEvent);
			setIsLoading(true);
		};
	}, []);
	return (
		<Container sx={{ mt: 8.2, mb: 4 }}>
			{isLoading && (
				<Box sx={{ pt: 3 }}>
					<Box
						sx={{
							width: "100%",
							height: "50px",
							borderRadius: "8px",
						}}
						className="hotel-loader"
					></Box>
					<Box
						sx={{
							width: "100%",
							display: "grid",
							gridTemplateColumns: "repeat(4,1fr)",
							gridTemplateRows: "repeat(2,1fr)",
							gap: "20px",
							py: 2,
							mt: 2,
						}}
					>
						{Array.from({ length: 5 }).map((_, index) => {
							return (
								<Box
									key={index}
									sx={{
										height: index === 0 ? "400px" : "190px",
										gridRow:
											index === 0 ? "span 2" : "span 1",
										gridColumn:
											index === 0 ? "span 2" : "span 1",
										borderRadius: "10px",
									}}
									className="hotel-loader"
								></Box>
							);
						})}
					</Box>
					<Typography
						className="hotel-loader"
						sx={{
							width: "400px",
							height: "50px",
							borderRadius: "8px",
							mt: 2,
						}}
					></Typography>
				</Box>
			)}
			{!isLoading && (
				<>
					<Tabs
						value={tabIndex}
						onChange={handleTabChange}
						sx={{
							bgcolor: "#fff",
							boxShadow: "none",
							position: "sticky",
							top: "66px",
							"& .MuiTabs-indicator": {
								backgroundColor: "#0770e4",
								height: 3,
							},
							"& .MuiTab-root.Mui-selected": {
								color: "#0770e4",
							},
							zIndex: 1150,
						}}
					>
						<Tab disableRipple label="Overview" />
						<Tab disableRipple label="Rooms" />
						<Tab disableRipple label="Policies" />
					</Tabs>
					{/* </AppBar> */}
					<Stack gap={4}>
						<TabPanel value={tabIndex} index={0}>
							<Box
								sx={{
									width: "100%",
									display: "grid",
									gridTemplateColumns: "repeat(4,1fr)",
									gridTemplateRows: "repeat(2,1fr)",
									gap: "20px",
									py: 2,
								}}
							>
								{hotel.images.map((src, index) => {
									return (
										<Box
											key={index}
											sx={{
												height:
													index === 0
														? "400px"
														: "190px",
												gridRow:
													index === 0
														? "span 2"
														: "span 1",
												gridColumn:
													index === 0
														? "span 2"
														: "span 1",
												borderRadius: "10px",
											}}
										>
											<img
												loading="lazy"
												src={src}
												style={{
													objectFit: "cover",
													height:
														index === 0
															? "400px"
															: "190px",
													width: "100%",
													borderRadius: "10px",
												}}
											/>
										</Box>
									);
								})}
							</Box>
							<Typography fontSize={36} fontWeight={600}>
								{hotel.name}
							</Typography>
							<Stack direction={"row"} gap={4}>
								<Stack
									direction={"row"}
									gap={2}
									sx={{ color: "#0770e4" }}
									alignItems={"center"}
								>
									<Typography
										sx={{
											py: 0.75,
											px: 1.2,
											bgcolor: "rgb(229, 240, 252)",
											borderRadius: "4px",
										}}
										fontSize={20}
										fontWeight={700}
									>
										{(hotel.rating * 1.9).toFixed(1)}
									</Typography>
									<Typography fontSize={20} fontWeight={600}>
										{getRating(
											(hotel.rating * 1.9).toFixed(1)
										)}
									</Typography>
								</Stack>
								<Stack
									direction={"row"}
									gap={2}
									sx={{ color: "#FC790D" }}
									alignItems={"center"}
								>
									<Box
										sx={{
											bgcolor: "#fff2e7",
											py: 1,
											px: 1.5,
											borderRadius: "4px",
										}}
									>
										<FaMapMarkerAlt size={22} />
									</Box>
									<Typography fontSize={20} fontWeight={600}>
										{hotel.location}
									</Typography>
								</Stack>
							</Stack>
						</TabPanel>
						<TabPanel value={tabIndex} index={1}>
							<Typography fontSize={22} fontWeight={600}>
								Rooms
							</Typography>
							<Box
								sx={{
									display: "flex",
									flexWrap: "wrap",
									gap: 3,
									width: "100%",
									mt: 2,
								}}
							>
								{hotel.rooms.map(
									(
										{
											bedDetail,
											cancellationPolicy,
											costDetails,
											costPerNight,
											price,
											roomType,
											_id,
										},
										index
									) => {
										return (
											<Stack
												key={_id}
												sx={{
													bgcolor: "#fff",
													border: "1px solid lightgray",
													borderRadius: "10px",
													p: 2.5,
													width: "350px",
												}}
												gap={1}
											>
												<Stack
													direction={"row"}
													justifyContent={
														"space-between"
													}
													alignItems={"flex-end"}
												>
													<Typography
														fontSize={24}
														fontWeight={600}
													>
														{bedDetail} ({roomType})
													</Typography>
													{/* <Typography
													color={"rgba(0,0,0,0.6)"}
													fontSize={16}
												>
													{roomType}
												</Typography> */}
												</Stack>
												<Stack
													direction={"row"}
													flexWrap={"wrap"}
													gap={2}
													alignItems={"center"}
												>
													{hotel.amenities.map(
														(amenity) => {
															const Icon =
																HOTEL_AMENITIES[
																	HOTEL_AMENITIES.findIndex(
																		(
																			item
																		) =>
																			item.name ===
																			amenity
																	)
																].icon;
															return (
																<Stack
																	key={
																		amenity
																	}
																	direction={
																		"row"
																	}
																	gap={1}
																	alignItems={
																		"center"
																	}
																>
																	<Icon />
																	<Typography>
																		{
																			amenity
																		}
																	</Typography>
																</Stack>
															);
														}
													)}
												</Stack>
												<Stack
													direction={"row"}
													gap={0.8}
													alignItems={"center"}
												>
													<Box
														sx={{
															width: "5px",
															height: "5px",
															borderRadius: "50%",
															bgcolor: "#2b9950",
														}}
													></Box>
													<Typography
														color={"#2b9950"}
													>
														Free Cancellation till{" "}
														{checkindate
															.subtract(1, "day")
															.format("DD MMM")}
													</Typography>
													<Box
														id={_id}
														onMouseEnter={
															handleMouseIn
														}
														onMouseLeave={
															handleMouseOut
														}
													>
														<IoIosInformationCircleOutline color="#2b9950" />
													</Box>
												</Stack>
												<Stack>
													<Typography
														fontSize={20}
														fontWeight={600}
													>
														{CURRENCY_FORMATTER(
															costPerNight * rooms
														)}
													</Typography>
													<Typography
														fontSize={12}
														color={
															"rgb(94, 97, 110)"
														}
													>
														+{" "}
														{CURRENCY_FORMATTER(
															costPerNight *
																0.18 *
																rooms
														)}{" "}
														taxes and fees per night
														for {rooms}{" "}
														{rooms === 1
															? "room"
															: "rooms"}
													</Typography>
												</Stack>
												<Button
													onClick={() =>
														handleBookButton(
															costPerNight,
															bedDetail
														)
													}
													variant="contained"
													disableRipple
													sx={{
														py: 1.5,
														px: 2,
														// m: "auto",
														bgcolor:
															"rgb(252, 121, 13)",
														boxShadow: "none",
														":hover": {
															boxShadow: "none",
															bgcolor:
																"rgb(253, 148, 61)",
														},
													}}
												>
													Reserve {rooms}{" "}
													{rooms === 1
														? "room"
														: "rooms"}
												</Button>
											</Stack>
										);
									}
								)}
								<Popper open={openPolicy} anchorEl={anchorEl}>
									<Box
										sx={{
											bgcolor: "#fff",
											width: "320px",
											p: 2,
											boxShadow: "0px 0px 20px -7px grey",
											borderRadius: "10px",
										}}
									>
										<Typography
											fontSize={20}
											fontWeight={600}
										>
											Cancellation Policy
										</Typography>
										<Typography>
											Cancel your reservation before{" "}
											{checkindate
												.subtract(1, "day")
												.format("DD MMMM YYYY")}{" "}
											12:00 AM, to get a full refund
										</Typography>
									</Box>
								</Popper>
							</Box>
						</TabPanel>
						<TabPanel value={tabIndex} index={2}>
							<Typography fontSize={22} fontWeight={600}>
								Hotel Policies
							</Typography>
							<Stack
								sx={{ mt: 2 }}
								gap={2}
								divider={<Divider orientation="horizontal" />}
							>
								<Stack direction={"row"}>
									<Stack
										direction={"row"}
										sx={{ width: "250px" }}
										alignItems={"center"}
										gap={1}
									>
										<IoKeySharp size={20} />
										<Typography
											fontSize={18}
											fontWeight={600}
										>
											Check-in
										</Typography>
									</Stack>
									<Typography fontSize={15}>
										From 15:00
									</Typography>
								</Stack>
								<Stack direction={"row"}>
									<Stack
										direction={"row"}
										sx={{ width: "250px" }}
										alignItems={"center"}
										gap={1}
									>
										<IoKeySharp size={20} />
										<Typography
											fontSize={18}
											fontWeight={600}
										>
											Check-out
										</Typography>
									</Stack>
									<Typography fontSize={15}>
										Till 12:00
									</Typography>
								</Stack>
								<Stack
									direction={"row"}
									alignItems={"flex-start"}
								>
									<Stack
										direction={"row"}
										sx={{ width: "250px" }}
										alignItems={"center"}
										gap={1}
									>
										<TbMoodKid size={20} />
										<Typography
											fontSize={18}
											fontWeight={600}
										>
											Children and extra beds
										</Typography>
									</Stack>
									<Stack gap={1}>
										{CHILD_AND_EXTRA_BEDS.map(
											({ head, body }) => {
												return (
													<Typography
														key={head}
														fontSize={15}
													>
														<span
															style={{
																fontWeight: 600,
															}}
														>
															{head}
														</span>{" "}
														- {body}
													</Typography>
												);
											}
										)}
										<Typography fontSize={15}>
											<span style={{ fontWeight: 600 }}>
												Extra Bed Charges
											</span>{" "}
											-{" "}
											{CURRENCY_FORMATTER(
												hotel?.childAndExtraBedPolicy
													?.extraBedCharge
											)}
										</Typography>
									</Stack>
								</Stack>
								{/* <Stack direction={"row"}>
									<Stack direction={"row"}>
										<FiFileText />
										<Typography>
											Property Information
										</Typography>
									</Stack>
									<Stack direction={"row"} flexWrap={"wrap"}>
										{[
											"Check-in until - 00:00",
											"Check-out from - 12:00",
										]}
									</Stack>
								</Stack> */}
							</Stack>
						</TabPanel>
					</Stack>
				</>
			)}
		</Container>
	);
}
