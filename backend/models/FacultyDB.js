const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const FacultyAuthenticationSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  name:{ type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
FacultyAuthenticationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("FacultyAuthentication", FacultyAuthenticationSchema);
