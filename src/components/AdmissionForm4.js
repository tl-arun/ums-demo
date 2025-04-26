import React, { useState } from "react";
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import Label from './ui/Label';
//import { Card } from "@/components/ui/card";
//import { Input } from "@/components/ui/input";
//import { Button } from "@/components/ui/button";
//import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

const StudentDetailsForm4 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    aadhar: "",
    pan: "",
    license: "",
    email: "",
    contactNumber: "",
    photo: null,
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

  const getFileValidation = (file, type) => {
    if (!file) return "Invalid";

    if (type === "photo") {
      const validImageTypes = ["image/png", "image/jpeg"];
      return validImageTypes.includes(file.type) ? "Valid" : "Invalid";
    }

    return file.type === "application/pdf" ? "Valid" : "Invalid";
  };

  const handleSubmit = (e) => {
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
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-8 ms-4">Student Details Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <div className="relative">
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="w-full"
                required
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadhar">Aadhar Number</Label>
            <Input
              id="aadhar"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              placeholder="Enter 12-digit Aadhar number"
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">AAdhar Attachment</Label>
            <Input
              id="aadhar_file"
              name="aadhar_file"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pan">PAN Number</Label>
            <Input
              id="pan"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              placeholder="Enter PAN number"
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">PAN Attachment</Label>
            <Input
              id="pan_file"
              name="pan_file"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="license">Driving License Number</Label>
            <Input
              id="license"
              name="license"
              value={formData.license}
              onChange={handleChange}
              placeholder="Enter driving license number"
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Driving Attachment</Label>
            <Input
              id="driving_file"
              name="driving_file"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="license">Marksheet</Label>
            <Input
              id="marksheet"
              name="marksheet"
              value={formData.license}
              onChange={handleChange}
              placeholder="Enter driving license number"
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Marksheet Attachment</Label>
            <Input
              id="marksheet_file"
              name="marksheet_file"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              className="w-full"
              required
            />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              className="w-full"
            />
          </div> */}
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Admissible document types: .png or .jpg format only. File size must not exceed 5 MB.
        </p>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Submit
        </Button>
      </form>

      {submittedData.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Submitted Details</h3>
          <Card>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="p-3 text-left">Full Name</th>
                  <th className="p-3 text-left">Aadhar Card</th>
                  <th className="p-3 text-left">PAN Card</th>
                  <th className="p-3 text-left">Driving License</th>
                  <th className="p-3 text-left">Photo</th>
                </tr>
              </thead>
              <tbody>
                {submittedData.map((data, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{data.fullName}</td>
                    <td className="p-3">
                      {data.aadhar ? `${data.aadhar}.pdf` : "N/A"}
                      <div className={`text-${data.aadhar ? "green" : "red"}-600 font-semibold`}>
                        {data.aadhar ? "Valid" : "Invalid"}
                      </div>
                    </td>
                    <td className="p-3">
                      {data.pan ? `${data.pan}.pdf` : "N/A"}
                      <div className={`text-${data.pan ? "green" : "red"}-600 font-semibold`}>
                        {data.pan ? "Valid" : "Invalid"}
                      </div>
                    </td>
                    <td className="p-3">
                      {data.license ? `${data.license}.pdf` : "N/A"}
                      <div className={`text-${data.license ? "green" : "red"}-600 font-semibold`}>
                        {data.license ? "Valid" : "Invalid"}
                      </div>
                    </td>
                    <td className="p-3">
                      {data.photo ? data.photo.name : "N/A"}
                      <div
                        className={`text-${
                          getFileValidation(data.photo, "photo") === "Valid" ? "green" : "red"
                        }-600 font-semibold`}
                      >
                        {getFileValidation(data.photo, "photo")}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentDetailsForm4;