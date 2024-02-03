import { Container, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { LOCATIONS, POPULAR_DESTINATIONS } from "../../../constants";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useHotelSearchContext } from "../../../Contexts/HotelSearchProvider";
const PopularDestinations = () => {
	const [index, setIndex] = useState(0);
	const navigate = useNavigate();
	const { setLocation } = useHotelSearchContext();
	function setPrevIndex() {
		if (index > 0) setIndex((prev) => prev - 1);
	}
	function setNextIndex() {
		if (index < 3) setIndex((prev) => prev + 1);
	}
	function handleCardClick(city) {
		setLocation(LOCATIONS.findIndex((item) => item.city === city));
		const url = `/hotels/search?location=${city}&from=${new dayjs()
			.add(7, "day")
			.toJSON()}&to=${new dayjs()
			.add(8, "day")
			.toJSON()}&guests=${2}&rooms=${1}`;
		navigate(url);
	}
	return (
		<Container
			sx={{ my: "30px", overflow: "hidden", pt: 3, position: "relative" }}
		>
			{index > 0 && (
				<IconButton
					onClick={setPrevIndex}
					disableRipple
					sx={{
						bgcolor: "#fff",
						position: "absolute",
						left: "50px",
						top: "185px",
						zIndex: 1,
						padding: "8px",
						boxShadow: "0px 4px 5px 2px rgba(0, 0, 0, 0.3)",
					}}
				>
					<IoIosArrowBack color="rgba(7,112,228,.7)" size="18" />
				</IconButton>
			)}
			{index < 3 && (
				<IconButton
					onClick={setNextIndex}
					disableRipple
					sx={{
						bgcolor: "#fff",
						position: "absolute",
						right: "50px",
						top: "185px",
						zIndex: 1,
						padding: "8px",
						boxShadow: "0px 4px 5px 2px rgba(0, 0, 0, 0.3)",
					}}
				>
					<IoIosArrowForward color="rgba(7,112,228,.7)" size="18" />
				</IconButton>
			)}
			<Typography fontSize={22} fontWeight={700}>
				Popular Destinations
			</Typography>
			<Stack
				gap={5}
				direction={"row"}
				sx={{
					transform: `translateX(${index * -280}px)`,
					transition: "0.5s transform",
					mt: 3,
				}}
			>
				{POPULAR_DESTINATIONS.map(({ city, state, img }) => {
					return (
						<Stack
							key={city}
							sx={{
								width: 240,
								height: 300,
								position: "relative",
								textAlign: "center",
								alignItems: "center",
								justifyContent: "flex-end",
								background:
									"linear-gradient(0deg,rgba(0,0,0,.4),transparent)",
								overflow: "hidden",
								borderRadius: "20px",
								flexShrink: 0,
								color: "#FFF",
								cursor: "pointer",
							}}
							onClick={() => handleCardClick(city)}
							className="hotel-popular-destination"
						>
							<img
								loading="lazy"
								src={img}
								style={{
									position: "absolute",
									height: "100%",
									zIndex: -1,
								}}
							/>
							<Typography fontSize={20}>{city}</Typography>
							<Typography fontSize={12} sx={{ mb: 2 }}>
								{state}
							</Typography>
						</Stack>
					);
				})}
			</Stack>
		</Container>
	);
};
export default React.memo(PopularDestinations);
