const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      monthlyBudget,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!/^[A-Za-z.' -]{3,40}$/.test(trimmedName)) {
      return res.status(400).json({
        message: "Name must be between 3 and 40 characters and contain only letters.",
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Invalid email address.",
      });
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,50}$/.test(password)
    ) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number and special character.",
      });
    }

    if (
      monthlyBudget &&
      (Number(monthlyBudget) < 100 ||
        Number(monthlyBudget) > 10000000)
    ) {
      return res.status(400).json({
        message: "Budget must be between ₹100 and ₹10,000,000.",
      });
    }

    const existingUser = await User.findOne({
      email: trimmedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      monthlyBudget,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user: newUser,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
    return res.status(400).json({
        message: "Email and password are required.",
    });
}

const trimmedEmail = email.trim().toLowerCase();
        console.log(req.body);

        // Find user
        const user = await User.findOne({
    email: trimmedEmail,
});

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        // Check if account is temporarily locked
if (
  user.lockUntil &&
  user.lockUntil > Date.now()
) {
  const secondsLeft = Math.ceil(
    (user.lockUntil - Date.now()) / 1000
  );

  return res.status(429).json({
    message: `Too many failed login attempts. Try again in ${secondsLeft} seconds.`,
  });
}

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

  user.loginAttempts += 1;

  if (user.loginAttempts >= 5) {
    user.lockUntil = new Date(Date.now() + 30 * 1000);
    user.loginAttempts = 0;
  }

  await user.save();

  return res.status(400).json({
    message: "Invalid email or password",
  });

}
// Reset failed attempts
user.loginAttempts = 0;
user.lockUntil = null;

await user.save();

        

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Send response
        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
    id: user._id,
    name: user.name,
    email: user.email,
    monthlyBudget: user.monthlyBudget,
    profileImage: user.profileImage,
},
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};
const updateProfile = async (req, res) => {
  try {

    const {
      name,
      phone,
      occupation,
      monthlyBudget,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (occupation !== undefined) {
      user.occupation = occupation;
    }

    if (monthlyBudget !== undefined) {
      user.monthlyBudget = monthlyBudget;
    }

    await user.save();

    res.status(200).json({
      message: "Profile Updated Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        occupation: user.occupation,
        monthlyBudget: user.monthlyBudget,
        profileImage: user.profileImage,
        currency: user.currency,
        language: user.language,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
const changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password Updated Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  changePassword,
};