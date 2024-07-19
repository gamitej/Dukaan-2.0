import http from "../httpService";

type Request = { name: string };

export async function getAddPartyNameDataApi(req: Request) {
  const { data } = await http.post(`/party/add-name`, req);
  return data;
}

export async function getAllPartiesDataApi() {
  const { data } = await http.get(`/party/all`);
  return data;
}
