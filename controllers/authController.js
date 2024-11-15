const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register function
const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    // Validate input
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).send({ message: 'User already exists', success: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        await User.create(username, email, hashedPassword, role);
        return res.status(201).json({ message: 'User registered successfully', success: true });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password' });
    }

    try {
        // Fetch user from the database
        const foundUser = await User.findByEmail(email);
        if (foundUser.length === 0) {
            return res.status(400).send({ message: 'User not found', success: false });
        }

        const user = foundUser[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials', success: false });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        // Send a success response with the user data and token
        return res.status(200).send({
            message: "Login Successful",
            token,
            user: { id: user.id, username: user.username, role: user.role },  // Fixed user.id
            success: true,
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ message: `Error in login CTRL: ${error.message}` });
    }
};

// Get Profile function
const getProfile = async (req, res) => {
    const { userId } = req.body;

    try {
        const foundUser = await User.findById(userId);
        if (foundUser.length === 0) {
            return res.status(404).send({ message: "User not found", success: false });
        }

        const user = foundUser[0];

        return res.status(200).send({
            success: true,
            data: {
                username: user.username, // Use "username" instead of "name"
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).send({ message: 'Server error', success: false });
    }
};

module.exports = {
    register,
    login,
    getProfile,
};
