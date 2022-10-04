import axios from 'axios';
import { useAuthStore } from '@/stores';

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

const base = async (method, url, data, params) => {
  const CancelToken = axios.CancelToken;
  let source = CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, 15000);

  const config = {
    url,
    method,
    auth: authBasic(url),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    cancelToken: source.token,
    params: params,
  };

  if (data) {
    config.data = JSON.stringify(data);
  }

  return await axios(config)
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      if ([401].includes(err.response.status)) {
        // auto logout if 401 Unauthorized
        const { user, logout } = useAuthStore();
        if (user) logout();
      }

      if (err.response) {
        if (err.response.data) {
          if (err.response.data.message) {
            return Promise.reject(err.response.data.message);
          }
        }

        return Promise.reject(err.response);
      } else {
        return Promise.reject('TIMEOUT');
      }
    });
};

const requestBase = (method) => {
  return async (url) => {
    return await base(method, url)
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err));
  }
};

const requestDataBase = (method) => {
  return async (url, data, params) => {
    return await base(method, url, data, params)
      .then(res => Promise.resolve(res))
      .catch(error => {
        if (typeof error === 'object')
          return Promise.reject('Não foi possível acessar o servidor.');
        return Promise.reject(error);
      });
  }
};

export const request = {
  get: requestBase('get'),
  post: requestBase('post'),
  put: requestBase('put'),
  delete: requestBase('delete')
};

export const requestData = {
  get: requestDataBase('get'),
  post: requestDataBase('post'),
  put: requestDataBase('put'),
  delete: requestDataBase('delete')
};