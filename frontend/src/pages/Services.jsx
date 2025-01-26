import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'Specialist Doctor 1',
      experience: '10+ years',
      languages: ['English', 'Spanish'],
      availability: 'Online & In-person',
      specialty: 'Cardiologist',
      imgSrc: '/doctor2.jpg',
    },
    {
      id: 2,
      name: 'Specialist Doctor 2',
      experience: '8 years',
      languages: ['English', 'Amharic'],
      availability: 'Online Only',
      specialty: 'Dermatologist',
      imgSrc: '/doctor2.jpg',
    },
    {
      id: 3,
      name: 'Specialist Doctor 3',
      experience: '15 years',
      languages: ['English', 'French'],
      availability: 'In-person Only',
      specialty: 'Pediatrician',
      imgSrc: '/doctor2.jpg',
    },
    // Additional doctor entries can be added here
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.languages.some((lang) => lang.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (!filterCriteria || doctor.availability.toLowerCase().includes(filterCriteria.toLowerCase()))
    );
  });

  return (
    <div className='flex flex-col items-center p-12 bg-gray-50 min-h-screen'>
      <h1 className='text-4xl font-extrabold text-gray-800 text-center mb-4'>Healthcare Services at Your Fingertips</h1>
      <p className='text-lg text-gray-600 text-center max-w-2xl mb-8'>
        Discover a range of professional healthcare services designed to meet your needs, from consultations to specialized care. Our system ensures seamless booking and access to top-tier professionals.
      </p>

      <div className='w-full max-w-4xl mb-8'>
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <input
            type='text'
            placeholder='Search by name, specialty, or language...'
            className='flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className='p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
          >
            <option value=''>All Availability</option>
            <option value='Online'>Online</option>
            <option value='In-person'>In-person</option>
          </select>
        </div>
      </div>

      <div className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className='flex flex-col items-center p-6 border rounded-lg bg-white shadow-md'>
            <img className='h-40 w-40 rounded-full object-cover mb-4' src={doctor.imgSrc} alt={doctor.name} />
            <h3 className='text-xl font-semibold text-gray-800'>{doctor.name}</h3>
            <p className='text-sm text-gray-500 flex flex-row items-center gap-2 mb-2'>
              Verified Professional <FaCheckCircle color='green' size={16} />
            </p>
            <p className='text-sm text-gray-600 mb-1'>Specialty: {doctor.specialty}</p>
            <p className='text-sm text-gray-600 mb-1'>Experience: {doctor.experience}</p>
            <p className='text-sm text-gray-600 mb-1'>Languages: {doctor.languages.join(', ')}</p>
            <p className='text-sm text-gray-600 mb-1'>Availability: {doctor.availability}</p>
            <a className='text-blue-600 hover:underline text-sm mb-3' href='/profile'>View Full Profile</a>
            <button className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'>
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <p className='text-gray-600 text-center mt-8'>No doctors found matching your criteria. Please adjust your search or filters.</p>
      )}
    </div>
  );
}

export default Services;
