import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import flightLogo from "../../../assests/images/flight-booking.png";
import { FLIGHT_BACKGROUND_IMAGES } from "../../../constants";
import { useLocation } from "react-router-dom";

function BackgroundCarousel() {
	const [index, setIndex] = useState(Math.round(Math.random() * 4));
	const backgroundDiv = useRef();
	const location = useLocation();
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
				<Box ref={backgroundDiv} className="background-carousel-top">
					<img
						loading="lazy"
						src={FLIGHT_BACKGROUND_IMAGES[index].org}
					/>
				</Box>
				<Box className="background-carousel-bottom">
					<img
						loading="lazy"
						src={FLIGHT_BACKGROUND_IMAGES[index].con}
					/>
				</Box>
				<Box
					component={"div"}
					position={"absolute"}
					className="background-img-cover"
				></Box>
				<Box className="background-seperator"></Box>
			</Box>
			<Box>
				<div style={{ position: "relative" }}>
					<Stack direction={"row"} gap={1} className="overlay">
						<img src={flightLogo} />
						<Typography
							variant="h5"
							color={"#fff"}
							fontWeight={600}
							sx={{ display: { xs: "none", md: "initial" } }}
						>
							{location.pathname !== "/" ? (
								"Flight Booking"
							) : (
								<>
									search
									<span className="whitedot"></span>
									book
									<span className="whitedot"></span>
									go
								</>
							)}
						</Typography>
						<div className="background-image-info">
							<Typography
								variant="h5"
								color={"#fff"}
								fontWeight={400}
							>
								{FLIGHT_BACKGROUND_IMAGES[index].city}
							</Typography>
							<Typography
								variant="body1"
								color={"#fff"}
								fontWeight={300}
							>
								{FLIGHT_BACKGROUND_IMAGES[index].country}
							</Typography>
						</div>
					</Stack>
				</div>
			</Box>
		</>
	);
}
export default React.memo(BackgroundCarousel);
