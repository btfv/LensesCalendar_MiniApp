import config from "../../config";
import handleResponse from "./handleResponse";

const UserServices = {}

UserServices.getData = async () => {
	const requestOptions = {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
	};
	let reqUrl = '/data';
	return fetch(config.API_URL + reqUrl, requestOptions).then(handleResponse);
}

export default UserServices;