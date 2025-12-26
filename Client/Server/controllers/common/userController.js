const User = require("../../models/User");

const fetchAllUser = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
      }
}

const updateUserStatus = async (req, res) => {
    try {
      const { userId } = req.params;
      const { status } = req.body;
  
      if (!["active", "blocked"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
  
      const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: `User ${status} successfully`, user });
    } catch (error) {
      res.status(500).json({ message: "Error updating user status", error });
    }
  };

module.exports = { fetchAllUser, updateUserStatus, };