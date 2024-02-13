export const CURRENCY_FORMATTER = (value) =>
	new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(value);

export function IS_VALID_EMAIL(email) {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return pattern.test(email);
}

export function FILTER_AIRPORTS(options, { inputValue }) {
	return options.filter((item) => {
		if (item.city.toLowerCase().includes(inputValue.toLowerCase()))
			return true;
		if (item.name.toLowerCase().includes(inputValue.toLowerCase()))
			return true;
		if (item.iata_code.toLowerCase().includes(inputValue.toLowerCase()))
			return true;
		return false;
	});
}
