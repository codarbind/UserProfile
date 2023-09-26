const request = require("supertest");
const userRoutes = require("../../src/routes/userRoutes");
const UserService = require("../../src/services/userService");
const app = require("../../src/app");

// Mock UserService
jest.mock("../../src/services/userService");

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const mockUsers = [
      {
        _id: "user_id_1",
        username: "user1",
        first_name: "John",
        last_name: "Doe",
        phone_number: "1234567890",
        address: "123 Main St",
      },
      {
        _id: "user_id_2",
        username: "user2",
        first_name: "Jane",
        last_name: "Smith",
        phone_number: "9876543210",
        address: "456 Elm St",
      },
    ];

    UserService.listUsers.mockResolvedValue(mockUsers);

    const response = await request(app).get("/users").expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        users: mockUsers,
      },
    });
  });

  /* it("should return an error if an exception occurs", async () => {
    UserService.listUsers.mockRejectedValue(new Error("Internal Server Error"));

    const response = await request(app).get("/users").expect(500);

    expect(response.body).toEqual({
      success: false,
      message: "Failed to retrieve users",
    });
  });*/
});
