import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import flightLogo from "../../assests/images/flight-booking.png";
import locationImg1Con from "../../assests/images/homePage/banner-agra-con.webp";
import locationImg1Org from "../../assests/images/homePage/banner-agra-org.webp";
import locationImg2Con from "../../assests/images/homePage/banner-bali-indonesia-con.webp";
import locationImg2Org from "../../assests/images/homePage/banner-bali-indonesia-org.webp";
import locationImg3Con from "../../assests/images/homePage/banner-kochi-con.webp";
import locationImg3Org from "../../assests/images/homePage/banner-kochi-org.webp";
import locationImg4Con from "../../assests/images/homePage/banner-london-unitedKingdom-con.webp";
import locationImg4Org from "../../assests/images/homePage/banner-london-unitedKingdom-org.webp";
import locationImg5Con from "../../assests/images/homePage/banner-udaipur-india-con.webp";
import locationImg5Org from "../../assests/images/homePage/banner-udaipur-india-org.webp";

const whiteDot = {
	display: "inline-block",
	verticalAlign: "middle",
	width: "5px",
	height: "5px",
	backgroundColor: "#fff",
	borderRadius: "10px",
	margin: "0px 10px",
};
const backgroundImages = [
	{
		con: locationImg1Con,
		org: locationImg1Org,
		city: "Agra",
		country: "India",
	},
	{
		con: locationImg2Con,
		org: locationImg2Org,
		city: "Bali",
		country: "Indonesia",
	},
	{
		con: locationImg3Con,
		org: locationImg3Org,
		city: "Kochi",
		country: "India",
	},
	{
		con: locationImg4Con,
		org: locationImg4Org,
		city: "London",
		country: "United Kingdom",
	},
	{
		con: locationImg5Con,
		org: locationImg5Org,
		city: "Udaipur",
		country: "India",
	},
];
function BackgroundCarousel() {
	const [index, setIndex] = useState(Math.round(Math.random() * 4));
	const backgroundDiv = useRef();
	useEffect(() => {
		const interval = setInterval(() => {
			backgroundDiv.current.style.opacity = 0;
			setTimeout(() => {
				setIndex((prev) => {
					const newIndex = prev == 4 ? 0 : prev + 1;
					setTimeout(() => {
						backgroundDiv.current.style.opacity = 1;
					}, 100);
					return newIndex;
				});
			}, 300);
		}, 10000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<>
			<Box component={"div"} position={"absolute"} sx={{ width: "100%" }}>
				<Box
					ref={backgroundDiv}
					sx={{
						transition: "opacity 400ms ease-in-out",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						position: "absolute",
						height: "550px",
						width: "100%",
						zIndex: "-10",
					}}
				>
					<img
						loading="lazy"
						src={backgroundImages[index].org}
						style={{
							width: "100%",
							height: "550px",
							zIndex: "-100",
							objectFit: "cover",
						}}
					/>
				</Box>
				<Box
					sx={{
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						position: "absolute",
						height: "550px",
						width: "100%",
						zIndex: "-15",
					}}
				>
					<img
						loading="lazy"
						src={backgroundImages[index].con}
						style={{
							width: "100%",
							height: "550px",
							zIndex: "-100",
							objectFit: "cover",
						}}
					/>
				</Box>
				<Box
					component={"div"}
					position={"absolute"}
					sx={{
						backgroundColor: "rgba(0, 0, 0, 0.269)",
						width: "100%",
						height: "550px",
						zIndex: "-5",
					}}
				></Box>
				<Box
					sx={{
						position: "absolute",
						p: "0 0 10%",
						width: "100%",
						top: 550,
						background:
							"linear-gradient(to bottom,rgba(0,0,0,.45),rgba(0,0,0,0))",
						zIndex: "-10",
					}}
				></Box>
			</Box>
			<Box>
				<div style={{ position: "relative" }}>
					<Stack
						direction={"row"}
						gap={1}
						sx={{
							pt: "140px",
							pb: "100px",
							width: "fit-content",
							margin: "auto",
							alignItems: "center",
						}}
					>
						<img src={flightLogo} />
						<Typography
							variant="h5"
							color={"#fff"}
							fontWeight={600}
						>
							{location.pathname != "/" ? (
								"Flight Booking"
							) : (
								<>
									search
									<span style={whiteDot}></span>
									book
									<span style={whiteDot}></span>
									go
								</>
							)}
						</Typography>
						<div
							style={{
								position: "absolute",
								right: "200px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h5"
								color={"#fff"}
								fontWeight={400}
							>
								{backgroundImages[index].city}
							</Typography>
							<Typography
								variant="body1"
								color={"#fff"}
								fontWeight={300}
							>
								{backgroundImages[index].country}
							</Typography>
						</div>
					</Stack>
				</div>
			</Box>
		</>
	);
}
export default React.memo(BackgroundCarousel);
