import http from "../httpService";

/**
 * ========================= ADD =========================
 */

type ProductReq = { product: string; company: string; category: string };

// add company
export async function addCompanyDataApi(company: string) {
  const { data } = await http.post(`/options/add-company`, { company });
  return data;
}

// add category
export async function addCategoryDataApi(category: string) {
  const { data } = await http.post(`/options/add-category`, { category });
  return data;
}

// add product with category & company data
export async function addProductDataApi(req: ProductReq) {
  const { data } = await http.post(`/options/add-product`, req);
  return data;
}

/**
 * ========================= GET =========================
 */

// add product with category & company data
// export async function getAllPartiesDataApi() {
//   const { data } = await http.get(`/party/all`);
//   return data;
// }
