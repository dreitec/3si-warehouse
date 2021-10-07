const baseUrl = process.env.API_BASE_URL || 'http://localhost:5000/v0';

// TODO: authentication

const getJSON = (url: string) => fetch(url).then((r) => r.json());
const postJSON = (url: string, body: any) => fetch(url, {
	body: JSON.stringify(body),
	headers: { 'Content-type': 'application/json' },
}).then((r) => r.json());

export const apiPing = () => getJSON(`${baseUrl}/ping`);
export const getProviders = () => getJSON(`${baseUrl}/providers`);
export const getOneChild = () => getJSON(`${baseUrl}/children/test`);
