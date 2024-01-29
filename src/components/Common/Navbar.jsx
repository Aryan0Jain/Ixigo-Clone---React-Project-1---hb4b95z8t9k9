import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import logo from "../../assests/images/logo.webp";
import { NavLink } from "react-router-dom";
import userSVG from "../../assests/svgs/user.svg";
import DashboardMenu from "./DashboardMenu";
import { useAuthContext } from "../../Contexts/AuthProvider";
import LoginSignupForm from "./LoginSignupForm";
import { TABS } from "../../constants";
import { GiHamburgerMenu } from "react-icons/gi";
import { Menu, MenuItem } from "@mui/material";

export default function Navbar() {
	const { isLoggedIn, setShowLoginSignupForm } = useAuthContext();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	return (
		<AppBar
			sx={{ backgroundColor: "#fff", py: 1.5, px: { md: 11, xs: 2 } }}
		>
			<Stack direction={"row"} justifyContent={"space-between"}>
				<Stack
					direction="row"
					gap={6}
					alignItems={"center"}
					sx={{ display: { xs: "none", md: "flex" } }}
				>
					<NavLink to="/">
						<img
							src={logo}
							alt="Ixigi logo"
							style={{ width: "85px" }}
						/>
					</NavLink>
					<Stack
						direction="row"
						gap={3}
						alignItems="center"
						className="nav-tabs"
					>
						{TABS.map(({ tabLogo, tabTitle }) => {
							return (
								<NavLink
									style={{ textDecoration: "none" }}
									key={tabTitle}
									to={`/${tabTitle.toLowerCase()}`}
								>
									<Stack
										direction="row"
										gap={0.5}
										alignItems="center"
									>
										<img
											src={tabLogo}
											width={"30px"}
											height={"30px"}
										/>
										<Typography>{tabTitle}</Typography>
									</Stack>
								</NavLink>
							);
						})}
					</Stack>
				</Stack>
				<Stack
					direction={"row"}
					gap={4}
					alignItems={"center"}
					sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
				>
					<GiHamburgerMenu
						color="#ec5b24"
						size={24}
						onClick={handleOpenNavMenu}
						style={{ cursor: "pointer" }}
					/>
					<NavLink to="/">
						<img
							src={logo}
							alt="Ixigi logo"
							style={{ width: "60px", verticalAlign: "middle" }}
						/>
					</NavLink>
					<Menu
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: "block", md: "none" },
						}}
					>
						{TABS.map(({ tabLogo, tabTitle }) => (
							<MenuItem
								key={tabTitle}
								onClick={handleCloseNavMenu}
								sx={{ display: "flex", gap: 1 }}
							>
								<img
									src={tabLogo}
									width={"20px"}
									height={"20px"}
								/>
								<Typography textAlign="center">
									{tabTitle}
								</Typography>
							</MenuItem>
						))}
					</Menu>
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
