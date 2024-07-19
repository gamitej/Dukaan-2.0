import http from "../httpService";

type Request = { name: string };

export async function getAddPartyNameDataApi(req: Request) {
  const { data } = await http.post(`/add-party-name`, req);
  return data;
}
