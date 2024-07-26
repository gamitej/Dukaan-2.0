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

export async function addPartyPaymentDataApi(partyId: string) {
  const { data } = await http.post(`/pending-payment/add?party_id=${partyId}`);
  return data;
}

export async function deletePartyPaymentDataApi(partyId: string) {
  const { data } = await http.post(`/payment/party-wise?party_id=${partyId}`);
  return data;
}
