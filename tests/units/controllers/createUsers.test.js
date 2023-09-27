const request = require("supertest");
const userRoutes = require("../../../src/routes/userRoutes");
const UserService = require("../../../src/services/userService");
const app = require("../../../src/app");

// Mock UserService
jest.mock("../../../src/services/userService");

describe("POST /users/", () => {
  it("should create a new user", async () => {
    const userData = {
      username: "testuser",
      first_name: "John",
      last_name: "Doe",
      phone_number: "1234567890",
      address: "123 Main St",
      email: "djohn@mail.in",
    };

    UserService.userExists.mockResolvedValue(false);

    UserService.createUser.mockResolvedValue({
      _id: "user_id",
      ...userData,
    });

    const response = await request(app)
      .post("/users")
      .send(userData)
      .expect(201);

    expect(response.body).toEqual({
      success: true,
      message: "user created",
      data: { user: { _id: "user_id", ...userData } },
    });
  });

  it("should return an error if the user already exists", async () => {
    const userData = {
      username: "existing_user",
      first_name: "Jane",
      last_name: "Smith",
      phone_number: "9876543210",
      address: "456 Elm St",
      email: "js@mail.her",
    };

    UserService.userExists.mockResolvedValue(true);

    const response = await request(app)
      .post("/users")
      .send(userData)
      .expect(400);

    expect(response.body).toEqual({
      success: false,
      message: "username/phone taken",
    });
  });
});
