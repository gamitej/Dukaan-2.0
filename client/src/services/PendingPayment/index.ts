import http from "../httpService";

export async function getPartyPendingPaymentDataApi(partyId: string) {
  const { data } = await http.get(
    `/pending-payment/party-wise?party_id=${partyId}`
  );
  return data;
}

export async function getPartyPaymentDataApi(partyId: string) {
  const { data } = await http.get(`/payment/party-wise?party_id=${partyId}`);
  return data;
}

export async function addPartyPaymentDataApi(req: any) {
  const { party_id } = req;

  console.log(req);

  const { data } = await http.post(`/payment/add?party_id=${party_id}`, req);
  return data;
}

export async function deletePartyPaymentDataApi(partyId: string) {
  const { data } = await http.post(`/payment/party-wise?party_id=${partyId}`);
  return data;
}
