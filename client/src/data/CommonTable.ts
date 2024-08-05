/**
 * ================= SALES & PURCHASE COLS ================
 */

// column for sales & purchase table data
export const commonCols = [
  { header: "Date", accessorkey: "date" },
  { header: "Product", accessorkey: "product" },
  { header: "Category", accessorkey: "category" },
  { header: "Company", accessorkey: "company" },
  { header: "Quanity", accessorkey: "quantity" },
  { header: "Weight", accessorkey: "weight" },
  { header: "Price", accessorkey: "price" },
];

export const commonPurchaseCols = [
  { header: "Date", accessorkey: "date" },
  { header: "Party", accessorkey: "party" },
  { header: "Product", accessorkey: "product" },
  { header: "Category", accessorkey: "category" },
  { header: "Company", accessorkey: "company" },
  { header: "Quanity", accessorkey: "quantity" },
  { header: "Weight", accessorkey: "weight" },
  { header: "Avg Price", accessorkey: "avg_price" },
  { header: "Price", accessorkey: "price" },
];

/**
 * ================= RETURN COLS ================
 */

export const returnCols = [
  { header: "Order Id", accessorkey: "order_id" },
  { header: "Date", accessorkey: "date" },
  { header: "Quanity", accessorkey: "qunatity" },
  { header: "Weight", accessorkey: "weight" },
  { header: "Price", accessorkey: "price" },
];

/**
 * ================= PENDING PAYMENT COLS ================
 */

export const pendingPaymentCols = [
  { header: "Order Id", accessorkey: "order_id" },
  { header: "Order Date", accessorkey: "date" },
  { header: "Total Amount", accessorkey: "total_amount" },
  { header: "Paid Amount", accessorkey: "paid_amount" },
];

/**
 * =================  PAYMENT COLS ================
 */

export const paymentCols = [
  { header: "Order Id", accessorkey: "order_id" },
  { header: "Date", accessorkey: "date" },
  { header: "payment", accessorkey: "payment" },
  { header: "Payment Mode", accessorkey: "payment_mode" },
];

/**
 * =================  EXPENSE COLS ================
 */

export const expenseCols = [
  // { header: "Id", accessorkey: "id" },
  { header: "Date", accessorkey: "date" },
  { header: "Description", accessorkey: "description" },
  { header: "Expense Type", accessorkey: "category" },
  { header: "Amount", accessorkey: "amount" },
];
