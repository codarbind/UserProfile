const { getUser } = require("../../../src/services/userService");
const User = require("../../../src/models/User");
const UserService = require("../../../src/services/userService");

jest.mock("../../../src/models/User");

describe("get a single user by id", () => {
  it("should get a single user by id", async () => {
    const id = "id";
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
    User.findOne.mockResolvedValue(userData);

    const user = await getUser(id);

    expect(user).toEqual(userData);
  });
});

describe("get paginated listUsers", () => {
  it("should list users with pagination", async () => {
    User.aggregate.mockResolvedValue([
      {
        totalCount: [{ total: 5 }],
        paginatedData: [{}, {}, {}],
      },
    ]);

    const page = 1;
    const perPage = 10;

    const result = await UserService.listUsers({ page, perPage });

    expect(result).toEqual([
      {
        totalCount: [{ total: 5 }],
        paginatedData: [{}, {}, {}],
      },
    ]);

    expect(User.aggregate).toHaveBeenCalledWith([
      {
        $match: { isDeleted: false },
      },
      {
        $facet: {
          totalCount: [{ $count: "total" }],
          paginatedData: [
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * perPage },
            { $limit: perPage },
          ],
        },
      },
    ]);
  });

  it("should throw an error if an exception occurs", async () => {
    User.aggregate.mockRejectedValue(new Error("Test error"));

    const page = 1;
    const perPage = 10;

    await expect(UserService.listUsers({ page, perPage })).rejects.toThrowError(
      "Test error"
    );
  });
});
