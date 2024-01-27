import { forwardRef } from "react";
import { useBusSearchContext } from "../Contexts/BusSearchProvider";
import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material";

const BusCityInput = forwardRef(
	(
		{
			Icon,
			placeholder,
			value,
			setValue,
			removeError,
			bgColor,
			borderRadius,
		},
		ref
	) => {
		const { cities } = useBusSearchContext();
		return (
			<Box
				sx={{
					display: "flex",
					border: "1px solid rgba(0,0,0,0.1)",
					borderRadius: borderRadius ?? "15px",
					alignItems: "center",
					height: "fit-content",
					py: 0.75,
					px: 1,
					background: bgColor,
				}}
			>
				<Autocomplete
					ref={ref}
					disableClearable
					disablePortal
					autoComplete
					options={cities}
					value={cities[value]}
					onChange={(e, v) => {
						removeError();
						setValue(cities.findIndex((item) => item == v));
					}}
					componentsProps={{
						paper: {
							sx: {
								position: "absolute",
								top: 10,
								width: 250,
								left: 50,
							},
						},
					}}
					sx={{
						px: 2,
						width: 250,
						"& svg": {
							color: "#000000",
						},
						"&.Mui-focused svg": {
							color: "#ec5b24",
						},
					}}
					renderInput={(params) => (
						<TextField
							variant="standard"
							{...params}
							sx={{
								border: "none",
								outline: "none",
							}}
							InputProps={{
								...params.InputProps,
								placeholder: placeholder,
								startAdornment: (
									<InputAdornment position="start">
										<Icon />
									</InputAdornment>
								),
								disableUnderline: true,
							}}
							// label="Movie"
						/>
					)}
				/>
			</Box>
		);
	}
);
export default BusCityInput;
