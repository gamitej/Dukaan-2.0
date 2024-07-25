import http from "../httpService";

export async function getPartyWisePendingPaymentDataApi(partyId: string) {
  const { data } = await http.get(
    `/pending-payment/party-wise?party_id=${partyId}`
  );
  return data;
}
