import app from "../server.js";
import request from "supertest";
import { jest } from "@jest/globals";

describe("Product Routes", () => {
  //   const req = { product: "1010", company: "unnat", category: "wheat" };

  //   it("should add product details", async () => {
  //     const response = await request(app)
  //       .post("/api/product/add-product-details")
  //       .send(req);

  //     expect(response.status).toBe(200);
  //     // expect(response.body).toEqual({ message: "Product added successfully" });
  //     console.log(response.body);
  //   });

  it("should get all product details", async () => {
    const response = await request(app).get(
      "/api/product/all-products-details"
    );

    expect(response.status).toBe(200);
    // expect(response.body).toContainEqual(req);
    console.log(response.body);
  });
});
