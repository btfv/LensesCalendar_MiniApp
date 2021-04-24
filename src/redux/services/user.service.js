import config from '../../config';
import handleResponse from './handleResponse';

const UserServices = {};

UserServices.auth = 	async (params) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(params),
	};
	return fetch(config.API_URL + '/auth/vk_mini_apps', requestOptions).then(handleResponse);
};

UserServices.getData = async () => {
	const requestOptions = {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
	};
	let reqUrl = '/data';
	return fetch(config.API_URL + reqUrl, requestOptions).then(handleResponse);
};

export default UserServices;
