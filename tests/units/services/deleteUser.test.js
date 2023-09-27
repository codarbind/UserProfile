const {
  softDeleteUser,
  hardDeleteUser,
} = require("../../../src/services/userService");
const User = require("../../../src/models/User");

softDeleteUser;
jest.mock("../../../src/models/User");

describe("soft delete a user ", () => {
  it("should soft delete a user ", async () => {
    const idOrEmailOrUsername = "id_or_email_or_username";
    const userData = {
      _id: "1232424354656",
      username: "testuser",
      first_name: "John",
      last_name: "Doe",
      phone_number: "1234567890",
      address: "123 Main St",
      email: "djohn@mail.in",
      isDeleted: false,
    };
    User.findOneAndUpdate.mockResolvedValue({ ...userData, isDeleted: true });

    const deleted_resp = await softDeleteUser(idOrEmailOrUsername);

    expect(deleted_resp).toEqual({ ...userData, isDeleted: true });
  });
});

describe("hard delete a user ", () => {
  it("should hard delete a user ", async () => {
    const idOrEmailOrUsername = "id_or_email_or_username";
    const userData = {
      _id: "1232424354656",
      username: "testuser",
      first_name: "John",
      last_name: "Doe",
      phone_number: "1234567890",
      address: "123 Main St",
      email: "djohn@mail.in",
      isDeleted: false,
    };
    User.findOneAndDelete.mockResolvedValue(userData);

    const deleted_resp = await hardDeleteUser(idOrEmailOrUsername);

    expect(deleted_resp).toEqual(userData);
  });
});
