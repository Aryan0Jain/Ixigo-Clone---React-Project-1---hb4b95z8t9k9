import React from "react";
import FlightsSearchDesktop from "./FlightsSearchDesktop";
import FlightSearchMobile from "./MobileComponents/FlightSearchMobile";

export default function FlightSearch() {
	return (
		<>
			{window.innerWidth > 1000 && <FlightsSearchDesktop />}
			{window.innerWidth < 1000 && <FlightSearchMobile />}
		</>
	);
}
