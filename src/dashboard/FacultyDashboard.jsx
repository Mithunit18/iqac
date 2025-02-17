import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const FacultyPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(0); // Track the position of the menu button
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [cards, setCards] = useState([
    { id: 1, title: "Academic Details", uploaded: false },
    { id: 2, title: "Research Details", uploaded: false },
    { id: 3, title: "Placement Details", uploaded: false },
    { id: 4, title: "Guest Lectures", uploaded: false },
    { id: 5, title: "Workshops", uploaded: false },
    { id: 6, title: "Achievements", uploaded: false },
  ]);
  const navigate = useNavigate();

  // Handle file upload
  const handleFileUpload = (event, cardId) => {
    const uploadedFile = event.target.files[0];
    
    // Check if the file is a PDF
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      const newFile = {
        name: uploadedFile.name,
        status: "Pending", // Initial status
        cardId: cardId,
      };
      setUploadedFiles((prevFiles) => [...prevFiles, newFile]);

      // Update the card's uploaded status
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId ? { ...card, uploaded: true } : card
        )
      );

      alert(`File "${uploadedFile.name}" uploaded successfully!`);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleHoDPageNavigation = () => {
    navigate("/"); // Navigate to HoD page
  };

  const handleMenuButtonClick = (e) => {
    const buttonRect = e.target.getBoundingClientRect(); // Get the position of the menu button
    setButtonPosition(buttonRect.bottom); // Set the bottom position of the button for dropdown
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-900 text-white p-4 w-full mt-28 z-10">
        <h1 className="text-xl font-bold">Faculty - Upload Reports</h1>
        <button
          className="absolute right-4 transform -translate-y-1/2 bg-transparent border-none text-2xl cursor-pointer"
          onClick={handleMenuButtonClick}
        >
          <FiMenu />
        </button>
      </header>

      {/* Toggle Menu */}
      {menuOpen && (
        <div
          className="absolute right-4 bg-white shadow-lg rounded-lg p-4 z-20"
          style={{ top: `${buttonPosition + 10}px` }} // Position dropdown just below the menu button
        >
          <ul className="list-none p-0 m-0">
            <li className="py-2 cursor-pointer hover:text-blue-900">NOTIFICATION</li>
            <li className="py-2 cursor-pointer hover:text-blue-900">LogOut</li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow p-6 pt-25 w-full">
        <div className="flex flex-wrap gap-6 justify-center p-5">
          {/* Cards */}
          {cards.map(
            (card) =>
              !card.uploaded && (
                <div
                  key={card.id}
                  className="bg-white shadow-md rounded-lg p-6 w-80 h-80 flex flex-col justify-between transition-transform duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl"
                >
                  <h2 className="text-lg font-bold">{card.title}</h2>
                  <p className="text-gray-600 text-sm">
                    This is the {card.title.toLowerCase()} section.
                  </p>
                  <label
                    htmlFor={`file-upload-${card.id}`}
                    className="bg-blue-900 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-600"
                  >
                    Upload File (PDF only)
                  </label>
                  <input
                    type="file"
                    id={`file-upload-${card.id}`}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, card.id)}
                    accept="application/pdf" // Restrict the input to only PDF files
                  />
                </div>
              )
          )}
        </div>

        {/* Uploaded Files */}
        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 mb-4 flex flex-col"
            >
              <h3 className="text-lg font-bold">{file.name}</h3>
              <p className="text-gray-600">Status: {file.status}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FacultyPage;
