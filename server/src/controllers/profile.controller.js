import { Profile } from "../models/profile.model.js";

// GET /api/profile
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// PUT /api/profile
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
