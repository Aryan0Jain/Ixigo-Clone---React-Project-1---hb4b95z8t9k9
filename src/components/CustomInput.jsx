import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

const CustomInput = React.forwardRef(
	(
		{
			type = "text",
			value,
			setValue,
			label,
			placeholder,
			crossDefaulFill = "rgba(0, 0, 0, 0.5)",
			crossHoverFill = "black",
			setDefault,
		},
		ref
	) => {
		const { airports, passengers } = useSearchContext();
		return (
			<>
				{type == "text" && (
					<Autocomplete
						sx={{ width: "200px" }}
						freeSolo
						disablePortal
						openOnFocus
						options={airports}
						defaultValue={airports[setDefault]}
						ref={ref}
						getOptionLabel={(option) =>
							option.iata_code + " - " + option.city
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label={label}
								type={type}
								variant="standard"
								placeholder={placeholder}
								InputLabelProps={{ shrink: true }}
							/>
						)}
						renderOption={(props, option) => {
							const { iata_code, name, city, country } = option;
							return (
								<Stack
									{...props}
									sx={{
										width: 320,
										"&:hover": {
											borderLeft:
												"2px soild #ec5b24 !important",
										},
									}}
								>
									<Typography sx={{ mx: 0 }}>
										{iata_code} - {city}, {country}
									</Typography>
									<Typography
										fontSize={"12px"}
										color="rgba(0,0,0,0.6)"
									>
										{name}
									</Typography>
								</Stack>
							);
						}}
					/>
				)}
				{type == "date" && (
					<TextField
						sx={{ width: 200 }}
						label={label}
						variant="standard"
						inputRef={ref}
						defaultValue={setDefault}
						type={type}
						placeholder={placeholder}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				)}
				{type == "number" && (
					<Autocomplete
						sx={{ width: "200px" }}
						disablePortal
						openOnFocus
						defaultValue={passengers[setDefault]}
						ref={ref}
						options={passengers}
						getOptionLabel={(option) =>
							option + " Passenger" + (option == 1 ? "" : "s")
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label={label}
								variant="standard"
								placeholder={placeholder}
								InputLabelProps={{ shrink: true }}
							/>
						)}
						renderOption={(props, option) => {
							return (
								<Typography {...props}>
									{option} Passenger{option == 1 ? "" : "s"}
								</Typography>
							);
						}}
					/>
				)}
			</>
		);
	}
);

export default CustomInput;
