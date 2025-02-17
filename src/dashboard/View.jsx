import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ViewPage = () => {
    const { classId } = useParams();
    const [reports, setReports] = useState({});
    const [newReport, setNewReport] = useState("");
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const titles = [
        "Academic Details",
        "Research Details",
        "Placement Details",
        "Guest Lectures",
        "Workshops",
        "Achievements",
    ];

    const handleReportSubmit = () => {
        if (!newReport.trim()) {
            alert("Please enter a report!");
            return;
        }
        setReports((prevReports) => ({
            ...prevReports,
            [classId]: {
                ...prevReports[classId],
                [titles[selectedCardIndex]]: newReport,
            },
        }));
        setNewReport("");
        alert("Report submitted successfully!");
    };

    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 w-full">
            {/* Header */}
            <header className="flex items-center bg-blue-900 text-white p-4 w-full mt-28 z-10">
                <h1 className="text-xl font-bold mx-auto">Class {String.fromCharCode(64 + parseInt(classId))} - Details</h1>
            </header>


            {/* Main Content */}
            <main className="flex-grow p-6 pt-15 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center p-5">
                    {/* Cards */}
                    {titles.map((title, index) => (
                        <div
                            key={index}
                            style={{ backgroundColor: "#f1eded" }}
                            className="shadow-md rounded-lg p-6 h-96 w-90 flex flex-col justify-between transition-transform duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl"
                            onClick={() => handleCardClick(index)} // Show report details on click
                        >
                            <h2 className="text-lg font-bold">{title}</h2>
                            <p className="text-gray-600 text-sm">
                                This is the {title.toLowerCase()} section for Class{" "}
                                {String.fromCharCode(64 + parseInt(classId))}.
                            </p>
                            <button className="bg-blue-900 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:bg-blue-600">
                                View
                            </button>
                        </div>
                    ))}
                </div>

                {/* Report Details and Submission Section */}
                {selectedCardIndex !== null && (
                    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto mt-8">
                        <h2 className="text-xl font-bold mb-4">Report: {titles[selectedCardIndex]}</h2>
                        <div className="mb-4">
                            {reports[classId] && reports[classId][titles[selectedCardIndex]] ? (
                                <p>{reports[classId][titles[selectedCardIndex]]}</p>
                            ) : (
                                <p>No report submitted yet for this section.</p>
                            )}
                        </div>

                        {/* Form to Submit a New Report */}
                        <textarea
                            value={newReport}
                            onChange={(e) => setNewReport(e.target.value)}
                            placeholder={`Enter a report for ${titles[selectedCardIndex]}`}
                            className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <button
                            className="bg-blue-900 text-white px-6 py-2 rounded-md transition-colors duration-200 hover:bg-blue-600"
                            onClick={handleReportSubmit}
                        >
                            Submit Report
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ViewPage;
