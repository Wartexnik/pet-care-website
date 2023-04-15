const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/');
            return;
        }
        User.update(
            req.body.fields,
            { where: { id: req.session.user_id } }
        ).then(async result => {
            const user = await User.findByPk(req.session.user_id)
            req.session.name = user.name
            req.session.phone = user.phone
            res.status(200).json({ msg: 'Profile updated!' });
        }).catch(result => {
            res.status(500).json({ error: 'Failed to update profile' });
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getAllUsers,
    updateProfile
};