import React from "react";
import Box from "@mui/material/Box";
import { FLIGHT_BANNERS_OF_THE_DAY } from "../../../constants";

function BannerOfTheDay() {
	return (
		<Box className="banner">
			<img
				src={FLIGHT_BANNERS_OF_THE_DAY[Math.round(Math.random() * 4)]}
				style={{ boxShadow: "0 0 10px rgba(0,0,0,.3)" }}
			/>
		</Box>
	);
}
export default React.memo(BannerOfTheDay);
