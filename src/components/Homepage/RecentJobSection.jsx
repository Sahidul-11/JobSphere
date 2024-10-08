import React from 'react';
import JobCard from '../shared/JobCard';


const RecentJob = () => {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      jobType: "Remote",
      education: "Bachelor's Degree",
      experience: "2 Years",
      postedDate: "21 Sept 2024",
      deadline: "30 Sept 2024",
      skills: ["React", "Tailwind CSS"],
    },
    {
      title: "Full Stack Developer",
      company: "InnovateX",
      jobType: "Remote",
      education: "Master's Degree",
      experience: "3 Years",
      postedDate: "20 Sept 2024",
      deadline: "29 Sept 2024",
      skills: ["Node.js", "Express", "MongoDB"],
    },
    {
      title: "UI/UX Designer",
      company: "Creative Minds",
      jobType: "Remote",
      education: "Graduation",
      experience: "1 Year",
      postedDate: "19 Sept 2024",
      deadline: "25 Sept 2024",
      skills: ["Figma", "Adobe XD"],
    },
    {
      title: "Backend Developer",
      company: "DevCore",
      jobType: "Remote",
      education: "Bachelor's Degree",
      experience: "4 Years",
      postedDate: "18 Sept 2024",
      deadline: "24 Sept 2024",
      skills: ["Node.js", "SQL", "AWS"],
    }
  ];


  return (
    <div className="container mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-8">Recent Jobs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg w-auto">See All Jobs</button>
      </div>
   
    </div>
  );
};


export default RecentJob;