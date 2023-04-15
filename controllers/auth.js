const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require("../models/user");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        User.findOne({ where: { email: email } })
        .then(user => {
            if (user) {
                res.status(409).json({ msg: 'This email is already registered. If that\'s you, please log in instead' });
            } else {
                bcrypt.hash(password, saltRounds)
                .then(async hash => {
                    const user = await User.create({
                        name: name,
                        email: email,
                        password_hash: hash
                    })
                    return user
                })
                .then(user => {
                    user = user.get({ plain: true })
                    req.session.logged_in = true
                    req.session.user_id = user.id
                    req.session.name = user.name
                    req.session.email = user.email
                    res.status(201).json({ msg: 'Thanks for signing up!' });
                })
            }
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        User.findOne({ where: { email: email } })
        .then(user => {
            bcrypt.compare(password, user.password_hash)
            .then((passwordMatches) => {
                if (passwordMatches) {
                    req.session.logged_in = true
                    req.session.user_id = user.id
                    req.session.name = user.name
                    req.session.email = user.email
                    res.status(200).json({ msg: 'Login successful' });
                } else {
                    res.status(401).json({ msg: 'Email / password is incorrect' });
                }
            })
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server error' });
    }
};

const logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({ msg: 'Server error' });
            } else {
                res.redirect('back');
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    signup,
    login,
    logout
};