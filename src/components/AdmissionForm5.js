import React, { useState } from "react";
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import Label from './ui/Label';

const StudentDetailsForm5 = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Dob: "",
    //aadhar: "",
    //pan: "",
    DrivingLicenseNo: "",
    email: "",
    contactNumber: "",
    photo: null,
    Aadhar: null,
    Pan: null,
    DrivingLicence: null,
    Marksheet: null
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, Dob: e.target.value });
  };

  const getFileValidation = (file) => {
    if (!file) return { status: "Invalid", color: "red" };
    
    const validImageTypes = ["image/png", "image/jpeg", "application/pdf"];
    const isValid = validImageTypes.includes(file.type);
    
    return {
      status: isValid ? "Valid" : "Invalid",
      color: isValid ? "green" : "red"
    };
  };

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create FormData object to handle file uploads
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
  
      // Submit to server endpoint
      const response = await fetch('https://stagingapi.teamleaseedtech.com/api/enquiry/saveForm', {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header - let the browser set it with boundary
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Success:', result);
      
      // Update local state with submitted data
      setSubmittedData([...submittedData, formData]);
      
      // Reset form
      setFormData({
        fullName: "",
        Dob: "",
        AadharNo: "",
        pan: "",
        DrivingLicenseNo: "",
        email: "",
        contactNumber: "",
        photo: null,
        Aadhar: null,
        Pan: null,
        DrivingLicence: null,
        marksheet_file: null
      });
  
      alert('Form submitted successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Convert all files to base64
      const filesToConvert = [
        'Aadhar', 'Pan', 'DrivingLicence', 'Marksheet'
      ];
      
      const formDataWithBase64 = { ...formData };
      
      // Convert each file to base64
      for (const field of filesToConvert) {
        if (formData[field]) {
          formDataWithBase64[field] = await fileToBase64(formData[field]);
        }
      }
  
      // Submit to server endpoint
      const response = await fetch('https://stagingapi.teamleaseedtech.com/api/enquiry/saveForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithBase64),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Success:', result);
      
      // Update local state with submitted data
      setSubmittedData([...submittedData, formData]);
      
      // Reset form
      setFormData({
        Name: "",
        Dob: "",
        AadharNo: "",
        PanNo: "",
        DrivingLicenseNo: "",
        email: "",
        contactNumber: "",
        photo: null,
        Aadhar: null,
        Pan: null,
        DrivingLicence: null,
        Marksheet: null,
        MarksheetStatus: null
      });
  
      alert('Form submitted successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
      //alert('Form submitted successfully!');
    }
  };

  // Helper function to convert file to base64
const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8">Student Details Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="Name">Full Name</Label>
            <Input
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Date of Birth - Fixed */}
          <div className="space-y-2">
            <Label htmlFor="Dob">Date of Birth</Label>
            <Input
              id="Dob"
              name="Dob"
              type="date"
              value={formData.Dob}
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]} // Prevent future dates
              required
            />
          </div>

          {/* AadharNo Section */}
          <div className="space-y-2">
            <Label htmlFor="AadharNo">AadharNo Number</Label>
            <Input
              id="AadharNo"
              name="AadharNo"
              value={formData.AadharNo}
              onChange={handleChange}
              placeholder="Enter 12-digit AadharNo number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Aadhar">Aadhar Attachment</Label>
            <Input
              id="Aadhar"
              name="Aadhar"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
            />
            {formData.Aadhar && (
              <span className="text-sm text-gray-500">{formData.Aadhar.name}</span>
            )}
          </div>

          {/* PanNo Section */}
          <div className="space-y-2">
            <Label htmlFor="PanNo">PAN Number</Label>
            <Input
              id="PanNo"
              name="PanNo"
              value={formData.PanNo}
              onChange={handleChange}
              placeholder="Enter PAN number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Pan">PAN Attachment</Label>
            <Input
              id="Pan"
              name="Pan"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
            />
            {formData.Pan && (
              <span className="text-sm text-gray-500">{formData.Pan.name}</span>
            )}
          </div>

          {/* Driving DrivingLicenseNo Section */}
          <div className="space-y-2">
            <Label htmlFor="DrivingLicenseNo">Driving License Number</Label>
            <Input
              id="DrivingLicenseNo"
              name="DrivingLicenseNo"
              value={formData.DrivingLicenseNo}
              onChange={handleChange}
              placeholder="Enter driving DrivingLicenseNo number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="DrivingLicence">Driving License Attachment</Label>
            <Input
              id="DrivingLicence"
              name="DrivingLicence"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
            />
            {formData.DrivingLicence && (
              <span className="text-sm text-gray-500">{formData.DrivingLicence.name}</span>
            )}
          </div>

          {/* Marksheet Section */}
          <div className="space-y-2">
            <Label htmlFor="marksheet">Marksheet Details</Label>
            <Input
              id="MarksheetStatus"
              name="MarksheetStatus"
              value={formData.MarksheetStatus}
              onChange={handleChange}
              placeholder="Enter marksheet details"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Marksheet">Marksheet Attachment</Label>
            <Input
              id="Marksheet"
              name="Marksheet"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
            />
            {formData.Marksheet && (
              <span className="text-sm text-gray-500">{formData.Marksheet.name}</span>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
            />
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Admissible document types: .pdf, .png, or .jpg format only. File size must not exceed 5 MB.
        </p>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Submit
        </Button>
      </form>

      {submittedData.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Submitted Details</h3>
          <Card className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhar</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submittedData.map((data, index) => {
                  const aadharValidation = getFileValidation(data.Aadhar);
                  const panValidation = getFileValidation(data.Pan);
                  const licenseValidation = getFileValidation(data.DrivingLicence);
                  
                  return (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap">{data.Name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {data.Aadhar?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {data.Pan?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {data.DrivingLicence?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className={`text-${aadharValidation.color}-600`}>
                            Aadhar: {aadharValidation.status}
                          </span>
                          <span className={`text-${panValidation.color}-600`}>
                            PAN: {panValidation.status}
                          </span>
                          <span className={`text-${licenseValidation.color}-600`}>
                            DrivingLicenseNo: {licenseValidation.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentDetailsForm5;