const multer = require("multer");
const blogDB = require("../models/blog.schema");
const user = require("../models/user.schema");
const fs = require("fs");

let blogId;

const strorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/image");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImage = multer({ storage: strorage }).single("image");

const home = async (req, res) => {
  try {
    let data = await blogDB.find();
    return res.render("index", { blogData: data });
  } catch (error) {
    console.log(error);
  }
};

const signup = async (req, res) => {
  let data = await user.create(req.body);
  return res.redirect("/login");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let User = await user.findOne({ email: email });

  if (User) {
    if (User.password === password) {
      return res.redirect("/");
    }
    console.log("Wrong password....");
    return res.redirect("login");
  } else {
    console.log("Wrong email....");
    return res.redirect("login");
  }
};

const addblog = async (req, res) => {
  const image = req.file.path;
  try {
    let data = await blogDB.create({ ...req.body, image });
    console.log(data);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const deleteblog = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let data = await blogDB
      .findByIdAndDelete(id)
      .then((singleRecode) => {
        fs.unlinkSync(singleRecode.image);
        return res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

const editblog = async (req, res) => {
  const { id } = req.params;
    blogId = id;
  try {
    const  data = await blogDB.findById(id);
    // console.log(blog);
    return res.render("editblog",{ blogData: data  });
  } catch (error) {
    console.log(error);
  }
};

const updateblog = async (req, res) => {
  if (req.file) {
    blogDB
      .findById(blogId)
      .then((result) => {
        fs.unlinkSync(result.image);
      })
      .catch((err) => {
        console.log(error);
      });

    let image = req.file.path;
    try {
      let data = await blogDB.findByIdAndUpdate(blogId, { ...req.body, image });
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let data = await blogDB.findByIdAndUpdate(blogId, req.body);
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
};

const logout = (req, res) => {
  res.clearCookie("user");
  res.redirect("/login");
};

const local = async (req, res) => {
  console.log(req.body);
  res.end();
};

const indexPage = (req, res) => {
  return res.render("index");
};

const loginPage = (req, res) => {
  return res.render("login");
};
const signupPage = (req, res) => {
  return res.render("signup");
};
const addblogPage = async (req, res) => {
  return res.render("addblog");
};
module.exports = {
  home,
  signup,
  indexPage,
  login,
  loginPage,
  signupPage,
  addblogPage,
  uploadImage,
  addblog,
  deleteblog,
  editblog,
  updateblog,
  logout,local
};
