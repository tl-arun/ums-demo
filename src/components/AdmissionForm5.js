import React, { useState } from "react";
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import Label from './ui/Label';

const StudentDetailsForm5 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    aadhar: "",
    pan: "",
    license: "",
    email: "",
    contactNumber: "",
    photo: null,
    aadhar_file: null,
    pan_file: null,
    driving_file: null,
    marksheet_file: null
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
    setFormData({ ...formData, dob: e.target.value });
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

  /* const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({
      fullName: "",
      dob: "",
      aadhar: "",
      pan: "",
      license: "",
      email: "",
      contactNumber: "",
      photo: null,
      aadhar_file: null,
      pan_file: null,
      driving_file: null,
      marksheet_file: null
    });
  }; */

  const handleSubmit = async (e) => {
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
      const response = await fetch('http://your-server-endpoint.com/api/student', {
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
        dob: "",
        aadhar: "",
        pan: "",
        license: "",
        email: "",
        contactNumber: "",
        photo: null,
        aadhar_file: null,
        pan_file: null,
        driving_file: null,
        marksheet_file: null
      });
  
      alert('Form submitted successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8">Student Details Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Date of Birth - Fixed */}
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]} // Prevent future dates
              required
            />
          </div>

          {/* Aadhar Section */}
          <div className="space-y-2">
            <Label htmlFor="aadhar">Aadhar Number</Label>
            <Input
              id="aadhar"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              placeholder="Enter 12-digit Aadhar number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aadhar_file">Aadhar Attachment</Label>
            <Input
              id="aadhar_file"
              name="aadhar_file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
            />
            {formData.aadhar_file && (
              <span className="text-sm text-gray-500">{formData.aadhar_file.name}</span>
            )}
          </div>

          {/* PAN Section */}
          <div className="space-y-2">
            <Label htmlFor="pan">PAN Number</Label>
            <Input
              id="pan"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              placeholder="Enter PAN number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pan_file">PAN Attachment</Label>
            <Input
              id="pan_file"
              name="pan_file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
            />
            {formData.pan_file && (
              <span className="text-sm text-gray-500">{formData.pan_file.name}</span>
            )}
          </div>

          {/* Driving License Section */}
          <div className="space-y-2">
            <Label htmlFor="license">Driving License Number</Label>
            <Input
              id="license"
              name="license"
              value={formData.license}
              onChange={handleChange}
              placeholder="Enter driving license number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="driving_file">Driving License Attachment</Label>
            <Input
              id="driving_file"
              name="driving_file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
            />
            {formData.driving_file && (
              <span className="text-sm text-gray-500">{formData.driving_file.name}</span>
            )}
          </div>

          {/* Marksheet Section */}
          <div className="space-y-2">
            <Label htmlFor="marksheet">Marksheet Details</Label>
            <Input
              id="marksheet"
              name="marksheet"
              value={formData.marksheet}
              onChange={handleChange}
              placeholder="Enter marksheet details"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marksheet_file">Marksheet Attachment</Label>
            <Input
              id="marksheet_file"
              name="marksheet_file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
            />
            {formData.marksheet_file && (
              <span className="text-sm text-gray-500">{formData.marksheet_file.name}</span>
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
                  const aadharValidation = getFileValidation(data.aadhar_file);
                  const panValidation = getFileValidation(data.pan_file);
                  const licenseValidation = getFileValidation(data.driving_file);
                  
                  return (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap">{data.fullName}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {data.aadhar_file?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {data.pan_file?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {data.driving_file?.name || "N/A"}
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
                            License: {licenseValidation.status}
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