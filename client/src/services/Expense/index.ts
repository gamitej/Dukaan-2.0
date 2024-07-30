import { DateRangeType } from "@/store/globalStore";
import http from "../httpService";

export async function getExpensenDataApi(selectedDateRange: DateRangeType) {
  const { data } = await http.get(
    `/expenses/all?startDate=${selectedDateRange.startDate}&endDate=${selectedDateRange.endDate}`
  );
  return data;
}

export async function addExpenseApi(req: any) {
  const { data } = await http.post(`/expenses/add`, req);
  return data;
}

export async function deleteExpenseApi(reqestedData: any) {
  const { data } = await http.post(`/expenses/delete`, reqestedData);
  return data;
}
