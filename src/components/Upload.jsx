import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid file type (PDF, JPG, PNG)');
        event.target.value = '';
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    setUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', selectedFile);

      // In a real app, you would make an API call here
      // For now, we'll simulate processing and navigate to results with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response data - in real app this would come from your backend
      const mockResults = {
        WaterfallSummary: "This document contains waterfall distribution information with 5 steps and multiple allocation tiers.",
        WaterfallMetrics: {
          "Total Distribution": 100000000,
          "Number of Steps": 5,
          "Distribution Type": "European Waterfall",
          "Management Fee": 2.5,
          "Carried Interest": 20.0
        },
        WaterfallSteps: [
          {
            "StepNumber": 1,
            "Description": "Return of Capital",
            "Threshold": 0,
            "Split": {
              "LPs": 100.0,
              "GP": 0.0
            },
            "Amount Distributed": 50000000
          },
          {
            "StepNumber": 2,
            "Description": "Preferred Return",
            "Threshold": 8.0,
            "Split": {
              "LPs": 100.0,
              "GP": 0.0
            },
            "Amount Distributed": 20000000
          },
          {
            "StepNumber": 3,
            "Description": "Catch-up",
            "Threshold": "Until GP reaches 20%",
            "Split": {
              "LPs": 0.0,
              "GP": 100.0
            },
            "Amount Distributed": 15000000
          },
          {
            "StepNumber": 4,
            "Description": "Carried Interest Split",
            "Threshold": "Thereafter",
            "Split": {
              "LPs": 80.0,
              "GP": 20.0
            },
            "Amount Distributed": 15000000
          }
        ]
      };

      // Navigate to results page with data
      navigate('/results', { state: { data: mockResults } });

    } catch (error) {
      console.error('Upload error:', error);
      alert('Error processing file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout title="Upload Document">
      <h2 className="mb-4">Upload a Document</h2>
      <form 
        onSubmit={handleSubmit} 
        className="p-4 border rounded bg-white shadow-sm"
      >
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Choose a document (PDF, JPG, PNG):
          </label>
          <input
            className="form-control"
            type="file"
            id="file"
            name="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            required
            disabled={uploading}
          />
          {selectedFile && (
            <div className="mt-2 text-muted">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>
        <button 
          className="btn btn-primary" 
          type="submit"
          disabled={uploading || !selectedFile}
        >
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Analyzing Document...
            </>
          ) : (
            'Analyze Document'
          )}
        </button>
      </form>
    </Layout>
  );
};

export default Upload;