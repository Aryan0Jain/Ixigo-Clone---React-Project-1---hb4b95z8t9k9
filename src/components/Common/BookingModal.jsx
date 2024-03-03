/************
 This is the component which will be displayed when the user
 initiates the payment.
*************/

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosThumbsUp } from "react-icons/io";
import { IoIosThumbsDown } from "react-icons/io";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	height: "fit-content",
	width: "fit-content",
};

export default function BookingModal({ bookingWait }) {
	const navigate = useNavigate();
	return (
		<Modal open={bookingWait.startWaiting} onClose={() => navigate("/")}>
			<Box sx={modalStyle}>
				{/* Loader until booking is pending */}
				{!bookingWait.recieved && (
					<div className="booking-loader">Booking</div>
				)}
				{/* If booking is successful */}
				{bookingWait.recieved &&
					bookingWait.message == "Booking successful" && (
						<Box
							sx={{
								bgcolor: "#fff",
								boxShadow: 24,
								p: 4,
								textAlign: "center",
							}}
						>
							<Typography
								fontSize={24}
								fontWeight={600}
								color="#ec5b24"
							>
								Booking successful!{" "}
								<IoIosThumbsUp color="#ec5b24" />
							</Typography>
							<Typography
								fontSize={14}
								color={"rgba(0,0,0,0.36)"}
							>
								You will be redirected to home page in a few
								seconds...
							</Typography>
							<Typography
								fontSize={14}
								color={"rgba(0,0,0,0.36)"}
							>
								If you are not redirected{" "}
								<NavLink
									to={"/"}
									style={{
										textDecoration: "none",
										color: "rgba(0,0,0,0.66)",
									}}
								>
									click here.
								</NavLink>
							</Typography>
						</Box>
					)}
				{/* If booking is failed */}
				{bookingWait.recieved &&
					bookingWait.message != "Booking successful" && (
						<Box
							sx={{
								bgcolor: "#fff",
								boxShadow: 24,
								p: 4,
								textAlign: "center",
							}}
						>
							<Typography
								fontSize={24}
								fontWeight={600}
								color="rgba(255,0,0,.88)"
							>
								OOPS! Some Error Occurred.{" "}
								<IoIosThumbsDown color="red" />
							</Typography>
							<Typography
								fontSize={14}
								color={"rgba(0,0,0,0.36)"}
							>
								Please Try again after sometime.
							</Typography>
							<Typography
								fontSize={14}
								color={"rgba(0,0,0,0.36)"}
							>
								If you are not redirected{" "}
								<NavLink
									to={"/"}
									style={{
										textDecoration: "none",
										color: "rgba(0,0,0,0.66)",
									}}
								>
									click here
								</NavLink>
							</Typography>
						</Box>
					)}
			</Box>
		</Modal>
	);
}
