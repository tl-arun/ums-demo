import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
// import { Card, CardContent } from '@/components/ui/card';
//  import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

//import Card  from '../src/components/ui/card';
//import  Button from '../ui/Button';
// import  Input  from '../../components/ui/Input';

const StudentDetailsForm3 = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    aadhar: '',
    pan: '',
    license: '',
    email: '',
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
    if (!file) return 'Invalid';
    
    if (type === 'photo') {
      const validImageTypes = ['image/png', 'image/jpeg'];
      return validImageTypes.includes(file.type) ? 'Valid' : 'Invalid';
    }
    
    // For other documents (Aadhar, PAN, License)
    return file.type === 'application/pdf' ? 'Valid' : 'Invalid';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({
      fullName: '',
      dob: '',
      aadhar: '',
      pan: '',
      license: '',
      email: '',
      photo: null,
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Student Details Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <Input 
          name="fullName" 
          value={formData.fullName} 
          onChange={handleChange} 
          placeholder="Enter your full name" 
          required 
        />
        <Input 
          name="dob" 
          type="date" 
          value={formData.dob} 
          onChange={handleChange} 
          required 
        />
        <Input 
          name="aadhar" 
          value={formData.aadhar} 
          onChange={handleChange} 
          placeholder="Enter 12-digit Aadhar number" 
          required 
        />
        <Input 
          name="pan" 
          value={formData.pan} 
          onChange={handleChange} 
          placeholder="Enter PAN number" 
          required 
        />
        <Input 
          name="license" 
          value={formData.license} 
          onChange={handleChange} 
          placeholder="Enter driving license number" 
          required 
        />
        <Input 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Enter email address" 
          required 
        />
        <Input 
          name="photo" 
          type="file" 
          accept="image/png, image/jpeg" 
          onChange={handleChange} 
        />
        <p className="col-span-2 text-sm text-gray-500">
          Admissible document types: .png or .jpg format only. File size must not exceed 5 MB.
        </p>
        <Button type="submit" className="col-span-2">Submit</Button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">Submitted Details</h3>
        <table className="w-full border text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Full Name</th>
              <th className="p-2">Aadhar Card</th>
              <th className="p-2">PAN Card</th>
              <th className="p-2">Driving License</th>
              <th className="p-2">Photo</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{data.fullName}</td>
                <td className="p-2">
                  {data.aadhar ? `${data.aadhar}.pdf` : 'N/A'}
                  <div className={`text-${data.aadhar ? 'green' : 'red'}-600 font-semibold`}>
                    {data.aadhar ? 'Valid' : 'Invalid'}
                  </div>
                </td>
                <td className="p-2">
                  {data.pan ? `${data.pan}.pdf` : 'N/A'}
                  <div className={`text-${data.pan ? 'green' : 'red'}-600 font-semibold`}>
                    {data.pan ? 'Valid' : 'Invalid'}
                  </div>
                </td>
                <td className="p-2">
                  {data.license ? `${data.license}.pdf` : 'N/A'}
                  <div className={`text-${data.license ? 'green' : 'red'}-600 font-semibold`}>
                    {data.license ? 'Valid' : 'Invalid'}
                  </div>
                </td>
                <td className="p-2">
                  {data.photo ? data.photo.name : 'N/A'}
                  <div className={`text-${getFileValidation(data.photo, 'photo') === 'Valid' ? 'green' : 'red'}-600 font-semibold`}>
                    {getFileValidation(data.photo, 'photo')}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetailsForm3;