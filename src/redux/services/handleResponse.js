export default function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		console.log(data);
		if (!response.ok || data.error) {
			const error = (data && data.error) || response.statusText;
			return Promise.reject(error);
		}
		return data;
	});
}