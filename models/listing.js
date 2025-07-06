const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./reviews.js");

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

let Userschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },

    url: {
      type: String,
      default: "default link", // if value is not provided
      set: (v) => (v === "" ? "default link" : v), // if value of img is there but empty
    },
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

/*mongoose middleware*/
/*will delete reviews related to given listing when listins is deleted*/
Userschema.post("findByIdAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

let listing = mongoose.model("listing", Userschema);

module.exports = listing;
