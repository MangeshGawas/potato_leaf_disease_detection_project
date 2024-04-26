import React, { useState } from "react";
import "./App.css"; // Import the stylesheet

function App() {
  const [selectedFile, setSelectedFile] = useState(null); 
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [newUploadedImage, setNewUploadedImage] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Set selectedFile when file is selected
    setUploadedImage(URL.createObjectURL(event.target.files[0]));
    setNewUploadedImage(true)
  };

  const handlePredict = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPrediction(data.class);
        setConfidence(data.confidence);
        setNewUploadedImage(false)

      })
      .catch((error) => console.error("Error:", error));
  };
  

  return (
    <div className="container">
      <div className="section">
        <input type="file" onChange={handleFileChange} className="input" />
        {uploadedImage && (
          <div className="imageContainer">
            <h2>Uploaded Image:</h2>
            <img src={uploadedImage} alt="Uploaded" className="image" />
          </div>
        )}
        <button onClick={handlePredict} className="button">
          Predict
        </button>
        {prediction && confidence && !newUploadedImage && (
          <div className="predictionContainer">
            <h2>Prediction:</h2>
            <p>{`Class: ${prediction}`}</p>
            <p>{`Confidence: ${confidence}%`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
 