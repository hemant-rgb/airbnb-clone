const userdata = require("./data.js");
const listing = require("../models/listing.js");
const mongoose = require("mongoose");
main()
  .then(() => {
    console.log("connected to mongoose...");
  })
  .catch(() => {
    console.log("connection to mongoose fail...");
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

async function initdb() {
  await listing.deleteMany({});
  userdata.data = userdata.data.map((obj) => ({
    ...obj,
    owner: "6866b89a39712e3a5520db99",
  }));
  await listing.insertMany(userdata.data);
  await mongoose.disconnect();
  console.log("data inserted successfully...");
}

initdb();
