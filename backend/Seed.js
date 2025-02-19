const mongoose = require("mongoose");
const Faculty = require("./models/Faculty"); // Adjust the path based on your project structure

// Connect to MongoDB
mongoose.connect("mongodb+srv://mithunmit2023:B5KJP7lxdGPtvgdr@cluster0.trspu.mongodb.net/iqac_db?retryWrites=true&w=majority&appName=Cluster0"
    , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedFacultyData = async () => {
  try {
    // Sample faculty documents
    const facultyDocuments = [
      {
        departmentName: "Computer Science",
        documentName: "CS Curriculum.pdf",
        documentUrl: "/uploads/cs_curriculum.pdf",
      },
      {
        departmentName: "Mechanical Engineering",
        documentName: "ME Lab Manual.pdf",
        documentUrl: "/uploads/me_lab_manual.pdf",
      },
      {
        departmentName: "Electrical Engineering",
        documentName: "EE Project Guidelines.pdf",
        documentUrl: "/uploads/ee_project_guidelines.pdf",
      },
      {
        departmentName: "Civil Engineering",
        documentName: "Civil Project Guidelines.pdf",
        documentUrl: "/uploads/civil_project_guidelines.pdf",
      },
    ];

    // Clear existing data and insert new data
    await Faculty.deleteMany({});
    await Faculty.insertMany(facultyDocuments);

    console.log("Faculty collection seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding faculty collection:", error);
    mongoose.connection.close();
  }
};

seedFacultyData();
