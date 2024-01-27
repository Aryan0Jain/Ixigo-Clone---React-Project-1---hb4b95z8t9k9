import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Navbar from "./Navbar";
import { ThemeProvider } from "@mui/material";
import Flights from "./Flights/Flights";
import { defaultTheme } from "./Contexts/Theme.jsx";
import Trains from "./Trains/Trains.jsx";
import AuthProvider from "./Contexts/AuthProvider";
import Search from "./Flights/Search";
import SearchProvider from "./Contexts/SearchProdiver";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TrainSearchProvider from "./Contexts/TrainSearchProvider";
import TrainsSearch from "./Trains/TrainsSearch.jsx";
import Footer from "./Footer";
import Buses from "./Buses/Buses.jsx";
import FlightBooking from "./Flights/FlightBooking.jsx";
import TrainBooking from "./Trains/Booking/TrainBooking.jsx";
import BusSearchProvider from "./Contexts/BusSearchProvider.jsx";
import BusSearch from "./Buses/Search/BusSearch.jsx";
import BusBooking from "./Buses/Search/Booking/BusBooking.jsx";
import Hotels from "./Hotels/Hotels.jsx";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<BrowserRouter>
				<ThemeProvider theme={defaultTheme}>
					<AuthProvider>
						<SearchProvider>
							<TrainSearchProvider>
								<BusSearchProvider>
									<Navbar />
									<Routes>
										<Route path="/" element={<Flights />} />
										<Route
											path="/flights"
											element={<Flights />}
										/>
										<Route
											path="/flights/search"
											element={<Search />}
										/>
										<Route
											path="/flights/booking/:progress/:details"
											element={<FlightBooking />}
										/>
										<Route
											path="/trains"
											element={<Trains />}
										/>
										<Route
											path="/trains/search"
											element={<TrainsSearch />}
										/>
										<Route
											path="/trains/booking/:details"
											element={<TrainBooking />}
										/>
										<Route
											path="/buses"
											element={<Buses />}
										/>
										<Route
											path="/buses/search"
											element={<BusSearch />}
										/>
										<Route
											path="/buses/booking/:details"
											element={<BusBooking />}
										/>
										<Route
											path="/hotels"
											element={<Hotels />}
										/>
									</Routes>
									<Footer />
								</BusSearchProvider>
							</TrainSearchProvider>
						</SearchProvider>
					</AuthProvider>
				</ThemeProvider>
			</BrowserRouter>
		</LocalizationProvider>
	);
}

export default App;
