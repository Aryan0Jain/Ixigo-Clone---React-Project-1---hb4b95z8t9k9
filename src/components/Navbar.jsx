import { AppBar, Button, Stack, SvgIcon, Typography } from "@mui/material";
import React from "react";
import logo from "../assests/images/logo.webp";
import { NavLink } from "react-router-dom";
// import { ReactComponent as flightSVG } from "../assests/svgs/flight.svg";
// import { ReactComponent as trainSVG } from "../assests/svgs/train.svg";
// import { ReactComponent as busSVG } from "../assests/svgs/bus.svg";
// import { ReactComponent as hotelSVG } from "../assests/svgs/hotel.svg";
import flightSVG from "../assests/svgs/flight.svg";
import trainSVG from "../assests/svgs/train.svg";
import busSVG from "../assests/svgs/bus.svg";
import hotelSVG from "../assests/svgs/hotel.svg";
import userSVG from "../assests/svgs/user.svg";
import DashboardMenu from "./DashboardMenu";
import { useAuthContext } from "./Contexts/AuthProvider";
import LoginSignupForm from "./LoginSignupForm";

const tabs = [
	{ tabTitle: "Flights", tabLogo: flightSVG },
	{ tabTitle: "Trains", tabLogo: trainSVG },
	{ tabTitle: "Buses", tabLogo: busSVG },
	{ tabTitle: "Hotels", tabLogo: hotelSVG },
];

export default function Navbar() {
	const {
		isLoggedIn,
		setIsLoggedIn,
		showLoginSignupForm,
		setShowLoginSignupForm,
	} = useAuthContext();
	return (
		<AppBar sx={{ backgroundColor: "#fff", py: 1.5, px: 11 }}>
			<Stack direction={"row"} justifyContent={"space-between"}>
				<Stack direction="row" gap={6}>
					<NavLink to="/">
						<img
							src={logo}
							alt="Ixigi logo"
							style={{ width: "85px" }}
						/>
					</NavLink>
					<Stack direction="row" gap={3} alignItems="center">
						{tabs.map(({ tabLogo, tabTitle }) => {
							return (
								<NavLink
									style={{ textDecoration: "none" }}
									variant="a"
									key={tabTitle}
									to={`/${tabTitle.toLowerCase()}`}
								>
									<Stack
										direction="row"
										gap={0.5}
										alignItems="center"
										sx={{
											"&:hover *": {
												color: "secondary.hover",
												filter: "invert(46%) sepia(45%) saturate(4226%) hue-rotate(348deg) brightness(96%) contrast(91%)",
											},
											"& *": {
												color: "secondary.light",
											},
										}}
									>
										<img
											src={tabLogo}
											width={"30px"}
											height={"30px"}
										/>
										<Typography
											variant="sting"
											// color="secondary"
										>
											{tabTitle}
										</Typography>
									</Stack>
								</NavLink>
							);
						})}
					</Stack>
				</Stack>
				{!isLoggedIn && (
					<>
						<Button
							disableRipple
							onClick={() => setShowLoginSignupForm(true)}
							sx={{
								mr: 2.5,
								textTransform: "none",
								transition: "none",
								color: "secondary.light",
								fontSize: "16px",
								color: "secondary.light",
								fontWeight: 400,
								"&:hover": {
									background: "none",
									color: "secondary.hover",
									filter: "invert(46%) sepia(45%) saturate(4226%) hue-rotate(348deg) brightness(96%) contrast(91%)",
								},
							}}
						>
							<img src={userSVG} width={"30px"} height={"30px"} />

							<Typography sx={{ ml: 1 }} variant="string">
								LogIn/SignUp
							</Typography>
						</Button>
						<LoginSignupForm />
					</>
				)}
				{isLoggedIn && <DashboardMenu />}
			</Stack>
		</AppBar>
	);
}
