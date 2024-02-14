import {
	Box,
	Button,
	Container,
	Divider,
	Modal,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { UpiActive, Upi } from "./Upi";
import { CardActive, Card } from "./Card";
import phonepeImg from "../../../assests/images/payment/jp_phonepe.png";
import googlepayImg from "../../../assests/images/payment/jp_googlepay.png";
import paytmImg from "../../../assests/images/payment/jp_paytm.png";
import cred_logoImg from "../../../assests/images/payment/jp_cred_logo.png";
import amazonpayImg from "../../../assests/images/payment/jp_amazonpay.png";
import bhimImg from "../../../assests/images/payment/jp_bhim.png";
import qr from "../../../assests/images/payment/qr.gif";
import inputCard from "../../../assests/images/payment/jp_default_card.png";
import barcode from "../../../assests/images/payment/barcode.gif";
import { IoIosArrowBack } from "react-icons/io";
import { usePaymentContext } from "../../../Contexts/PaymentContextProvider";
import BookingModal from "../../Common/BookingModal";
import { Link, useNavigate } from "react-router-dom";
import { CURRENCY_FORMATTER } from "../../../utils";

export default function Payment() {
	const { bookingFunction, paymentIsPending, setPaymentisPending, amount } =
		usePaymentContext();
	const navigate = useNavigate();
	const [time, setTime] = useState(300);
	const [tabIndex, setTabIndex] = useState(0);
	const [bookingWait, setBookingWait] = useState({
		startWaiting: false,
		recieved: false,
		message: "",
	});
	const [generatingQR, setGeneratingQR] = useState(false);
	const [qrCodeGenerated, setQRCodeGenerated] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [upiID, setUPIID] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [cardHasError, setCardHasError] = useState(false);
	const [expiryDate, setExpiryDate] = useState("");
	const [dateHasError, setDateHasError] = useState(false);
	const [cvv, setCvv] = useState("");
	const [cvvHasError, setCvvHasError] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);
	if (time === 0) {
		if (!showErrorModal) {
			setShowErrorModal(true);
			setTimeout(() => {
				navigate("/");
			}, 5000);
		}
	}
	async function handlePay() {
		setBookingWait((prev) => {
			return { ...prev, startWaiting: true };
		});
		const message = await bookingFunction();
		setBookingWait((prev) => {
			setTimeout(() => navigate("/"), 5000);
			return { ...prev, message: message.message, recieved: true };
		});
	}
	function handleTabChange(e, v) {
		setTabIndex(v);
	}
	function unLoad() {
		setPaymentisPending(false);
	}
	function isValidCardNumber(num) {
		return num.match(/^[0-9]{16}$/);
	}
	function handleCardChange(e) {
		setCardNumber(e.target.value);
		if (e.target.value !== "" && !isValidCardNumber(e.target.value)) {
			setCardHasError(true);
		}
		if (e.target.value !== "" && isValidCardNumber(e.target.value)) {
			setCardHasError(false);
		}
	}
	function isValidExpiryDate(date) {
		return date.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);
	}
	function handleDateChange(e) {
		setExpiryDate(e.target.value);
		if (e.target.value !== "" && !isValidExpiryDate(e.target.value)) {
			setDateHasError(true);
		}
		if (e.target.value !== "" && isValidExpiryDate(e.target.value)) {
			setDateHasError(false);
		}
	}
	function isValidCVV(num) {
		return num.match(/^[0-9]{3}$/);
	}
	function handleCvvChange(e) {
		setCvv(e.target.value);
		if (e.target.value !== "" && !isValidCVV(e.target.value)) {
			setCvvHasError(true);
		}
		if (e.target.value !== "" && isValidCVV(e.target.value)) {
			setCvvHasError(false);
		}
	}
	function handleGenerateQRCode() {
		if (!generatingQR) {
			setGeneratingQR(true);
			setTimeout(() => {
				setQRCodeGenerated(true);
			}, 2000);
		}
	}
	function handleGoBack() {
		setShowModal(true);
	}
	function closeModal() {
		setShowModal(false);
	}
	function isValidUPI(upi) {
		return upi.match(/^[0-9A-Za-z.-]{2,256}@[A-Za-z]{2,64}$/);
	}
	useEffect(() => {
		if (!paymentIsPending) {
			navigate("/");
		}
		setPaymentisPending(false);
		const id = setInterval(() => {
			setTime((prev) => (prev === 0 ? 0 : prev - 1));
		}, 1000);
		// document
		return () => {
			clearInterval(id);
			unLoad();
		};
	}, []);
	const mins = ("" + Math.floor(time / 60)).padStart(2, "0");
	const secs = ("" + (time % 60)).padStart(2, "0");
	return (
		<Container sx={{ mt: 12, mb: 6 }}>
			<Stack gap={3.5} sx={{ width: "100%" }}>
				<Stack
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
					sx={{
						width: "100%",
						bgcolor: "#FFF",
						boxShadow: 5,
						p: 2,
						borderRadius: 2,
					}}
				>
					<Stack
						direction={"row"}
						gap={2}
						alignItems={"center"}
						sx={{
							bgcolor: "#fbded3",
							borderRadius: "99999px",
							px: 4,
							py: 1,
						}}
					>
						<FaRegClock size={14} color="#ec5b24" />
						<Typography fontWeight={600} fontSize={16}>
							{mins} : {secs}
						</Typography>
						<Typography fontSize={12}>
							left to complete the booking
						</Typography>
					</Stack>
					<Stack
						direction={"row"}
						justifyContent={"space-between"}
						alignItems={"center"}
						sx={{ width: "30%" }}
					>
						<Typography fontSize={14} color={"rgba(0,0,0,0.4)"}>
							AMOUNT TO PAY
						</Typography>
						<Typography fontSize={20} fontWeight={600}>
							{CURRENCY_FORMATTER("" + amount)}
						</Typography>
					</Stack>
				</Stack>
				<Stack
					direction={"row"}
					sx={{
						width: "100%",
						bgcolor: "#FFF",
						boxShadow: 5,
					}}
				>
					<Tabs
						orientation="vertical"
						value={tabIndex}
						onChange={handleTabChange}
						TabIndicatorProps={{ sx: { left: 0, width: 6 } }}
						sx={{
							width: "250px",
							display: "flex",
							justifyContent: "space-between",
							bgcolor: "#ec5b2405",
							overflow: "unset",
						}}
					>
						<Tab
							label="UPI"
							icon={tabIndex === 0 ? <UpiActive /> : <Upi />}
							iconPosition="start"
							sx={{
								width: "250px",
								display: "flex",
								gap: 2,
								justifyContent: "flex-start",
								bgcolor: tabIndex === 0 ? "#ec5b2410" : "",
								fontSize: 20,
								fontWeight: 600,
								textTransform: "none",
							}}
						/>
						<Tab
							label="Credit/Debit Card"
							icon={tabIndex === 1 ? <CardActive /> : <Card />}
							iconPosition="start"
							sx={{
								width: "250px",
								display: "flex",
								gap: 2,
								justifyContent: "flex-start",
								bgcolor: tabIndex === 1 ? "#ec5b2410" : "",
								fontSize: 20,
								fontWeight: 600,
								textTransform: "none",
							}}
						/>
					</Tabs>
					<Box
						role="tabpanel"
						hidden={tabIndex !== 0}
						sx={{ width: "100%" }}
					>
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
													Scan the QR using any UPI
													app on your mobile phone
													line PhonePe, Paytm,
													GooglePay, BHIM, etc
												</Typography>
												<Stack
													direction={"row"}
													gap={2}
												>
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
														onClick={
															handleGenerateQRCode
														}
														sx={{
															px: 3,
															backgroundColor:
																"transparent",
															background: `linear-gradient(to right, #aa1004 50%, #ec5b24 50%)`,
															backgroundSize:
																"200% 100%",
															backgroundPosition:
																generatingQR
																	? "left bottom"
																	: "right bottom",
															transition:
																"all 2s ease-out",
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
													borderColor:
														"rgba(0,0,0,0.2)",
													borderWidth: "1.25px",
												},
												"&::after": {
													borderColor:
														"rgba(0,0,0,0.2)",
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
												onChange={(e) =>
													setUPIID(e.target.value)
												}
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
													transform:
														"translate(-50%, -50%)",
													width: "fit-content",
													bgcolor: "background.paper",
													boxShadow: 24,
													p: 5,
													textAlign: "center",
													borderRadius: 2,
												}}
											>
												<Typography
													sx={{ mb: 2 }}
													fontSize={18}
												>
													Do you want to cancel the
													transaction?
												</Typography>
												<Stack
													direction={"row"}
													justifyContent={
														"space-between"
													}
												>
													<Button
														onClick={() => {
															closeModal();
															setQRCodeGenerated(
																false
															);
															setGeneratingQR(
																false
															);
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
											<Typography>
												Scan QR and Pay
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
											<Typography
												fontSize={14}
												fontWeight={600}
												textAlign={"center"}
											>
												Scan the QR using any UPI app on
												your mobile phone line PhonePe,
												Paytm, GooglePay, BHIM, etc
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
					<Box
						role="tabpanel"
						hidden={tabIndex !== 1}
						sx={{ width: "100%" }}
					>
						{tabIndex === 1 && (
							<Stack
								gap={3}
								alignItems={"flex-start"}
								sx={{ my: 3, width: "100%" }}
							>
								<Typography sx={{ px: 3 }}>
									Enter Credit / Debit Card Details
								</Typography>
								<Divider flexItem />
								<TextField
									error={cardHasError}
									label="Card Number"
									placeholder="Enter Card Number"
									variant="standard"
									helperText={
										cardHasError
											? "Card number is either not of 16 digits or it is non-numeric"
											: ""
									}
									sx={{ ml: 3, width: 400 }}
									InputLabelProps={{ shrink: true }}
									value={cardNumber}
									onChange={handleCardChange}
									InputProps={{
										endAdornment: (
											<img
												src={inputCard}
												style={{
													width: "30px",
													objectFit: "contain",
												}}
											/>
										),
									}}
								/>
								<Stack direction={"row"} gap={2} sx={{ px: 3 }}>
									<TextField
										error={dateHasError}
										helperText={
											dateHasError ? "Invalid Date" : ""
										}
										label="Expiry Date"
										placeholder="MM/YY"
										variant="standard"
										value={expiryDate}
										onChange={handleDateChange}
										InputLabelProps={{ shrink: true }}
									/>
									<TextField
										error={cvvHasError}
										helperText={
											cvvHasError ? "Invalid CVV" : ""
										}
										type="password"
										label="CVV"
										placeholder="XXX"
										variant="standard"
										InputLabelProps={{ shrink: true }}
										value={cvv}
										onChange={handleCvvChange}
									/>
								</Stack>
								<Button
									disabled={
										!(
											isValidCardNumber(cardNumber) &&
											isValidExpiryDate(expiryDate) &&
											isValidCVV(cvv)
										)
									}
									disableRipple
									variant="contained"
									onClick={handlePay}
									size="large"
									sx={{ ml: 3, px: 3 }}
								>
									Pay
								</Button>
							</Stack>
						)}
					</Box>
				</Stack>
			</Stack>
			<BookingModal {...{ bookingWait }} />
			<Modal open={showErrorModal}>
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
					<Typography fontSize={20} color={"#ec5b24"} sx={{ mb: 2 }}>
						OOPS! Session Timed Out.
					</Typography>
					<Typography fontWeight={500} sx={{ mb: 2 }}>
						Please try again later
					</Typography>
					<Typography color={"rgba(0,0,0,0.5)"} fontSize={12}>
						If you are not redirected to home page,{" "}
						<Link to="/" style={{ color: "rgba(0, 0, 0, 0.8)" }}>
							click here
						</Link>
					</Typography>
				</Box>
			</Modal>
		</Container>
	);
}
