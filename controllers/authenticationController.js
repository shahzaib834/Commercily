const User = require('../models/user');
// const cloudinary = require('cloudinary');

const registerUser = async (req, res) => {
  try {
    // const cloudinaryResult = await cloudinary.v2.uploader.upload(
    //   req.body.avatar,
    //   {
    //     folder: 'Shop-it/avatars',
    //     width: 150,
    //     crop: 'scale',
    //   }
    // );

    const { name, email, password } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: 'Please provide email address',
      });

      return;
    }

    const user = await User.create({
      email,
      //avatar: {
      //  public_id: cloudinaryResult.public_id,
      //  url: cloudinaryResult.secure_url,
      //},
    });

    //const token = user.generateWebToken();

    // Saving token into cookie
    // const options = {
    //   expires: new Date(
    //     Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    // };

    res.status(201).json({
      success: true,
      message: 'User Created Succesfully',
      user
    })
    // res.status(201).cookie('token', token, options).json({
    //   success: true,
    //   message: 'User Created successfully',
    //   user,
    //   token,
    // });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: 'Please enter email!',
      });

      return;
    }

    const user = await User.findOne({ email })

    if (!user) {
      const user = await User.create({
        email,
        //avatar: {
        //  public_id: cloudinaryResult.public_id,
        //  url: cloudinaryResult.secure_url,
        //},
      });

      return res.status(201).json({
        success: true,
        message: 'User Created Succesfully',
        user
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Logged in',
      user
    });

    //const isPasswordMatched = await user.matchPassword(password);

    // if (!isPasswordMatched) {
    //   res.status(401).json({
    //     success: false,
    //     message: 'Invalid email or password',
    //   });

    //   return;
    // }

    //const token = user.generateWebToken();

    // Saving token into cookie
    // const options = {
    //   expires: new Date(
    //     Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    // };

    // res.status(200).json({
    //   success: true,
    //   //token,
    //   user,
    // });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  // res.cookie('token', null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  // });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword != confirmPassword) {
      res.status(400).json({
        success: false,
        message: 'New password and confirm password not matched',
      });

      return;
    }

    const user = await User.findById(req.user.id).select('+password');

    // Check previous password
    const isMatched = await user.matchPassword(oldPassword);

    if (!isMatched) {
      res.status(400).json({
        success: false,
        message: 'Wrong Password',
      });

      return;
    }

    user.password = newPassword;
    await user.save();

    const token = user.generateWebToken();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const updateProfile = async (req, res) => {
  // Update Avatar TODO
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: 'Updated Succesfully',
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      Count: users.length,
      users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'User not found. Check your id',
      });

      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: 'Updated Succesfully',
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });

      return;
    }

    // TODO - Remove avatar from cludinary

    await user.remove();

    res.status(200).json({
      success: true,
      message: 'Deleted Succesfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  getMyProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
