import handleResponse from './handleResponse';

const UserServices = {};

UserServices.auth = async (params) => {
  const requestOptions = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
  };
  return fetch(
    process.env.REACT_APP_API_URL +
      '/auth/vk_mini_apps?' +
      new URLSearchParams(params),
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
  return fetch(process.env.REACT_APP_API_URL + reqUrl, requestOptions).then(
    handleResponse
  );
};

UserServices.swapLenses = async () => {
  const requestOptions = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
  };
  let reqUrl = '/swapLenses';
  return fetch(process.env.REACT_APP_API_URL + reqUrl, requestOptions).then(
    handleResponse
  );
};

UserServices.swapLiquid = async () => {
  const requestOptions = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
  };
  let reqUrl = '/swapLiquid';
  return fetch(process.env.REACT_APP_API_URL + reqUrl, requestOptions).then(
    handleResponse
  );
};


export default UserServices;
