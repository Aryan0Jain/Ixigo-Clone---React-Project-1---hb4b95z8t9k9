import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Navbar from "./Common/Navbar.jsx";
import { ThemeProvider } from "@mui/material";
import Flights from "./Screen/Flights/Flights.jsx";
import { defaultTheme } from "../Contexts/Theme.jsx";
import Trains from "./Screen/Trains/Trains.jsx";
import AuthProvider from "../Contexts/AuthProvider.jsx";
import FlightSearch from "./Screen/Flights/Search/FlightSearch.jsx";
import SearchProvider from "../Contexts/SearchProdiver";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TrainSearchProvider from "../Contexts/TrainSearchProvider";
import TrainsSearch from "./Screen/Trains/Search/TrainsSearch.jsx";
import Footer from "./Common/Footer.jsx";
import Buses from "./Screen/Buses/Buses.jsx";
import FlightBooking from "./Screen/Flights/Booking/FlightBooking.jsx";
import TrainBooking from "./Screen/Trains/Booking/TrainBooking.jsx";
import BusSearchProvider from "../Contexts/BusSearchProvider.jsx";
import BusSearch from "./Screen/Buses/Search/BusSearch.jsx";
import BusBooking from "./Screen/Buses/Booking/BusBooking.jsx";
import Hotels from "./Screen/Hotels/Hotels.jsx";
import HotelSearchProvider from "../Contexts/HotelSearchProvider.jsx";
import HotelsSearch from "./Screen/Hotels/Search/Search.jsx";
import HotelDetail from "./Screen/Hotels/HotelDetail/HotelDetail.jsx";
import HotelBooking from "./Screen/Hotels/HotelBooking/HotelBooking.jsx";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ThemeProvider theme={defaultTheme}>
				<BrowserRouter>
					<AuthProvider>
						<SearchProvider>
							<TrainSearchProvider>
								<BusSearchProvider>
									<HotelSearchProvider>
										<Navbar />
										<Routes>
											<Route
												path="/"
												element={<Flights />}
											/>
											<Route
												path="/flights"
												element={<Flights />}
											/>
											<Route
												path="/flights/search"
												element={<FlightSearch />}
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
											<Route
												path="/hotels/search"
												element={<HotelsSearch />}
											/>
											<Route
												path="/hotels/:id"
												element={<HotelDetail />}
											/>
											<Route
												path="/hotels/booking/:details"
												element={<HotelBooking />}
											/>
										</Routes>
										<Footer />
									</HotelSearchProvider>
								</BusSearchProvider>
							</TrainSearchProvider>
						</SearchProvider>
					</AuthProvider>
				</BrowserRouter>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
