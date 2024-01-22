import React from "react";
import bannerOftheDay1 from "../../assests/images/banner1.png";
import bannerOftheDay2 from "../../assests/images/banner2.png";
import bannerOftheDay3 from "../../assests/images/banner3.png";
import bannerOftheDay4 from "../../assests/images/banner4.png";
import bannerOftheDay5 from "../../assests/images/banner5.png";
import Box from "@mui/material/Box";
const bannersOfTheDay = [
	bannerOftheDay1,
	bannerOftheDay2,
	bannerOftheDay3,
	bannerOftheDay4,
	bannerOftheDay5,
];
function BannerOfTheDay() {
	return (
		<Box
			sx={{
				m: "auto",
				width: "fit-content",
				my: 5,
			}}
		>
			<img
				src={bannersOfTheDay[Math.round(Math.random() * 4)]}
				style={{ boxShadow: "0 0 10px rgba(0,0,0,.3)" }}
			/>
		</Box>
	);
}
export default React.memo(BannerOfTheDay);
