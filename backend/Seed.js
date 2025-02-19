const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Use bcryptjs as per your setup
const FacultyAuthentication = require("./models/FacultyDB"); // Adjust path if needed
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

const seedFaculty = async () => {
  try {
    // Clear existing data
    await FacultyAuthentication.deleteMany();
    console.log("🗑️ Existing faculty records removed");

    // Sample faculty data with 'name' attribute
    const facultyData = [
      {
        name: "John Doe",
        departmentName: "Computer Science",
        emailId: "csfaculty@example.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        name: "Alice Smith",
        departmentName: "Electrical Engineering",
        emailId: "eefaculty@example.com",
        password: await bcrypt.hash("securepass", 10),
      },
      {
        name: "Robert Brown",
        departmentName: "Mechanical Engineering",
        emailId: "mefaculty@example.com",
        password: await bcrypt.hash("mechpass", 10),
      },
    ];

    // Insert faculty data
    await FacultyAuthentication.insertMany(facultyData);
    console.log("✅ Faculty data seeded successfully!");

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    mongoose.connection.close();
  }
};

// Run the function
seedFaculty();
