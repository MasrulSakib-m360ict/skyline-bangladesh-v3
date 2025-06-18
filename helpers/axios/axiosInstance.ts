import { ENV } from '@/config';
import { authKey } from '@/contants/authkey';
import { IGenericErrorResponse } from '@/types';
import { getFromLocalStorage } from '@/utils/local-storage';
import axios from 'axios';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    if (ENV.btocToken) {
      config.headers['agency'] = ENV.btocToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: {
      data: any;
    } = {
      data: response?.data?.data,

    };
    return responseObject;
  },
  async function (error) {
    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message:
        error?.response?.data?.message || 'Something went wrong!!!',
      errorMessages: error?.response?.data?.message,
    };
    return responseObject;
  }
);

export { instance };
