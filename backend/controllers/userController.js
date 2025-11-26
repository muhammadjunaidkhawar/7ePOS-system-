import User from "../models/User.js";

// POST /api/login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password!" });
    }
    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

// safer seeding using upsert (won't create duplicates)
export const seedUsers = async () => {
  try {
    const defaults = [
      { username: "Saad Satti", password: "Saad123" },
      { username: "Qaiser Satti", password: "Qaiser123" },
      { username: "Sabbat Satti", password: "Sabbat123" },
    ];

    for (const u of defaults) {
      await User.updateOne(
        { username: u.username },               // filter
        { $setOnInsert: { password: u.password, username: u.username } }, // only set if not exist
        { upsert: true }                       // insert if not found
      );
    }
    console.log("✅ Default users ensured in database (no duplicates).");
  } catch (err) {
    console.error("Seed error:", err.message);
  }
};
