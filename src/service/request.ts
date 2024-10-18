/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosBase from 'axios';

const initRequest = () => {
  const tokenString = localStorage.getItem('token');
  const token = tokenString ? JSON.parse(tokenString).state.token : null;
  const headers: any = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const axios = axiosBase.create({
    // baseURL: 'http://192.168.1.236:8080',
    baseURL: 'https://ad0f-2405-4803-fdbd-e350-d2d-c5c9-3912-5d56.ngrok-free.app',
    headers,
  });

  axios.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async (error: any) => {
      console.warn('▼Api Error▼', error);
    },
  );

  return axios;
};

const generateUrl = (url: string, params: any) => {
  let genUrl = url;
  if (params) {
    const keys = Object.keys(params);
    if (keys.length > 0) {
      for (const key of keys) {
        genUrl = genUrl.replace(`{${key} } `, params[key]);
      }
    }
  }
  return genUrl;
};

const generateQueryString = (query: any) => {
  if (!query) return '';
  const keys = Object.keys(query);
  if (keys.length > 0) {
    const qString = [];
    for (const key of keys) {
      qString.push(`${key}=${query[key]} `);
    }
    return `? ${qString.join('&')} `;
  }
  return '';
};

const request = async (callback: any, reqOption: any) => {
  try {
    const { url, params } = reqOption;
    const genUrl = generateUrl(url, params);
    const axios = initRequest();
    const response = await callback(axios, genUrl);
    return response.data;
  } catch (error: any) {
    console.warn('▼Api Error▼', error);
    throw error;
    // return undefined;
  }
};

export const get = async (reqOption: any) => {
  return await request((axios: any, genUrl: any) => {
    return axios.get(
      `${genUrl}${generateQueryString(reqOption.query)} `,
      reqOption.config,
    );
  }, reqOption);
};

export const post = async (reqOption: any) => {
  return await request((axios: any, genUrl: any) => {
    return axios.post(genUrl, reqOption.data, reqOption.config);
  }, reqOption);
};

export const put = async (reqOption: any) => {
  return await request((axios: any, genUrl: any) => {
    return axios.put(genUrl, reqOption.data, reqOption.config);
  }, reqOption);
};

export const deleteMethod = async (reqOption: any) => {
  return await request((axios: any, genUrl: any) => {
    return axios.delete(genUrl, reqOption.config);
  }, reqOption);
};

export const upload = async (reqOption: any) => {
  return await request((axios: any, genUrl: any) => {
    return axios.post(genUrl, reqOption.data, {
      ...reqOption.config,
      headers: {
        ...reqOption.config?.headers,
        'Content-type': 'multipart/form-data',
      },
    });
  }, reqOption);
};

export const putFormData = async (reqOption: any) => {
  return await request((axios: any, genUrl: any) => {
    return axios.put(genUrl, reqOption.data, {
      ...reqOption.config,
      headers: {
        ...reqOption.config?.headers,
        'Content-type': 'multipart/form-data',
      },
    });
  }, reqOption);
};