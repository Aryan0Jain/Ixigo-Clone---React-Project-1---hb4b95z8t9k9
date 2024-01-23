import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import busBG from "../../assests/images/bus-banner.webp";
import { IoSwapHorizontal } from "react-icons/io5";
import { FaBusAlt } from "react-icons/fa";
import BusOffersCarousel from "./BusOffersCarousel";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
export default function Buses() {
	return (
		<Box sx={{ mt: 8.2 }}>
			<Stack
				position={"relative"}
				sx={{
					backgroundImage: `url(${busBG})`,
					minHeight: "428px",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<Typography position={"absolute"} top={"100px"} variant="h4">
					Book Bus Tickets
				</Typography>
				<Stack
					direction={"row"}
					sx={{
						bgcolor: "#fff",
						width: "fit-cintent",
						mx: "auto",
						p: 3,
						borderRadius: "15px",
					}}
				>
					<StationInputField />
					<IoSwapHorizontal />
					<StationInputField />
					<DatePicker
						// ref={departureRef}
						sx={{ width: 200 }}
						slotProps={{
							textField: {
								variant: "standard",
								InputLabelProps: { shrink: true },
							},
						}}
						disablePast
						label="Departure"
						reduceAnimations
						maxDate={new dayjs().add(120, "day")}
						// value={departureDate}
						onChange={(val) => {
							setDepartureDate(val);
							setAnchorEl(null);
						}}
					/>
					<Button variant="contained">Search</Button>
				</Stack>
			</Stack>
			<BusOffersCarousel />
		</Box>
	);
}
function StationInputField() {
	return (
		<Box
			sx={{
				display: "flex",
				border: "1px solid rgba(0,0,0,0.1)",
				borderRadius: "15px",
				alignItems: "center",
				height: "fit-content",
				p: 1,
			}}
		>
			<Autocomplete
				disableClearable
				disablePortal
				autoComplete
				defaultValue={top100Films[4]}
				options={top100Films}
				sx={{
					width: 300,
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
							startAdornment: (
								<InputAdornment position="start">
									<FaBusAlt />
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
const top100Films = [
	{ label: "The Shawshank Redemption", year: 1994 },
	{ label: "The Godfather", year: 1972 },
	{ label: "The Godfather: Part II", year: 1974 },
	{ label: "The Dark Knight", year: 2008 },
	{ label: "12 Angry Men", year: 1957 },
	{ label: "Schindler's List", year: 1993 },
	{ label: "Pulp Fiction", year: 1994 },
	{
		label: "The Lord of the Rings: The Return of the King",
		year: 2003,
	},
	{ label: "The Good, the Bad and the Ugly", year: 1966 },
	{ label: "Fight Club", year: 1999 },
	{
		label: "The Lord of the Rings: The Fellowship of the Ring",
		year: 2001,
	},
	{
		label: "Star Wars: Episode V - The Empire Strikes Back",
		year: 1980,
	},
	{ label: "Forrest Gump", year: 1994 },
	{ label: "Inception", year: 2010 },
	{
		label: "The Lord of the Rings: The Two Towers",
		year: 2002,
	},
	{ label: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ label: "Goodfellas", year: 1990 },
	{ label: "The Matrix", year: 1999 },
	{ label: "Seven Samurai", year: 1954 },
	{
		label: "Star Wars: Episode IV - A New Hope",
		year: 1977,
	},
	{ label: "City of God", year: 2002 },
	{ label: "Se7en", year: 1995 },
	{ label: "The Silence of the Lambs", year: 1991 },
	{ label: "It's a Wonderful Life", year: 1946 },
	{ label: "Life Is Beautiful", year: 1997 },
	{ label: "The Usual Suspects", year: 1995 },
	{ label: "Léon: The Professional", year: 1994 },
	{ label: "Spirited Away", year: 2001 },
	{ label: "Saving Private Ryan", year: 1998 },
	{ label: "Once Upon a Time in the West", year: 1968 },
	{ label: "American History X", year: 1998 },
	{ label: "Interstellar", year: 2014 },
	{ label: "Casablanca", year: 1942 },
	{ label: "City Lights", year: 1931 },
	{ label: "Psycho", year: 1960 },
	{ label: "The Green Mile", year: 1999 },
	{ label: "The Intouchables", year: 2011 },
	{ label: "Modern Times", year: 1936 },
	{ label: "Raiders of the Lost Ark", year: 1981 },
	{ label: "Rear Window", year: 1954 },
	{ label: "The Pianist", year: 2002 },
	{ label: "The Departed", year: 2006 },
	{ label: "Terminator 2: Judgment Day", year: 1991 },
	{ label: "Back to the Future", year: 1985 },
	{ label: "Whiplash", year: 2014 },
	{ label: "Gladiator", year: 2000 },
	{ label: "Memento", year: 2000 },
	{ label: "The Prestige", year: 2006 },
	{ label: "The Lion King", year: 1994 },
	{ label: "Apocalypse Now", year: 1979 },
	{ label: "Alien", year: 1979 },
	{ label: "Sunset Boulevard", year: 1950 },
	{
		label: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
		year: 1964,
	},
	{ label: "The Great Dictator", year: 1940 },
	{ label: "Cinema Paradiso", year: 1988 },
	{ label: "The Lives of Others", year: 2006 },
	{ label: "Grave of the Fireflies", year: 1988 },
	{ label: "Paths of Glory", year: 1957 },
	{ label: "Django Unchained", year: 2012 },
	{ label: "The Shining", year: 1980 },
	{ label: "WALL·E", year: 2008 },
	{ label: "American Beauty", year: 1999 },
	{ label: "The Dark Knight Rises", year: 2012 },
	{ label: "Princess Mononoke", year: 1997 },
	{ label: "Aliens", year: 1986 },
	{ label: "Oldboy", year: 2003 },
	{ label: "Once Upon a Time in America", year: 1984 },
	{ label: "Witness for the Prosecution", year: 1957 },
	{ label: "Das Boot", year: 1981 },
	{ label: "Citizen Kane", year: 1941 },
	{ label: "North by Northwest", year: 1959 },
	{ label: "Vertigo", year: 1958 },
	{
		label: "Star Wars: Episode VI - Return of the Jedi",
		year: 1983,
	},
	{ label: "Reservoir Dogs", year: 1992 },
	{ label: "Braveheart", year: 1995 },
	{ label: "M", year: 1931 },
	{ label: "Requiem for a Dream", year: 2000 },
	{ label: "Amélie", year: 2001 },
	{ label: "A Clockwork Orange", year: 1971 },
	{ label: "Like Stars on Earth", year: 2007 },
	{ label: "Taxi Driver", year: 1976 },
	{ label: "Lawrence of Arabia", year: 1962 },
	{ label: "Double Indemnity", year: 1944 },
	{
		label: "Eternal Sunshine of the Spotless Mind",
		year: 2004,
	},
	{ label: "Amadeus", year: 1984 },
	{ label: "To Kill a Mockingbird", year: 1962 },
	{ label: "Toy Story 3", year: 2010 },
	{ label: "Logan", year: 2017 },
	{ label: "Full Metal Jacket", year: 1987 },
	{ label: "Dangal", year: 2016 },
	{ label: "The Sting", year: 1973 },
	{ label: "2001: A Space Odyssey", year: 1968 },
	{ label: "Singin' in the Rain", year: 1952 },
	{ label: "Toy Story", year: 1995 },
	{ label: "Bicycle Thieves", year: 1948 },
	{ label: "The Kid", year: 1921 },
	{ label: "Inglourious Basterds", year: 2009 },
	{ label: "Snatch", year: 2000 },
	{ label: "3 Idiots", year: 2009 },
	{ label: "Monty Python and the Holy Grail", year: 1975 },
];
