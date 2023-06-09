const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.testApi = (req, res) => {
    res.json({ Status: 'I made it capt.' })
}

//REGISTER
// module.exports.register= (req, res) => {
//     User.create(req.body)
//         .then(user => {
//             const userToken = jwt.sign({
//                 id: user._id
//             }, process.env.SECRET_KEY);

//             res
//                 .cookie("usertoken", userToken, secret, {
//                     httpOnly: true
//                 })
//                 .json({ msg: "success!", user: user });
//         })
//         .catch(err => res.status(400).json(err))
// }
module.exports.createNewUser = (req, res)=>{
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY);            
            res
                .cookie("usertoken", userToken, {httpOnly: true})
                .json({msg: "success", user:user});
        })
        .catch(err => {
            console.log("in err")
            res.status(400).json(err)
        }); 
}

// LOGIN
module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
    const payload = {
        id: user._id
    };
    // if we made it this far, the password was correct
    const userToken = jwt.sign(payload,
        {
        id: user._id
    }, process.env.SECRET_KEY);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}

//LOGOUT
module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getAllUsers = (req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.json(err))
};

module.exports.getOneUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then((queriedLink) => {
            res.json(queriedLink);
        })
        .catch((err) => {res.status(400).json({err});
    });
};