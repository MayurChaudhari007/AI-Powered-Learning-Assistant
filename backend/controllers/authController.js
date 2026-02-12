
const User = require('../models/User');
const Document = require('../models/Document');
const Flashcard = require('../models/Flashcard');
const Quiz = require('../models/Quiz');
const Message = require('../models/Message');
const Concept = require('../models/Concept');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../config/multer');

// ... (register, login, getMe, updateProfile remain same or slightly optimized)
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' });

        res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' });

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        next(err);
    }
};

// // @desc    Update user profile
// // @route   PUT /api/auth/profile
// // @access  Private
// exports.updateProfile = async (req, res, next) => {
//     try {
//         const { name, oldPassword, newPassword } = req.body;
//         const user = await User.findById(req.user.id);

//         // 1. Always verify the old password for security
//         if (!oldPassword) {
//             return res.status(400).json({ message: 'Please provide your current password' });
//         }

//         const isMatch = await bcrypt.compare(oldPassword, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Current password is incorrect' });
//         }

//         // 2. Update Name if provided
//         if (name) user.name = name;
        
//         // 3. Update Password if a new one is provided
//         if (newPassword) {
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(newPassword, salt);
//         }

//         await user.save();

//         res.json({
//             success: true,
//             user: { id: user.id, name: user.name, email: user.email }
//         });
//     } catch (err) {
//         next(err);
//     }
// };

/**
 * @desc    Delete user profile and ALL associated data (The Absolute Wipe)
 * @route   DELETE /api/auth/profile
 * @access  Private
 */
// exports.deleteProfile = async (req, res, next) => {
//     try {
//         const userId = req.user.id;
//         const { password } = req.body;

//         // 1. Verification Step: User must provide password to delete account
//         if (!password) {
//             return res.status(400).json({ message: 'Please provide your password to confirm deletion.' });
//         }

//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Incorrect password. Account deletion aborted.' });
//         }

//         console.log(`🧨 Initiating full account purge for user: ${user.email}`);

//         // 2. Fetch all user documents to clean Cloudinary
//         const userDocs = await Document.find({ user: userId });
        
//         // 3. Delete Physical Files from Cloudinary
//         if (userDocs.length > 0) {
//             const cloudinaryDeletions = userDocs.map(doc => 
//                 cloudinary.uploader.destroy(doc.cloudinaryId, { resource_type: 'raw' })
//             );
//             await Promise.all(cloudinaryDeletions);
//             console.log(`✅ ${userDocs.length} PDF files removed from Cloudinary.`);
//         }

//         // 4. Parallel Database Purge
//         // We use the field 'user' for most, but 'document' link is also cleaned 
//         // because we are deleting the user who owns those documents.
//         await Promise.all([
//             Document.deleteMany({ user: userId }),
//             Flashcard.deleteMany({ user: userId }),
//             Quiz.deleteMany({ user: userId }),
//             Message.deleteMany({ user: userId }),
//             Concept.deleteMany({ user: userId })
//         ]);

//         // 5. Finally, delete the User record
//         await User.findByIdAndDelete(userId);

//         console.log(`👋 Account and all associated data deleted successfully.`);
        
//         res.json({ 
//             success: true, 
//             message: 'Your account and all associated data have been permanently deleted.' 
//         });

//     } catch (err) {
//         console.error("❌ Account Purge Error:", err.message);
//         next(err);
//     }
// };



// @desc    Update user profile (Flexible Name vs Secure Password)
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 1. CONDITIONAL LOGIC: If user is trying to change password
        if (newPassword) {
            // Require old password for security
            if (!oldPassword) {
                return res.status(400).json({ 
                    message: 'Current password is required to set a new password' 
                });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            // Hash and update new password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        // 2. Name Change: Always allowed without password
        if (name) {
            user.name = name;
        }

        await user.save();

        res.json({
            success: true,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete account and ALL data (Requires Password)
// @route   DELETE /api/auth/profile
// @access  Private
exports.deleteProfile = async (req, res, next) => {
    try {
        const { password } = req.body; // Always required for deletion

        if (!password) {
            return res.status(400).json({ message: 'Please provide your password to delete account' });
        }

        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // CASCADE DELETE: Purge everything
        const userDocs = await Document.find({ user: user._id });
        
        // Wipe Cloudinary Files
        if (userDocs.length > 0) {
            const cloudDeletes = userDocs.map(doc => 
                cloudinary.uploader.destroy(doc.cloudinaryId, { resource_type: 'raw' })
            );
            await Promise.all(cloudDeletes);
        }

        // Wipe Database Collections
        await Promise.all([
            Document.deleteMany({ user: user._id }),
            Flashcard.deleteMany({ user: user._id }),
            Quiz.deleteMany({ user: user._id }),
            Message.deleteMany({ user: user._id }),
            Concept.deleteMany({ user: user._id }),
            User.findByIdAndDelete(user._id)
        ]);

        res.json({ success: true, message: 'Account deleted forever' });
    } catch (err) {
        next(err);
    }
};