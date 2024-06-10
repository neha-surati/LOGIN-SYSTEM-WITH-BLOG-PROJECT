const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },

  image: String,
  title: String,
 description: String,

});

const blogDB= mongoose.model('blogTbl',blogSchema);

module.exports= blogDB