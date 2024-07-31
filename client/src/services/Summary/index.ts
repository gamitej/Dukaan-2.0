import http from "../httpService";

export async function getOverallSummayOverview() {
  const { data } = await http.get(`/summary/overvall-summary`);
  return data;
}

export async function getCategoryWiseOverview() {
  const { data } = await http.get(`/summary/category-overview`);
  return data;
}
