type RequestOption = {
  body?: any;
  headers?: { [key: string]: string };
  params?: Record<string, string> | URLSearchParams;
  method: string;
};

export function createApi(base: string, options?: { headers: RequestOption['headers'] }) {
  const baseHeaders = options?.headers || {};
  async function request(endpoint: string, { body = undefined, headers = {}, params = {}, method }: RequestOption) {
    const baseQuery = new URLSearchParams(params);
    const resp = await fetch(`${base}${endpoint}${baseQuery.size > 0 ? baseQuery.toString() : ''}`, {
      method: method.toUpperCase(),
      headers: { ...baseHeaders, ...headers },
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
  return { request, get, post };
}
