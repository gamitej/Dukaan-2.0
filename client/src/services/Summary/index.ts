import { DateRangeType } from "@/store/globalStore";
import http from "../httpService";

export async function getOverallSummayOverview(
  selectedDateRange: DateRangeType
) {
  const { data } = await http.get(
    `/summary/overvall-summary?startDate=${selectedDateRange.startDate}&endDate=${selectedDateRange.endDate}`
  );
  return data;
}

export async function getCategoryWiseOverview(
  selectedDateRange: DateRangeType
) {
  const { data } = await http.get(
    `/summary/category-overview?startDate=${selectedDateRange.startDate}&endDate=${selectedDateRange.endDate}`
  );
  return data;
}

export async function getLastSixMonthOverview() {
  const { data } = await http.get(`/summary/monthly-overview`);
  return data;
}
