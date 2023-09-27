const request = require("supertest");
const userRoutes = require("../../src/routes/userRoutes");
const UserService = require("../../src/services/userService");
const app = require("../../src/app");

// Mock UserService
jest.mock("../../src/services/userService");

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const userResp = [
      {
        _id: "user_id_1",
        username: "user1",
        first_name: "John",
        last_name: "Doe",
        phone_number: "1234567890",
        address: "1234 Yours Av",
        email: "myemail@john.io",
      },
      {
        _id: "user_id_2",
        username: "user2",
        first_name: "Jane",
        last_name: "Tunde",
        phone_number: "9876543210",
        address: "456 Jklm St",
        email: "myemail@jane.io",
      },
    ];
    const mockUsersResp = [
      {
        totalCount: [{ total: userResp.length }],

        paginatedData: userResp,
      },
    ];

    UserService.listUsers.mockResolvedValue(mockUsersResp);

    const response = await request(app).get("/users").expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "list of users",
      data: {
        meta: { count: 2 },
        users: userResp,
      },
    });
  });
});
