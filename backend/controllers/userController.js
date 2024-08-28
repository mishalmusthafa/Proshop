import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc Auth user & get Token
// @routes POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    res.send('Auth user');
});

// @desc Register user
// @routes POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('Register User');
});

// @desc Logout User
// @routes POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('Logout User');
});

// @desc Get user Profile
// @routes GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile');
});

// @desc Update user Profile
// @routes PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
});

// by adimin//
// @desc Get Users
// @routes GET /api/users
// @access Private/admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

// @desc Get Users by id
// @routes GET /api/users/:id
// @access Private/admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get users by id');
});

// @desc Delete User
// @routes DELETE /api/users/:id
// @access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

// @desc Update User
// @routes DELETE /api/users/:id
// @access Private/admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
};
