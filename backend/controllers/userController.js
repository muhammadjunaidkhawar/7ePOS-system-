import User from "../models/User.js";

// POST /api/users/login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password!" });
    }
    // For now we just return ok + user info (no JWT). Add JWT later if needed.
    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

// GET /api/users/profile
// If multiple users exist, returns the first one (you can add query ?username= to fetch specific)
export const getProfile = async (req, res) => {
  try {
    const { username } = req.query;
    let user;
    if (username) {
      user = await User.findOne({ username });
    } else {
      // return first user as "current profile" (simple default)
      user = await User.findOne({});
    }
    if (!user) return res.status(404).json({ message: "No user found" });
    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ username: 1 });
    res.json(users);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/users
export const createUser = async (req, res) => {
  try {
    const { username, password, email, role, address, avatar, permissions } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "username and password required" });
    }
    // try create; if duplicate, let unique index handle it
    const newUser = new User({
      username,
      password,
      email,
      role: role || "User",
      address: address || "",
      avatar: avatar || "",
      permissions: permissions || [],
    });
    const created = await newUser.save();
    res.status(201).json(created);
  } catch (err) {
    console.error("Create user error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const uid = req.params.id;
    const updates = req.body; // e.g. { permissions: [...] } or { password: 'new' } or other fields
    const user = await User.findById(uid);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Apply only known keys (safe practice)
    const allowed = ["username", "password", "email", "role", "address", "avatar", "permissions"];
    allowed.forEach((k) => {
      if (updates[k] !== undefined) user[k] = updates[k];
    });

    const saved = await user.save();
    res.json(saved);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const uid = req.params.id;
    const user = await User.findById(uid);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.remove();
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// safer seeding using upsert (won't create duplicates)
export const seedUsers = async () => {
  try {
    const defaults = [
      { username: "Saad Satti", password: "Saad123", email: "saad@example.com", role: "Admin" },
      { username: "Qaiser Satti", password: "Qaiser123", email: "qaiser@example.com", role: "Manager" },
      { username: "Sabbat Satti", password: "Sabbat123", email: "sabbat@example.com", role: "Staff" },
    ];

    for (const u of defaults) {
      await User.updateOne(
        { username: u.username },               // filter
        { $setOnInsert: { password: u.password, username: u.username, email: u.email, role: u.role } }, // only set if not exist
        { upsert: true }                       // insert if not found
      );
    }
    console.log("✅ Default users ensured in database (no duplicates).");
  } catch (err) {
    console.error("Seed error:", err.message);
  }
};
