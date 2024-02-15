import { Box, Divider, TextField, Typography } from "@mui/material";
import React from "react";

export default function CardTab() {
	return (
		<Box role="tabpanel" hidden={tabIndex !== 1} sx={{ width: "100%" }}>
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
							helperText={dateHasError ? "Invalid Date" : ""}
							label="Expiry Date"
							placeholder="MM/YY"
							variant="standard"
							value={expiryDate}
							onChange={handleDateChange}
							InputLabelProps={{ shrink: true }}
						/>
						<TextField
							error={cvvHasError}
							helperText={cvvHasError ? "Invalid CVV" : ""}
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
	);
}
