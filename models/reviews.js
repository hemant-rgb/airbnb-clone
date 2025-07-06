const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbURL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to mongoose...");
  })
  .catch(() => {
    console.log("connection to mongoose fail...");
  });

async function main() {
  await mongoose.connect(dbURL);
}

let reviewSchema = new Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdat: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

let Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
