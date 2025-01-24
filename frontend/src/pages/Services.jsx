import React from 'react';

function Services() {
  return (
    <div className='flex flex-col justify-center items-center p-8 space-y-8 bg-gray-100'>
      <h1 className='text-4xl font-bold text-gray-800'>Streamlined Appointment Booking</h1>
      <p className='text-lg text-gray-600'>Your health, scheduled with ease.</p>
      <img className='w-96 rounded-lg shadow-lg' src="/doctor meet2.jpg" alt="doctor meet" />
      <h2 className='text-3xl font-semibold text-gray-700'>Online and Offline Options</h2>
      <p className='text-center text-gray-600 max-w-2xl'>
        Whether you prefer a video consultation or a phone call, 
        HuluTena provides flexible booking options to suit your needs. 
        Choose the method that works best for you and connect with 
        trusted healthcare professionals effortlessly.
      </p>
      <p className='text-gray-500'>Event time zone: Asia/Shanghai GMT+08:00</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {[...Array(4)].map((_, index) => (
          <div key={index} className='flex flex-col items-center p-6 border rounded-lg bg-white shadow-md'>
            <img className='h-60 w-60 rounded-full object-cover mb-4' src="/doctor2.jpg" alt="doctor1 profile" />
            <h1 className='text-xl font-semibold text-gray-800'>Dr. Wendosen Tasew</h1>
            <p className='text-gray-600'>General Practitioner</p>
            <p className='text-gray-600'>5 years of experience</p>
            <p className='text-gray-600'>Speaks: English, Amharic</p>
            <p className='text-gray-600'>Online: True</p>
            <a className='text-blue-500 hover:underline mt-2' href="#">See Profile</a>
            <button className='mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
