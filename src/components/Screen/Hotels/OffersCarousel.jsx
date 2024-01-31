import { Container, IconButton, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { HOTEL_OFFERS_CAROUSEL } from "../../../constants";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const OffersCarousel = () => {
	const [translate, setTranslate] = useState(0);
	const containerRef = useRef();
	function moveRight() {
		if (
			translate >
			-(
				HOTEL_OFFERS_CAROUSEL.length * 400 -
				containerRef.current.offsetWidth
			)
		)
			setTranslate((prev) => prev - 400);
	}
	function moveLeft() {
		if (translate < 0) setTranslate((prev) => prev + 400);
	}
	return (
		<Container
			sx={{
				overflow: "hidden",
				position: "relative",
				mt: "45px",
				// py: 10,
			}}
		>
			{translate < 0 && (
				<IconButton
					onClick={moveLeft}
					disableRipple
					sx={{
						bgcolor: "#fff",
						position: "absolute",
						left: "50px",
						top: "85px",
						zIndex: 1,
						padding: "8px",
						boxShadow: "0px 4px 5px 2px rgba(0, 0, 0, 0.3)",
					}}
				>
					<IoIosArrowBack color="rgba(7,112,228,.7)" size="18" />
				</IconButton>
			)}
			{translate >
				-(
					HOTEL_OFFERS_CAROUSEL.length * 400 -
					(containerRef.current
						? containerRef.current.offsetWidth
						: 0)
				) && (
				<IconButton
					onClick={moveRight}
					disableRipple
					sx={{
						bgcolor: "#fff",
						position: "absolute",
						right: "50px",
						top: "85px",
						zIndex: 1,
						padding: "8px",
						boxShadow: "0px 4px 5px 2px rgba(0, 0, 0, 0.3)",
					}}
				>
					<IoIosArrowForward color="rgba(7,112,228,.7)" size="18" />
				</IconButton>
			)}
			<Typography fontWeight={700} fontSize={22}>
				Why Book Hotels With ixigo?
			</Typography>
			<Stack
				ref={containerRef}
				direction={"row"}
				gap="40px"
				sx={{
					width: "100%",
					my: "20px",
					transform: `translateX(${translate}px)`,
					transition: "0.5s transform",
					whiteSpace: "nowrap",
				}}
			>
				{HOTEL_OFFERS_CAROUSEL.map(({ src }, index) => {
					return (
						<img
							key={index}
							loading="lazy"
							src={src}
							style={{ width: 360, borderRadius: 20 }}
						/>
					);
				})}
			</Stack>
		</Container>
	);
};
export default React.memo(OffersCarousel);
