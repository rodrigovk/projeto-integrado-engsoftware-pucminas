import axios from 'axios';
import { useAuthStore } from '@/stores';

export const requestWrapper = {
  get: request('get'),
  post: request('post'),
  put: request('put'),
  delete: request('delete')
};

function request(method) {
  return (url, body) => {
    const config = {
      url,
      method,
      auth: authBasic(url),
      headers: {}
    };
    if (body) {
      config.headers['Content-Type'] = 'application/json';
      config.data = JSON.stringify(body);
    }

    return axios.request(config).then(handleResponse);
  }
}

function authBasic(url) {
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.idUsuario;
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
  if (isLoggedIn && isApiUrl) {
    return {
      username: user.email,
      password: user.senha,
    };
  } else {
    return null;
  }
}

function handleResponse(response) {
  if (!(response.status >= 200 && response.status < 300)) {
    const { user, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && user) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
      }

      const error = response.data || response.statusText;
      return Promise.reject(error);
  }

  return response.data;
}    
