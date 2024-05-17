import { Get, Post } from "./common";

export default class UserService {
  static getAll = async (data) => await Post({ path: "users", body: data }); // Method to get all users

  static getById = async (token, userId) =>
    await Get({ path: `users/${userId}`, token }); // Method to get user by ID

  static login = async (data) =>
    await Post({ path: "users/login", body: data });

  static activateAccount = async (data) =>
    await Post({ path: "users/activate", body: data }); // Method to activate account

  static signup = async (data) =>
    await Post({ path: "users/signup", body: data }); // Method for user signup

  static update = async (token, data) =>
    await Post({ path: "users/update", token, body: data }); // Method to update user data

  static addFavourite = async (token, data) =>
    await Post({ path: "users/add-favourite", token, body: data }); // Method to add favourite

  static removeFavourite = async (token, data) =>
    await Post({ path: `users/remove-favourite`, token, body: data }); // Method to remove favourite

  static updateTags = async (token, data) =>
    await Post({ path: "users/tags", token, body: data }); // Method to update tags

  static updateLevel = async (token, data) =>
    await Post({ path: "users/level", token, body: data }); // Method to update level

  static addRoadmap = async (token, data) =>
    await Post({ path: "users/add-roadmap", token, body: data }); // Method to add roadmap

  static removeRoadmap = async (token, data) =>
    await Post({ path: `users/remove-roadmap`, token, body: data }); // Method to remove roadmap

  static updateRoadmap = async (token, data) =>
    await Post({ path: `users/update-roadmap`, token, body: data }); // Method to update roadmap
}
