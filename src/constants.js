import flightSVG from "./assests/svgs/flight.svg";
import trainSVG from "./assests/svgs/train.svg";
import busSVG from "./assests/svgs/bus.svg";
import hotelSVG from "./assests/svgs/hotel.svg";
import { BiSolidBlanket } from "react-icons/bi";
import { FaBottleWater } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { FaPlug } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { WiSunrise } from "react-icons/wi";
import { IoSunny } from "react-icons/io5";
import { IoPartlySunny } from "react-icons/io5";
import { FaCloudMoon } from "react-icons/fa6";
import offerImg1 from "./assests/images/busoffers/1.webp";
import offerImg2 from "./assests/images/busoffers/2.webp";
import offerImg3 from "./assests/images/busoffers/3.jpeg";
import offerImg4 from "./assests/images/busoffers/4.webp";
import offerImg5 from "./assests/images/busoffers/5.webp";
import offerImg6 from "./assests/images/busoffers/6.webp";
import offerImg7 from "./assests/images/busoffers/7.webp";
import offerImg8 from "./assests/images/busoffers/8.webp";
import offerImg9 from "./assests/images/busoffers/9.webp";
import offerImg10 from "./assests/images/busoffers/10.webp";
import offerImg11 from "./assests/images/busoffers/11.jpg";
import offerImg12 from "./assests/images/busoffers/12.webp";
import offerImg13 from "./assests/images/busoffers/13.webp";
import offerImg14 from "./assests/images/busoffers/14.webp";
import locationImg1Con from "./assests/images/homePage/banner-agra-con.webp";
import locationImg1Org from "./assests/images/homePage/banner-agra-org.webp";
import locationImg2Con from "./assests/images/homePage/banner-bali-indonesia-con.webp";
import locationImg2Org from "./assests/images/homePage/banner-bali-indonesia-org.webp";
import locationImg3Con from "./assests/images/homePage/banner-kochi-con.webp";
import locationImg3Org from "./assests/images/homePage/banner-kochi-org.webp";
import locationImg4Con from "./assests/images/homePage/banner-london-unitedKingdom-con.webp";
import locationImg4Org from "./assests/images/homePage/banner-london-unitedKingdom-org.webp";
import locationImg5Con from "./assests/images/homePage/banner-udaipur-india-con.webp";
import locationImg5Org from "./assests/images/homePage/banner-udaipur-india-org.webp";
import bannerOftheDay1 from "./assests/images/banner1.png";
import bannerOftheDay2 from "./assests/images/banner2.png";
import bannerOftheDay3 from "./assests/images/banner3.png";
import bannerOftheDay4 from "./assests/images/banner4.png";
import bannerOftheDay5 from "./assests/images/banner5.png";
import img1 from "./assests/images/offers/1.webp";
import img2 from "./assests/images/offers/2.webp";
import img3 from "./assests/images/offers/3.webp";
import img4 from "./assests/images/offers/4.webp";
import img5 from "./assests/images/offers/5.webp";
import img6 from "./assests/images/offers/6.webp";
import img7 from "./assests/images/offers/7.webp";
import img8 from "./assests/images/offers/8.webp";
import img9 from "./assests/images/offers/9.webp";
import img10 from "./assests/images/offers/10.webp";
import img11 from "./assests/images/offers/11.webp";
import specialFareSVG1 from "./assests/images/homePage/student.svg";
import specialFareSVG2 from "./assests/images/homePage/seniorCitizen.svg";
import specialFareSVG3 from "./assests/images/homePage/armedForces.svg";
import hotelOffer1 from "./assests/images/hotel-carousel/1.png";
import hotelOffer2 from "./assests/images/hotel-carousel/2.png";
import hotelOffer3 from "./assests/images/hotel-carousel/3.png";
import hotelOffer4 from "./assests/images/hotel-carousel/4.png";
import hotelOffer5 from "./assests/images/hotel-carousel/5.png";
import hotelOffer6 from "./assests/images/hotel-carousel/6.png";
import popularDestinationImg1 from "./assests/images/hotel-popular-destinations/1.jpeg";
import popularDestinationImg2 from "./assests/images/hotel-popular-destinations/2.jpeg";
import popularDestinationImg3 from "./assests/images/hotel-popular-destinations/3.jpeg";
import popularDestinationImg4 from "./assests/images/hotel-popular-destinations/4.jpeg";
import popularDestinationImg5 from "./assests/images/hotel-popular-destinations/5.jpeg";
import popularDestinationImg6 from "./assests/images/hotel-popular-destinations/6.jpeg";
import popularDestinationImg7 from "./assests/images/hotel-popular-destinations/7.jpeg";
import popularDestinationImg8 from "./assests/images/hotel-popular-destinations/8.jpeg";
import { MdSpa } from "react-icons/md";
import { MdRestaurantMenu } from "react-icons/md";
import { MdLocalBar } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdPool } from "react-icons/md";

export const projectID = "hb4b95z8t9k9";
export const appType = "bookingportals";
export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const FLGIHT_DEPARTURE_TIME_RANGES = [
	{ name: "Early Morning", range: "00:00 - 06:00", value: "early-morning" },
	{ name: "Morning", range: "06:00 - 12:00", value: "morning" },
	{ name: "Mid Day", range: "12:00 - 18:00", value: "mid-day" },
	{ name: "Night", range: "18:00 - 24:00", value: "night" },
];
export const HOTEL_AMENITIES = [
	{ name: "Spa", icon: MdSpa },
	{ name: "Free WiFi", icon: FaWifi },
	{ name: "Restaurant", icon: MdRestaurantMenu },
	{ name: "Bar", icon: MdLocalBar },
	{ name: "Gym", icon: CgGym },
	{ name: "Swimming Pool", icon: MdPool },
];
export const HOTEL_COST_FREQUENCY = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 4, 8, 16, 29, 39,
	56, 66, 92, 89, 115, 114, 95, 102, 109, 78, 60, 46, 38, 12, 13, 9, 1, 3, 1,
	0, 0, 0, 0, 0, 0, 0,
];
export const CHILD_AND_EXTRA_BEDS = [
	{
		head: "Infant 0-1 year(s)",
		body: "Stay for free if using existing bedding. Note, if you need a cot there may be an extra charge.",
	},
	{
		head: "Children 2-5 year(s)",
		body: "Must use an extra bed which will incur an additional charge.",
	},
	{
		head: "Guests above 6 year(s)",
		body: "Must use an extra bed which will incur an additional charge.",
	},
	{
		head: "Other",
		body: "Extra beds are dependent on the room you choose. Please check the individual room capacity for more details.",
	},
];
export const FLIGHT_SEARCH_PANNEL_SPECIAL_FARES = [
	{
		logo: specialFareSVG1,
		title: "Student",
		header: { pre: `For travellers`, mid: "12 years", post: "and above" },
		body: "It is mandatory to present a valid Student ID at the time of check-in",
	},
	{
		logo: specialFareSVG2,
		title: "Senior Citizen",
		header: { pre: `For travellers`, mid: "60 years", post: "and above" },
		body: "It is mandatory to present a valid date of birth proof at the time of check-in",
	},
	{
		logo: specialFareSVG3,
		title: "Armed Forces",
		header: {
			pre: `For`,
			mid: "serving and retired personnel of Armed Forces & Paramilitary Forces",
			post: ", and their recognised dependants",
		},
		body: "It is mandatory to present a valid Armed Forces ID or a dependent card at the time of check-in",
	},
];

export const FLIGHT_CAROUSEL_OFFERS = [
	{ src: img1 },
	{ src: img2 },
	{ src: img3 },
	{ src: img4 },
	{ src: img5 },
	{ src: img6 },
	{ src: img7 },
	{ src: img8 },
	{ src: img9 },
	{ src: img10 },
	{ src: img11 },
];
export const HOTEL_OFFERS_CAROUSEL = [
	{ src: hotelOffer1 },
	{ src: hotelOffer3 },
	{ src: hotelOffer4 },
	{ src: hotelOffer5 },
	{ src: hotelOffer6 },
	{ src: hotelOffer2 },
];

export const FLIGHT_BANNERS_OF_THE_DAY = [
	bannerOftheDay1,
	bannerOftheDay2,
	bannerOftheDay3,
	bannerOftheDay4,
	bannerOftheDay5,
];

export const FLIGHT_BACKGROUND_IMAGES = [
	{
		con: locationImg1Con,
		org: locationImg1Org,
		city: "Agra",
		country: "India",
	},
	{
		con: locationImg2Con,
		org: locationImg2Org,
		city: "Bali",
		country: "Indonesia",
	},
	{
		con: locationImg3Con,
		org: locationImg3Org,
		city: "Kochi",
		country: "India",
	},
	{
		con: locationImg4Con,
		org: locationImg4Org,
		city: "London",
		country: "United Kingdom",
	},
	{
		con: locationImg5Con,
		org: locationImg5Org,
		city: "Udaipur",
		country: "India",
	},
];
export const FLIGHT_BOOKING_PROGRESS_STAGES = [
	{ name: "Review", id: "review" },
	{ name: "Traveller Details", id: "traveller-details" },
	{ name: "Payment", id: "payment" },
];
export const TITLES = ["Mr", "Ms", "Mrs"];
export const BUS_OFFERS = [
	{ src: offerImg1 },
	{ src: offerImg2 },
	{ src: offerImg3 },
	{ src: offerImg4 },
	{ src: offerImg5 },
	{ src: offerImg6 },
	{ src: offerImg7 },
	{ src: offerImg8 },
	{ src: offerImg9 },
	{ src: offerImg10 },
	{ src: offerImg11 },
	{ src: offerImg12 },
	{ src: offerImg13 },
	{ src: offerImg14 },
];
export const BUS_DEPARTURE_TIME_RANGES = [
	{ label: "Before 10 AM", SVG: WiSunrise },
	{ label: "10 AM - 5 PM", SVG: IoSunny },
	{ label: "5 PM - 11 PM", SVG: IoPartlySunny },
	{ label: "After 11 PM", SVG: FaCloudMoon },
];
export const BUS_SORT_TYPES = [
	"Price",
	"Seats",
	"Ratings",
	"Arrival Time",
	"Departure Time",
];
export const FACILITIES = [
	{ type: "Blanket", svg: BiSolidBlanket },
	{ type: "Water Bottle", svg: FaBottleWater },
	{ type: "WiFi", svg: FaWifi },
	{ type: "Charging Point", svg: FaPlug },
	{ type: "Snack Box", svg: IoFastFood },
];
export const TABS = [
	{ tabTitle: "Flights", tabLogo: flightSVG },
	{ tabTitle: "Trains", tabLogo: trainSVG },
	{ tabTitle: "Buses", tabLogo: busSVG },
	{ tabTitle: "Hotels", tabLogo: hotelSVG },
];
export const FLIGHT_SORTING_METHODS = [
	{ name: "RECOMMENDED", value: "recommended" },
	{ name: "CHEAPEST", value: "cheapest" },
	{ name: "QUICKEST", value: "quickest" },
	{ name: "EARLIEST", value: "earliest" },
];
export const AIRLINES_INFO = [
	{ name: "Air India", key: "AI" },
	{ name: "IndiGo", key: "6E" },
	{ name: "Vistara", key: "UK" },
	{ name: "SpiceJet", key: "SG" },
	{ name: "Go First", key: "G8" },
];
export const HOTEL_RATINGS = [
	{ name: "Exceptional: 9+", minRating: 9 },
	{ name: "Excellent: 8+", minRating: 8 },
	{ name: "Very Good: 7+", minRating: 7 },
	{ name: "Good: 6+", minRating: 6 },
	{ name: "Pleasant: 5+", minRating: 5 },
];
// export const HOTEL_SORTING_OPTIONS = [
// 	{ type: "Popularity", value: "popularity", subtext: null },
// 	{ type: "Price", subtext: "Low to High", value: "priceup" },
// 	{ type: "Price", subtext: "High to Low", value: "pricedown" },
// 	{ type: "User Rating", subtext: "Highest First", value: "rating" },
// ];
export const HOTEL_SORTING_OPTIONS = [
	{ type: "Popularity", value: "popularity" },
	{ type: "Price Low to High", value: "priceup" },
	{ type: "Price High to Low", value: "pricedown" },
	{ type: "User Rating Highest First", value: "rating" },
];
export const AIRPORTS = [
	{
		name: "Rajiv Gandhi International Airport",
		city: "Hyderabad",
		country: "India",
		iata_code: "HYD",
	},
	{
		name: "Sardar Vallabhbhai Patel International Airport",
		city: "Ahmedabad",
		country: "India",
		iata_code: "AMD",
	},
	{
		name: "Goa International Airport",
		city: "Goa",
		country: "India",
		iata_code: "GOI",
	},
	{
		name: "Pune Airport",
		city: "Pune",
		country: "India",
		iata_code: "PNQ",
	},
	{
		name: "Lokpriya Gopinath Bordoloi International Airport",
		city: "Guwahati",
		country: "India",
		iata_code: "GAU",
	},
	{
		name: "Jaipur International Airport",
		city: "Jaipur",
		country: "India",
		iata_code: "JAI",
	},
	{
		name: "Dr. Babasaheb Ambedkar International Airport",
		city: "Nagpur",
		country: "India",
		iata_code: "NAG",
	},
	{
		name: "Indira Gandhi International Airport",
		city: "Delhi",
		country: "India",
		iata_code: "DEL",
	},
	{
		name: "Chhatrapati Shivaji Maharaj International Airport",
		city: "Mumbai",
		country: "India",
		iata_code: "BOM",
	},
	{
		name: "Kempegowda International Airport",
		city: "Bengaluru",
		country: "India",
		iata_code: "BLR",
	},
	{
		name: "Netaji Subhas Chandra Bose International Airport",
		city: "Kolkata",
		country: "India",
		iata_code: "CCU",
	},
	{
		name: "Chennai International Airport",
		city: "Chennai",
		country: "India",
		iata_code: "MAA",
	},
	{
		name: "Cochin International Airport",
		city: "Kochi",
		country: "India",
		iata_code: "COK",
	},
	{
		name: "Chandigarh International Airport",
		city: "Chandigarh",
		country: "India",
		iata_code: "IXC",
	},
	{
		name: "Biju Patnaik International Airport",
		city: "Bhubaneswar",
		country: "India",
		iata_code: "BBI",
	},
	{
		name: "Coimbatore International Airport",
		city: "Coimbatore",
		country: "India",
		iata_code: "CJB",
	},
	{
		name: "Lucknow International Airport",
		city: "Lucknow",
		country: "India",
		iata_code: "LKO",
	},
	{
		name: "Trivandrum International Airport",
		city: "Thiruvananthapuram",
		country: "India",
		iata_code: "TRV",
	},
	{
		name: "Mangalore International Airport",
		city: "Mangalore",
		country: "India",
		iata_code: "IXE",
	},
	{
		name: "Amritsar International Airport",
		city: "Amritsar",
		country: "India",
		iata_code: "ATQ",
	},
	{
		name: "Dehradun Airport",
		city: "Dehradun",
		country: "India",
		iata_code: "DED",
	},
	{
		name: "Vadodara Airport",
		city: "Vadodara",
		country: "India",
		iata_code: "BDQ",
	},
	{
		name: "Madurai Airport",
		city: "Madurai",
		country: "India",
		iata_code: "IXM",
	},
	{
		name: "Lok Nayak Jayaprakash Airport",
		city: "Patna",
		country: "India",
		iata_code: "PAT",
	},
	{
		name: "Kushok Bakula Rimpochee Airport",
		city: "Leh",
		country: "India",
		iata_code: "IXL",
	},
	{
		name: "Agartala Airport",
		city: "Agartala",
		country: "India",
		iata_code: "IXA",
	},
	{
		name: "Gaya Airport",
		city: "Gaya",
		country: "India",
		iata_code: "GAY",
	},
	{
		name: "Surat Airport",
		city: "Surat",
		country: "India",
		iata_code: "STV",
	},
	{
		name: "Raipur Airport",
		city: "Raipur",
		country: "India",
		iata_code: "RPR",
	},
	{
		name: "Jammu Airport",
		city: "Jammu",
		country: "India",
		iata_code: "IXJ",
	},
];
export const FLIGHT_PASSENGERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const COUNTRIES = [
	"India",
	"United States",
	"China",
	"United Kingdom",
	"Afghanistan",
	"Aland Islands",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua And Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia",
	"Bosnia And Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory",
	"British Virgin Islands",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cape Verde",
	"Cayman Islands",
	"Central African Republic",
	"Chad",
	"Chile",
	"Christmas Island",
	"Cocos Islands",
	"Colombia",
	"Comoros",
	"Congo Brazzaville",
	"Congo Kinshasa",
	"Cook Islands",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"East Timor",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Ethiopia",
	"Falkland Islands",
	"Faroe Islands",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea Bissau",
	"Guyana",
	"Haiti",
	"Heard Island And Mcdonald Islands",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Isle Of Man",
	"Israel",
	"Italy",
	"Ivory Coast",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Kosovo",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Macedonia",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"Netherlands Antilles",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"North Korea",
	"Northern Mariana Islands",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestinian Territory",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Reunion",
	"Romania",
	"Russia",
	"Rwanda",
	"Saint Barthélemy",
	"Saint Helena",
	"Saint Kitts And Nevis",
	"Saint Lucia",
	"Saint Martin",
	"Saint Pierre And Miquelon",
	"Saint Vincent And The Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome And Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Serbia And Montenegro",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia And The South Sandwich Islands",
	"South Korea",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Svalbard And Jan Mayen",
	"Swaziland",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad And Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks And Caicos Islands",
	"Tuvalu",
	"U.s. Virgin Islands",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United States Minor Outlying Islands",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican",
	"Venezuela",
	"Vietnam",
	"Wallis And Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
];
export const BUS_CITIES = [
	"Mumbai",
	"Delhi",
	"Bangalore",
	"Kolkata",
	"Chennai",
	"Hyderabad",
	"Pune",
	"Ahmedabad",
	"Surat",
	"Jaipur",
	"Lucknow",
	"Nagpur",
	"Thane",
	"Bhopal",
	"Visakhapatnam",
	"Patna",
	"Vadodara",
	"Ludhiana",
	"Agra",
	"Nashik",
	"Faridabad",
	"Rajkot",
	"Varanasi",
	"Dhanbad",
	"Jodhpur",
	"Raipur",
	"Coimbatore",
	"Jabalpur",
	"Vijayawada",
	"Kanpur",
	"Indore",
	"Pimpri-Chinchwad",
	"Ghaziabad",
	"Meerut",
	"Kalyan-Dombivali",
	"Vasai-Virar",
	"Srinagar",
	"Amritsar",
	"Allahabad",
	"Gwalior",
];
export const TRAIN_STATIONS = [
	"Delhi Junction",
	"Salem Junction",
	"Dhanbad Junction",
	"Hubli Junction",
	"Lucknow Charbhagh",
	"Vijayawada Junction",
	"Surat",
	"Udaipur City",
	"Thiruvananthapuram Central",
	"Coimbatore Junction",
	"Kanpur Central",
	"Kharagpur Junction",
	"Manmad Junction",
	"Mughal Sarai Junction",
	"Chandigarh",
	"Gorakhpur Junction",
	"Gwalior Junction",
	"Ghaziabad Junction",
	"Agra Cantonment",
	"Allahabad Junction",
	"Kiul Junction",
	"Bhubaneshwar",
	"Ambala Cantonment",
	"Warangal",
	"Bhusaval Junction",
	"Howrah Junction",
	"Thrissur",
	"Yesvantpur Junction",
	"Khurda Road Junction",
	"Nagpur Junction",
	"Ahmedabad Junction",
	"Visakhapatnam Junction",
	"Barddhaman Junction",
	"Mysuru Junction",
	"Bengaluru City Junction",
	"Amritsar Junction",
	"Kalyan Junction",
	"Pune Junction",
	"Raipur Junction",
	"Erode Junction",
	"New Delhi",
	"Jhansi Junction",
	"Jodhpur Junction",
	"Varanasi Junction",
	"Vadodara Junction",
	"Asansol Junction",
	"Katpadi Junction",
	"Indore Junction",
	"Itarsi Junction",
	"Moradabad Junction",
	"Anand Junction",
	"Kollam Junction",
	"Ludhiana Junction",
	"Bengaluru Cantt.",
	"Hazrat Nizamuddin",
	"Mangalore Central",
	"Bhopal Junction",
	"Kota Junction",
	"Secunderabad Junction",
	"Nadiad Junction",
	"Mathura Junction",
	"Chennai Central",
	"Vellore Katpadi",
	"Patna Junction",
	"Guwahati",
	"Jaipur Junction",
];
export const LOCATIONS = [
	{
		city: "Mumbai",
		state: "Maharashtra",
	},
	{
		city: "Delhi",
		state: "National Capital Territory of Delhi",
	},
	{
		city: "Bangalore",
		state: "Karnataka",
	},
	{
		city: "Kolkata",
		state: "West Bengal",
	},
	{
		city: "Chennai",
		state: "Tamil Nadu",
	},
	{
		city: "Hyderabad",
		state: "Telangana",
	},
	{
		city: "Pune",
		state: "Maharashtra",
	},
	{
		city: "Ahmedabad",
		state: "Gujarat",
	},
	{
		city: "Surat",
		state: "Gujarat",
	},
	{
		city: "Jaipur",
		state: "Rajasthan",
	},
	{
		city: "Lucknow",
		state: "Uttar Pradesh",
	},
	{
		city: "Kanpur",
		state: "Uttar Pradesh",
	},
	{
		city: "Nagpur",
		state: "Maharashtra",
	},
	{
		city: "Indore",
		state: "Madhya Pradesh",
	},
	{
		city: "Thane",
		state: "Maharashtra",
	},
	{
		city: "Bhopal",
		state: "Madhya Pradesh",
	},
	{
		city: "Visakhapatnam",
		state: "Andhra Pradesh",
	},
	{
		city: "Pimpri-Chinchwad",
		state: "Maharashtra",
	},
	{
		city: "Patna",
		state: "Bihar",
	},
	{
		city: "Vadodara",
		state: "Gujarat",
	},
];
export const POPULAR_DESTINATIONS = [
	{
		city: "New Delhi",
		state: "DELHI",
		img: popularDestinationImg1,
	},
	{
		city: "Mumbai",
		state: "MAHARASHTRA",
		img: popularDestinationImg2,
	},
	{
		city: "Chennai",
		state: "TAMIL NADU",
		img: popularDestinationImg3,
	},
	{
		city: "Kolkata",
		state: "WEST BENGAL",
		img: popularDestinationImg4,
	},
	{
		city: "Hyderabad",
		state: "TELANGANA",
		img: popularDestinationImg5,
	},
	{
		city: "Jaipur",
		state: "RAJASTHAN",
		img: popularDestinationImg6,
	},
	{
		city: "Pune",
		state: "MAHARASHTRA",
		img: popularDestinationImg7,
	},
	{
		city: "Visakhapatnam",
		state: "Andhra Pradesh",
		img: popularDestinationImg8,
	},
];
export const AVATAR_BACKGROUND_COLORS = [
	"#800080",
	"#a52a2a",
	"#ee82ee",
	"#008080",
	"#ff7f50",
	"#800020",
	"#b7410e",
	"#4b0082",
	"#fa8072",
	"#00ffff",
	"#dc143c",
	"#f4c430",
	"#43254f",
	"#ff00ff",
	"#f28500",
	"#733635",
	"#de3163",
	"#50c878",
	"#0f52ba",
	"#65000b",
];
