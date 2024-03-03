import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Navbar from "./Common/Navbar.jsx";
import { ThemeProvider } from "@mui/material";

// To add the lazy loading the components are imported using lazy.

// import Flights from "./Screen/Flights/Flights.jsx";
// import FlightSearch from "./Screen/Flights/Search/FlightSearch.jsx";
// import FlightBooking from "./Screen/Flights/Booking/FlightBooking.jsx";
// import Trains from "./Screen/Trains/Trains.jsx";
// import TrainsSearch from "./Screen/Trains/Search/TrainsSearch.jsx";
// import TrainBooking from "./Screen/Trains/Booking/TrainBooking.jsx";
// import Buses from "./Screen/Buses/Buses.jsx";
// import BusSearch from "./Screen/Buses/Search/BusSearch.jsx";
// import BusBooking from "./Screen/Buses/Booking/BusBooking.jsx";
// import Hotels from "./Screen/Hotels/Hotels.jsx";
// import HotelsSearch from "./Screen/Hotels/Search/Search.jsx";
// import HotelDetail from "./Screen/Hotels/HotelDetail/HotelDetail.jsx";
// import HotelBooking from "./Screen/Hotels/HotelBooking/HotelBooking.jsx";
// import Payment from "./Screen/Payment/Payment.jsx";

import { defaultTheme } from "../Contexts/Theme.jsx";
import AuthProvider from "../Contexts/AuthProvider.jsx";
import SearchProvider from "../Contexts/SearchProdiver";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TrainSearchProvider from "../Contexts/TrainSearchProvider";
import Footer from "./Common/Footer.jsx";
import BusSearchProvider from "../Contexts/BusSearchProvider.jsx";
import HotelSearchProvider from "../Contexts/HotelSearchProvider.jsx";
import PaymentContextProvider from "../Contexts/PaymentContextProvider.jsx";
import GlobalLoader from "./Common/GlobalLoader.jsx";
import { Suspense, lazy } from "react";

const Flights = lazy(() => import("./Screen/Flights/Flights.jsx"));
const FlightSearch = lazy(() =>
	import("./Screen/Flights/Search/FlightSearch.jsx")
);
const FlightBooking = lazy(() =>
	import("./Screen/Flights/Booking/FlightBooking.jsx")
);
const Trains = lazy(() => import("./Screen/Trains/Trains.jsx"));
const TrainsSearch = lazy(() =>
	import("./Screen/Trains/Search/TrainsSearch.jsx")
);
const TrainBooking = lazy(() =>
	import("./Screen/Trains/Booking/TrainBooking.jsx")
);
const Buses = lazy(() => import("./Screen/Buses/Buses.jsx"));

const BusSearch = lazy(() => import("./Screen/Buses/Search/BusSearch.jsx"));
const BusBooking = lazy(() => import("./Screen/Buses/Booking/BusBooking.jsx"));
const Hotels = lazy(() => import("./Screen/Hotels/Hotels.jsx"));
const HotelsSearch = lazy(() => import("./Screen/Hotels/Search/Search.jsx"));
const HotelDetail = lazy(() =>
	import("./Screen/Hotels/HotelDetail/HotelDetail.jsx")
);
const HotelBooking = lazy(() =>
	import("./Screen/Hotels/HotelBooking/HotelBooking.jsx")
);
const Payment = lazy(() => import("./Screen/Payment/Payment.jsx"));

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
										<PaymentContextProvider>
											<Suspense
												fallback={<GlobalLoader />}
											>
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
														element={
															<FlightSearch />
														}
													/>
													<Route
														path="/flights/booking/:progress/:details"
														element={
															<FlightBooking />
														}
													/>
													<Route
														path="/trains"
														element={<Trains />}
													/>
													<Route
														path="/trains/search"
														element={
															<TrainsSearch />
														}
													/>
													<Route
														path="/trains/booking/:details"
														element={
															<TrainBooking />
														}
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
														element={
															<HotelsSearch />
														}
													/>
													<Route
														path="/hotels/:id"
														element={
															<HotelDetail />
														}
													/>
													<Route
														path="/hotels/booking/:details"
														element={
															<HotelBooking />
														}
													/>
													<Route
														path="/payment"
														element={<Payment />}
													/>
												</Routes>
												<Footer />
											</Suspense>
										</PaymentContextProvider>
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
