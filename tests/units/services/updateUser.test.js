const UserService = require("../../../src/services/userService");
const User = require("../../../src/models/User");

jest.mock("../../../src/models/User");

describe("updateUser", () => {
  it("should update an existing user", async () => {
    // Define test data
    const userId = "user_id";
    const updatedData = {
      username: "newUsername",
      first_name: "John",
      last_name: "Doe",
      phone_number: "1234567890",
      address: "123 Main St",
      email: "djohn@mail.in",
    };

    User.findByIdAndUpdate.mockResolvedValue(updatedData);

    const result = await UserService.updateUser(userId, updatedData);

    expect(result).toEqual(updatedData);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, updatedData, {
      new: true,
    });
  });

  it("should throw an error if an exception occurs", async () => {
    const userId = "user_id";
    const updatedData = {
      username: "newUsername",
      first_name: "John",
      last_name: "Doe",
      phone_number: "1234567890",
      address: "123 Main St",
      email: "djohn@mail.in",
    };

    User.findByIdAndUpdate.mockRejectedValue(
      new Error("Internal Server Error")
    );

    try {
      await UserService.updateUser(userId, updatedData);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Internal Server Error");
    }
  });
});
