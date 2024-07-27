import http from "../httpService";

export async function getSalesDataApi() {
  const { data } = await http.get(`/sales/all`);
  return data;
}

export async function addSalesDataApi(req: any) {
  const { data } = await http.post(`/sales/add`, req);
  return data;
}

export async function deleteSalesDataApi(req: any) {
  const reqestedData = req?.original;
  const { data } = await http.post(`/sales/delete`, reqestedData);
  return data;
}
