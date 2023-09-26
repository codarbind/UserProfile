const User = require("../models/User");

class UserService {
  async createUser(data) {
    try {
      const newUser = await User.create(data);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUser(idOrEmailOrUsername) {
    try {
      let search_array = [];

      idOrEmailOrUsername.length == 12
        ? search_array.push({ _id: idOrEmailOrUsername })
        : undefined;
      const filter = {
        $or: [
          ...search_array,
          { email: idOrEmailOrUsername },
          { username: idOrEmailOrUsername },
        ],
        isDeleted: false,
      };

      const getUser = await User.findOne(filter);

      return getUser;
    } catch (error) {
      throw error;
    }
  }

  async userExists(filter) {
    try {
      filter = {
        $or: [
          { phone_number: filter.phone_number },
          { username: filter.username },
        ],
      };
      const exists = await User.find(filter);
      if (exists.length > 0) return true;
      return false;
    } catch (err) {
      throw err;
    }
  }

  async listUsers({ page, perPage }) {
    try {
      const pipeline = [
        {
          $match: { isDeleted: false },
        },
        {
          $facet: {
            totalCount: [
              {
                $count: "total",
              },
            ],
            paginatedData: [
              { $sort: { createdAt: -1 } },
              {
                $skip: (page - 1) * perPage,
              },
              {
                $limit: perPage,
              },
            ],
          },
        },
      ];

      const users = await User.aggregate(pipeline);
      console.log({ users });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByPhone(phone) {
    try {
      const user = await User.findOne({ phone });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await User.findOne({ username });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, data) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async softDeleteUser(idOrPhoneOrUsername) {
    try {
      const filter = {
        $or: [
          { _id: idOrPhoneOrUsername },
          { phone_number: idOrPhoneOrUsername },
          { username: idOrPhoneOrUsername },
        ],
      };
      const update = { isDeleted: true };
      const deletedUser = await User.findOneAndUpdate(filter, update);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  async hardDeleteUser(idOrPhoneOrUsername) {
    try {
      const filter = {
        $or: [
          { _id: idOrPhoneOrUsername },
          { phone_number: idOrPhoneOrUsername },
          { username: idOrPhoneOrUsername },
        ],
      };
      const deletedUser = await User.findOneAndDelete(filter);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
