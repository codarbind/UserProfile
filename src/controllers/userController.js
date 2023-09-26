const UserService = require("../services/userService");

exports.createUser = async (req, res) => {
  try {
    let user_exists = await UserService.userExists(req.body);

    if (user_exists)
      return res
        .status(400)
        .json({ message: "username/phone taken", success: false });
    const user = await UserService.createUser(req.body);
    res
      .status(201)
      .json({ success: true, message: "user created", data: { user } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user not created",
    });
  }
};

exports.listUsers = async (req, res) => {
  try {
    let { page = 1, perPage = 1 } = req.query;
    page = Number(page);
    perPage = Number(perPage);
    let users = await UserService.listUsers({ page, perPage });
    users = users[0];
    let meta = { count: users.totalCount[0].total };
    users = users.paginatedData;
    res.json({
      message: "list of users",
      success: true,
      data: { meta, users },
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserService.getUser(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "user details", data: { user } });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, first_name, last_name, phone_number, address, email } =
      req.body;
    let update_body = {
      username,
      first_name,
      last_name,
      phone_number,
      address,
      email,
    };
    const user = await UserService.updateUser(req.params.id, update_body);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      res
        .status(200)
        .json({ data: user, message: "user updated", success: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    await UserService.softDeleteUser(req.params.idOrPhoneOrUsername);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.hardDeleteUser = async (req, res) => {
  try {
    await UserService.hardDeleteUser(req.params.idOrPhoneOrUsername);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
