import {
	Box,
	Button,
	Divider,
	Modal,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import phonepeImg from "../../../assests/images/payment/jp_phonepe.png";
import googlepayImg from "../../../assests/images/payment/jp_googlepay.png";
import paytmImg from "../../../assests/images/payment/jp_paytm.png";
import cred_logoImg from "../../../assests/images/payment/jp_cred_logo.png";
import amazonpayImg from "../../../assests/images/payment/jp_amazonpay.png";
import bhimImg from "../../../assests/images/payment/jp_bhim.png";
import qr from "../../../assests/images/payment/qr.gif";
import barcode from "../../../assests/images/payment/barcode.gif";
import { IoIosArrowBack } from "react-icons/io";
export default function UpiTab({
	tabIndex,
	qrCodeGenerated,
	showModal,
	handleGenerateQRCode,
	generatingQR,
	setShowModal,
	handlePay,
	time,
	mins,
	secs,
	setQRCodeGenerated,
	setGeneratingQR,
}) {
	const [upiID, setUPIID] = useState("");
	function handleGoBack() {
		setShowModal(true);
	}
	function closeModal() {
		setShowModal(false);
	}
	function isValidUPI(upi) {
		return upi.match(/^[0-9A-Za-z.-]{2,256}@[A-Za-z]{2,64}$/);
	}
	return (
		<Box role="tabpanel" hidden={tabIndex !== 0} sx={{ width: "100%" }}>
			{tabIndex === 0 && (
				<>
					{!qrCodeGenerated && (
						<Stack>
							<Stack
								direction={"row"}
								justifyContent={"space-between"}
							>
								<Stack
									gap={2}
									sx={{ p: 3 }}
									alignItems={"flex-start"}
								>
									<Typography fontWeight={600}>
										Pay by an UPI app
									</Typography>
									<Typography
										fontSize={14}
										color={"rgba(0,0,0,0.6)"}
									>
										Scan the QR using any UPI app on your
										mobile phone line PhonePe, Paytm,
										GooglePay, BHIM, etc
									</Typography>
									<Stack direction={"row"} gap={2}>
										{[
											phonepeImg,
											googlepayImg,
											paytmImg,
											cred_logoImg,
											amazonpayImg,
											bhimImg,
										].map((src, index) => {
											return (
												<img
													src={src}
													key={index}
													alt={src}
													style={{
														width: "32px",
													}}
												/>
											);
										})}
									</Stack>
									<Box>
										<Button
											disableRipple
											variant="contained"
											onClick={handleGenerateQRCode}
											sx={{
												px: 3,
												backgroundColor: "transparent",
												background: `linear-gradient(to right, #aa1004 50%, #ec5b24 50%)`,
												backgroundSize: "200% 100%",
												backgroundPosition: generatingQR
													? "left bottom"
													: "right bottom",
												transition: "all 2s ease-out",
												cursor: generatingQR
													? "default"
													: "pointer",
											}}
										>
											{generatingQR
												? "Generating QR"
												: "Generate QR Code"}
										</Button>
									</Box>
								</Stack>
								<img
									src={qr}
									style={{
										width: "30%",
										objectFit: "contain",
									}}
								/>
							</Stack>
							<Divider
								flexItem
								orientation="horizontal"
								sx={{
									fontSize: "13px",
									color: "rgba(0,0,0,0.3)",
									"&::before": {
										borderColor: "rgba(0,0,0,0.2)",
										borderWidth: "1.25px",
									},
									"&::after": {
										borderColor: "rgba(0,0,0,0.2)",
										borderWidth: "1.25px",
									},
								}}
							>
								OR
							</Divider>
							<Stack
								gap={1.5}
								sx={{ p: 3 }}
								alignItems={"flex-start"}
							>
								<Typography color={"#ec5b24"}>
									UPI ID / VPA
								</Typography>
								<TextField
									variant="standard"
									InputLabelProps={{
										shrink: true,
									}}
									helperText="A collect request will be sent to this UPI ID"
									placeholder="Username@bankname"
									sx={{ width: 400 }}
									FormHelperTextProps={{
										sx: { fontSize: "16px" },
									}}
									value={upiID}
									onChange={(e) => setUPIID(e.target.value)}
								/>
								<Button
									disableRipple
									disabled={!isValidUPI(upiID)}
									variant="contained"
									onClick={handlePay}
									sx={{ px: 5 }}
								>
									Verify and Pay
								</Button>
							</Stack>
						</Stack>
					)}
					{qrCodeGenerated && (
						<Stack
							sx={{
								mt: 2,
								mb: 4,
								px: 2,
								width: "100%",
							}}
							gap={3}
						>
							<Stack
								direction={"row"}
								gap={2}
								alignItems={"center"}
								sx={{
									p: 2,
									width: "fit-content",
									cursor: "pointer",
									":hover": {
										bgcolor: "rgba(0,0,0,0.05)",
									},
									borderRadius: 1,
									transition: "background 200ms",
								}}
								onClick={() => {
									handleGoBack();
								}}
							>
								<IoIosArrowBack
									size={24}
									color="rgba(0,0,0,0.6)"
								/>
								<Typography
									fontSize={16}
									color="rgba(0,0,0,0.8)"
								>
									Go Back
								</Typography>
							</Stack>
							<Modal open={showModal}>
								<Box
									sx={{
										position: "absolute",
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
										width: "fit-content",
										bgcolor: "background.paper",
										boxShadow: 24,
										p: 5,
										textAlign: "center",
										borderRadius: 2,
									}}
								>
									<Typography sx={{ mb: 2 }} fontSize={18}>
										Do you want to cancel the transaction?
									</Typography>
									<Stack
										direction={"row"}
										justifyContent={"space-between"}
									>
										<Button
											onClick={() => {
												closeModal();
												setQRCodeGenerated(false);
												setGeneratingQR(false);
											}}
										>
											Yes
										</Button>
										<Button
											variant="contained"
											onClick={() => {
												closeModal();
											}}
										>
											No
										</Button>
									</Stack>
								</Box>
							</Modal>
							<Stack
								gap={1.5}
								alignItems={"center"}
								sx={{
									width: "100%",
									width: 350,
									mx: "auto",
								}}
							>
								<img
									src={barcode}
									alt="barcode to scan"
									style={{
										width: 250,
									}}
								/>
								<Typography>Scan QR and Pay</Typography>
								<Stack direction={"row"} gap={2}>
									{[
										phonepeImg,
										googlepayImg,
										paytmImg,
										cred_logoImg,
										amazonpayImg,
										bhimImg,
									].map((src, index) => {
										return (
											<img
												src={src}
												key={index}
												alt={src}
												style={{
													width: "32px",
												}}
											/>
										);
									})}
								</Stack>
								<Typography
									fontSize={14}
									fontWeight={600}
									textAlign={"center"}
								>
									Scan the QR using any UPI app on your mobile
									phone line PhonePe, Paytm, GooglePay, BHIM,
									etc
								</Typography>
							</Stack>
							<Stack gap={1} alignItems={"center"}>
								<Button
									variant="contained"
									disableRipple
									sx={{ mb: 2 }}
									onClick={handlePay}
								>
									Pay
								</Button>
								<Box
									sx={{
										width: "100%",
										height: 5,
										bgcolor: "rgba(0,0,0,0.1)",
										borderRadius: 2,
									}}
								>
									<Box
										sx={{
											width: `${time / 3}%`,
											height: "100%",
											bgcolor: "#ec5b24",
											borderRadius: 2,
											transition: "all 1s",
										}}
									></Box>
								</Box>
								<Typography>
									Approve Payment within:{" "}
									<span>
										{mins}:{secs}
									</span>
								</Typography>
							</Stack>
						</Stack>
					)}
				</>
			)}
		</Box>
	);
}
