/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosBase from 'axios';

const initRequest = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token, 'Access-Control-Allow-Origin': '*',
  };

  const axios = axiosBase.create({
    baseURL: 'https://a1b2c3d4e5f6.ngrok.io',
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
        genUrl = genUrl.replace(`{${key}}`, params[key]);
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
      qString.push(`${key}=${query[key]}`);
    }
    return `?${qString.join('&')}`;
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
      `${genUrl}${generateQueryString(reqOption.query)}`,
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