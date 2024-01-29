import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { FLIGHT_SEARCH_PANNEL_SPECIAL_FARES } from "../../../constants";

function SpecialFares() {
	return (
		<>
			{FLIGHT_SEARCH_PANNEL_SPECIAL_FARES.map(
				({ title, logo, header, body }) => {
					const data = (
						<Box className="flights-tooltip-overlay">
							<Stack
								direction={"row"}
								gap={"5px"}
								alignItems={"flex-start"}
								sx={{ p: "10px 15px !important" }}
							>
								<img src={logo} />{" "}
								<Typography
									fontSize={14}
									color={"rgba(0,0,0,0.85)"}
								>
									{header.pre}{" "}
									<span style={{ fontWeight: 700 }}>
										{header.mid}
									</span>{" "}
									{header.post}
								</Typography>
							</Stack>
							<Box className="tooltip-overlay-body">{body}</Box>
						</Box>
					);
					return (
						<Tooltip key={title} title={data} arrow>
							<Box className="tooltip-content">
								<img src={logo} />
								<Typography fontSize={"13px"}>
									{title}
								</Typography>
							</Box>
						</Tooltip>
					);
				}
			)}
		</>
	);
}
export default React.memo(SpecialFares);
