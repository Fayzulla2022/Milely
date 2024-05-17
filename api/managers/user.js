const Model = require("../models/user");
const uuid = require("uuid").v4;

const Manager = {
  // Fetch all users matching the keyword in name or email
  getAll: async (keyword) => {
    let query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ],
      type: "user",
    };

    let t = await Model.find(query).sort({ createdAt: -1 });
    return t;
  },

  // Update a user's name by their ID
  updateName: async (id, newName) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        name: newName,
      },
      {
        new: true,
      }
    );

    return t ? t : false;
  },

  // Fetch a user by their ID
  getById: async (id) => {
    let user = await Model.findById(id);
    return user;
  },

  // Fetch a user by their email
  getByEmail: async (email) => {
    const t = await Model.findOne({ email: email });
    return t ? t : false;
  },

  // Create a new user
  create: async (t) => {
    let user = new Model(t);
    user = await user.save();
    return user ? user : false;
  },

  // Update a user's password by their ID
  updatePassword: async (id, obj) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        password: obj.password,
      },
      {
        new: true,
      }
    );
    return t ? t : false;
  },

  // Update a user's active status by their ID
  updateActiveStatus: async (id, newStatus) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        active: newStatus,
      },
      {
        new: true,
      }
    );

    return t ? t : false;
  },

  // Set a temporary password for a user by their email
  setTempPassword: async (email) => {
    const tempPassword = uuid();
    await Model.findOneAndUpdate(
      { email: email },
      {
        tempPassword: tempPassword,
      },
      {
        new: true,
      }
    );

    return tempPassword;
  },

  // Fetch a user by their temporary password
  getByTempPassword: async (token) => {
    return await Model.findOne({ tempPassword: token });
  },

  // Delete a user by their ID
  delete: async (id) => {
    let t = await Model.findByIdAndDelete(id);
    return t ? true : false;
  },

  // Add a favourite item to a user's list by their ID
  addFavourite: async (id, data) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        $addToSet: { favourites: data },
      },
      { new: true }
    );
    return t ? t : false;
  },

  // Remove a favourite item from a user's list by their ID
  removeFavourite: async (id, data) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        $pull: { favourites: data },
      },
      { new: true }
    );

    return t ? t : false;
  },

  // Update a user's tags by their ID
  updateTags: async (id, tags) => {
    return await Model.findByIdAndUpdate(
      id,
      {
        tags: tags,
      },
      {
        new: true,
      }
    );
  },

  // Update a user's level by their ID
  updateLevel: async (id, level) => {
    return await Model.findByIdAndUpdate(
      id,
      {
        level: level,
      },
      {
        new: true,
      }
    );
  },

  // Add a roadmap to a user's list by their ID
  addRoadmap: async (id, data) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        $push: { roadmaps: data },
      },
      { new: true }
    );
    return t ? t : false;
  },

  // Remove a roadmap from a user's list by their ID and roadmap ID
  removeRoadmap: async (id, uid) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        $pull: { roadmaps: { id: uid } },
      },
      { new: true }
    );

    return t ? t : false;
  },

  // Update a user's roadmaps by their ID
  updateRoadmap: async (id, arr) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        roadmaps: arr,
      },
      { new: true }
    );

    return t ? t : false;
  },
};

module.exports = Manager;
