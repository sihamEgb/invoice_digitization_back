const express = require("express");
const uuid = require("uuid");
const User = require("../models/user");
const multer = require("multer");
const auth = require("../middleware/auth");

const router = new express.Router();
let users = require("../usersData");

// public routes sign in / sing up
// route for sign in
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
    // res.send({ user: user.getPublicProfile(), token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    (req.user.tokens = req.user.tokens),
      filter((token) => {
        return token.token !== req.token;
      });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
// get all users
router.get("/", (req, res) => {
  res.json(users);
});

// get user by id
router.get("/:userId", (req, res) => {
  const found = users.filter((item) => item.userId === req.params.userId);
  console.log(found);
  res.json(found);
});

// create new user
router.put("/", (req, res) => {
  const newUser = {
    id: uuid.v1(),
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  if (!newUser.name || !newUser.email || !newUser.password) {
    return res.sendStatus(400);
  }
  users.push(newUser);
  res.json(newUser);
});

// update user by id
router.post("/:userId", (req, res) => {
  const found = users.find((user) => user.id === req.params.id);
  console.log("found user", found);
  if (found) {
    found.email = req.body.email;
    found.password = req.body.answer2;
    res.json(users);
  } else {
    return res.sendStatus(400);
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
// TODO remove this
// get all users
router.get("/users", auth, async (res, req) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});
// get user by id
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     return res.status(500).send();
//   }
// });

// update user
// const updateAgeAndCount = async (id, age) => {
//   const user = await User.findByIdAndUpdate(id, { age });
//   const count = await User.countDocuments({ age });
//   return count;
// };
// updateAgeAndCount("jfe436uht4", 2)
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// updating a user
router.patch("users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update" });
  }
  try {
    // const user = await User.findById(req.params.id);
    const user = req.user;
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});

    res.send(user);
  } catch (e) {
    // error in validation
    res.status(400).send();
  }
});
// delete  user
// const deleteTaskAndUpdate = async (id) => {
//   const user = await User.findByIdAndDelete(id);
//   const count = await User.countDocuments({ age: 30 });
//   return count;
// };
// deleteTaskAndUpdate("rm4;35j")
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   res.status(404).send();
    // }
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  dest: "avatars",
});
// avatar upload
router.post("/users/me/avatar", upload.single("avatar"), (req, res) => {
  res.send();
});
module.exports = router;
