import axios from 'axios';
import { useAuthStore } from '@/stores';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

function request(method) {
  return (url, body) => {
    const requestOptions = {
      method,
      headers: authBasic(url),
      // auth: authBasic(url),
      // headers: {} //authHeader(url)
    };
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  }
}

// helper functions

function authBasic(url) {
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.idUsuario;
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
  if (isLoggedIn && isApiUrl) {
    const auth = 'Basic ' + Buffer.from(user.email + ':' + user.senha).toString('base64');

    return {
      Authorization: auth //`Basic ${btoa(username + ":" + password)}`
    };
    return {
      user: user.email,
      password: user.senha,
    };
  } else {
    return {};
  }
}

// function authHeader(url) {
//   // return auth header with jwt if user is logged in and request is to the api url
//   const { user } = useAuthStore();
//   const isLoggedIn = !!user?.token;
//   const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
//   if (isLoggedIn && isApiUrl) {
//     return { Authorization: `Bearer ${user.token}` };
//   } else {
//     return {};
//   }
// }

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const { user, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && user) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}    
