const API_BASE = 'http://43.202.62.146/api';

type RequestOption = {
  body?: any;
  headers?: { [key: string]: string };
  params?: Record<string, string> | URLSearchParams;
  method: string;
};
async function request(endpoint: string, { body = {}, headers = {}, params = {}, method }: RequestOption) {
  const baseQuery = new URLSearchParams(params);
  const resp = await fetch(`${API_BASE}${endpoint}${baseQuery.size > 0 ? baseQuery.toString() : ''}`, {
    method: method.toUpperCase(),
    headers: headers,
    body,
  });
  if (!resp.ok) {
    console.error(await resp.text());
    throw Error('network error');
  }
  return resp;
}

async function get(endpoint: string, opt: Omit<RequestOption, 'method' | 'body'>) {
  return request(endpoint, { method: 'get', ...opt });
}

async function post(endpoint: string, opt: Omit<RequestOption, 'method'>) {
  return request(endpoint, { method: 'post', ...opt });
}

export function getWheelchairRoutes(start: string, end: string) {
  return get('/routes/accessible', {
    params: {
      start,
      end,
    },
  });
}

export function getWalkingRoutes(start: string, end: string) {
  return get('/routes/accessible', {
    params: {
      start,
      end,
    },
  });
}
