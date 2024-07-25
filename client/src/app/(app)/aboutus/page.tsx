import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">About Us</h1>
        <p className="text-gray-600 mb-6">
          Welcome to Van Seva! We are dedicated to leveraging the power of image analytics and machine learning to revolutionize forestry management.
        </p>
        <div className="text-left mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            Our mission is to empower forestry experts with automated tree enumeration and disease detection tools. By providing accurate data and insights, we aim to support sustainable forestry practices and the health of our natural ecosystems.
          </p>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Innovation: Embracing the latest technologies to drive change in forestry management.</li>
            <li>Sustainability: Promoting practices that preserve and protect our forests for future generations.</li>
            <li>Accuracy: Providing precise and reliable data to support informed decision-making.</li>
            <li>Integrity: Upholding the highest standards of honesty and transparency in our work.</li>
            <li>Collaboration: Working together with forestry experts and stakeholders to achieve common goals.</li>
          </ul>
        </div>

        <div className="text-left mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Our Team</h2>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li><a rel='noopener noreferrer' href="https://github.com/Ashwin1902" target='_blank' className="text-blue-500 hover:underline">Ashwin Bansal</a> - ML Developer (Team Leader)</li>
            <li><a rel='noopener noreferrer' href="https://github.com/AnshJain9159" target='_blank' className="text-blue-500 hover:underline">Ansh Jain</a> - Web Developer</li>
            <li><a rel='noopener noreferrer'href="https://github.com/abhinav2805-ux" target='_blank' className="text-blue-500 hover:underline">Abhinav Gupta</a> - Web Developer</li>
            <li><a  rel='noopener noreferrer' href="https://github.com/coderkartikeya" target='_blank' className="text-blue-500 hover:underline">Katrtikeya Vats</a> - Deep Learning Expert </li>
          </ul>
        </div>

        <div className="text-left mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">GitHub Repository</h2>
          <p className="text-gray-600 mb-4">
            You can view and contribute to our project on GitHub:
          </p>
          <a  rel='noopener noreferrer' href="https://github.com/abhinav2805-ux/kuchbhi" target="_blank" className="text-blue-500 hover:underline">
            Link To Out GitHub Repo.
          </a>
        </div>

        <div className="text-left mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Terms and Conditions</h2>
          <p className="text-gray-600 mb-4">
            By using our platform, you agree to the following terms and conditions:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Use the platform responsibly and ethically.</li>
            <li>Respect the intellectual property of others.</li>
            <li>Do not use the platform for any unlawful activities.</li>
            <li>We reserve the right to modify these terms at any time.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
