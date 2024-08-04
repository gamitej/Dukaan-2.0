import { DateRangeType } from "@/store/globalStore";
import http from "../httpService";

export async function getSalesDataApi(selectedDateRange: DateRangeType) {
  const { data } = await http.get(
    `/sales/all?startDate=${selectedDateRange.startDate}&endDate=${selectedDateRange.endDate}`
  );
  return data;
}

export async function addSalesDataApi(req: any) {
  const { data } = await http.post(`/sales/add`, req);
  return data;
}

export async function deleteSalesDataApi(reqestedData: any) {
  const { data } = await http.post(`/sales/delete`, reqestedData);
  return data;
}

export async function getSalesOverview(selectedDateRange: DateRangeType) {
  const { data } = await http.get(
    `/sales/overview?startDate=${selectedDateRange.startDate}&endDate=${selectedDateRange.endDate}`
  );
  return data;
}
