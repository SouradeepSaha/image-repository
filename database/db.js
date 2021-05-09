const mongoose = require("mongoose");

const Connect = async () => {
  //mongoose options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    const con = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = Connect;
