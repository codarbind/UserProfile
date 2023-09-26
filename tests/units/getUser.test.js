const request = require("supertest");
const userRoutes = require("../../src/routes/userRoutes");
const UserService = require("../../src/services/userService");
const app = require("../../src/app");

jest.mock("../../src/services/userService");
jest.mock("../../src/models/User");

describe("GET /users/:idOrEmailOrUsername", () => {
  it("should return a user by ID", async () => {
    const userData = {
      _id: "user_id",
      username: "testuser",
      first_name: "John",
      last_name: "Jean",
      phone_number: "1234567890",
      address: "123 Eko St",
      isDeleted: false,
    };

    UserService.getUser.mockResolvedValue(userData);

    const response = await request(app).get("/users/user_id").expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "user details",
      data: { user: userData },
    });
  });

  it("should return a user by email", async () => {
    const userData = {
      _id: "user_id",
      username: "testuser",
      first_name: "John",
      last_name: "Doe",
      phone_number: "1234567890",
      address: "123 Main St",
      isDeleted: false,
    };

    UserService.getUser.mockResolvedValue(userData);

    const response = await request(app)
      .get("/users/test@example.com")
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "user details",
      data: { user: userData },
    });
  });

  it("should return a user by username", async () => {
    const userData = {
      _id: "user_id",
      username: "testuser",
      first_name: "John",
      last_name: "Doe",
      phone_number: "1234567890",
      address: "123 Main St",
      isDeleted: false,
    };

    UserService.getUser.mockResolvedValue(userData);

    const response = await request(app).get("/users/testuser").expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "user details",
      data: { user: userData },
    });
  });

  /*it("should return an error if the user does not exist", async () => {
    UserService.getUser.mockResolvedValue(null);

    const response = await request(app)
      .get("/users/nonexistent_user")
      .expect(404);

    expect(response.body).toEqual({
      success: false,
      message: "User not found",
    });
  });*/
});
