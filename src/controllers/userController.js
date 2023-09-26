const UserService = require("../services/userService");

exports.createUser = async (req, res) => {
  try {
    let user_exists = await UserService.userExists(req.body);
    console.log({ user_exists });
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
    const users = await UserService.listUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
