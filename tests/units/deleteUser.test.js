const request = require("supertest");
const userRoutes = require("../../src/routes/userRoutes");
const UserService = require("../../src/services/userService");
const app = require("../../src/app");

// Mock UserService
jest.mock("../../src/services/userService");

describe("DELETE /users/soft/:idOrEmailOrUsername", () => {
  it("should soft delete a user", async () => {
    const userIdOrEmailOrUsername = "user_id";
    UserService.softDeleteUser.mockResolvedValue(true);

    const response = await request(app)
      .delete(`/users/soft/${userIdOrEmailOrUsername}`)
      .expect(204);

    expect(response.body).toEqual({});
  });
});

describe("DELETE /users/hard/:idOrEmailOrUsername", () => {
  it("should hard delete a user", async () => {
    const userIdOrEmailOrUsername = "user_id";
    UserService.hardDeleteUser.mockResolvedValue(true);

    const response = await request(app)
      .delete(`/users/hard/${userIdOrEmailOrUsername}`)
      .expect(204);

    expect(response.body).toEqual({});
  });
});
