import { FormDataPurchase } from "@/store/purchaseStore";
import http from "../httpService";

interface AddPurchasePorps extends FormDataPurchase {
  party_id: string;
  order_id: string;
}

export async function addPurchaseDataApi(req: AddPurchasePorps) {
  const { data } = await http.post(`/purchase/add`, req);
  return data;
}

export async function getPartyWisePuchaseDataApi(partyId: string) {
  const { data } = await http.get(`/purchase/party-wise?party_id=${partyId}`);
  return data;
}

export async function deletePartyPuchaseDataApi(req: any) {
  const { purchase_id } = req;
  const { data } = await http.delete(`/purchase/${purchase_id}`, req);
  return data;
}
