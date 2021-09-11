import handleResponse from './handleResponse';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const UserServices = {};

UserServices.auth = async (params) => {
  const requestOptions = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
  };
  return fetch(
    API_URL + '/auth/vk_mini_apps?' + new URLSearchParams(params),
    requestOptions
  ).then(handleResponse);
};

UserServices.getData = async () => {
  const requestOptions = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
  };
  let reqUrl = '/data';
  return fetch(API_URL + reqUrl, requestOptions).then(handleResponse);
};

UserServices.addData = async (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify(data),
  };
  let reqUrl = '/data';
  return fetch(API_URL + reqUrl, requestOptions).then(handleResponse);
};

UserServices.swapLenses = async () => {
  const requestOptions = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
  };
  let reqUrl = '/swapLenses';
  return fetch(API_URL + reqUrl, requestOptions).then(handleResponse);
};

UserServices.swapLiquid = async () => {
  const requestOptions = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
  };
  let reqUrl = '/swapLiquid';
  return fetch(API_URL + reqUrl, requestOptions).then(handleResponse);
};

export default UserServices;
