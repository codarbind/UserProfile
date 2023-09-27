const { createUser } = require("../../../src/services/userService");
const User = require("../../../src/models/User");

jest.mock("../../../src/models/User");

describe("createUser", () => {
  it("should create a new user", async () => {
    const userData = {
      username: "testuser",
      first_name: "John",
      last_name: "Doe",
      phone_number: "1234567890",
      address: "123 Main St",
      email: "djohn@mail.in",
    };

    User.create.mockResolvedValue(userData);

    const newUser = await createUser(userData);

    expect(newUser).toEqual(userData);
  });

  it("should throw an error if user creation fails", async () => {
    const userData = {};

    const errorMessage = "User creation failed";

    User.create.mockRejectedValue(new Error(errorMessage));

    try {
      await createUser(userData);

      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
