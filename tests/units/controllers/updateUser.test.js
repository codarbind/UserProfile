const request = require("supertest");
const userRoutes = require("../../../src/routes/userRoutes");
const UserService = require("../../../src/services/userService");
const app = require("../../../src/app");

// Mock UserService
jest.mock("../../../src/services/userService");

describe("PUT /users/:id", () => {
  it("should update a user profile", async () => {
    const userId = "65106671392dc536c9e43f1";
    const updatedUserData = {
      username: "updated_username",
      first_name: "Updated",
      last_name: "User",
      phone_number: "9876543210",
      address: "789 Elm St",
      email: "updated@mail.com",
    };

    UserService.updateUser.mockResolvedValue({
      _id: userId,
      ...updatedUserData,
    });

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUserData)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "user updated",
      data: {
        _id: userId,
        ...updatedUserData,
      },
    });
  });

  it("should return an error if the user does not exist", async () => {
    const userId = "645ce2fde973527cff11aad1";
    const updatedUserData = {
      username: "updated_username",
      first_name: "Updated",
      last_name: "User",
      phone_number: "9876543210",
      address: "789 Elm St",
      email: "updated@mail.com",
    };

    UserService.updateUser.mockResolvedValue(null);

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUserData)
      .expect(404);

    expect(response.body).toEqual({
      success: false,
      message: "User not found",
    });
  });

  it("should return an error if an exception occurs", async () => {
    const userId = "65106671392dc536c9e43f1";
    const updatedUserData = {
      username: "updated_username",
      first_name: "Updated",
      last_name: "User",
      phone_number: "9876543210",
      address: "789 Elm St",
      email: "updated@mail.com",
    };

    UserService.updateUser.mockRejectedValue(
      new Error("Internal Server Error")
    );

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUserData)
      .expect(500);

    expect(response.body).toEqual({
      success: false,
      message: "Internal Server Error",
    });
  });
});
