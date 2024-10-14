"use client";
import Loader from '@/app/loading';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaReact } from 'react-icons/fa';
import { MdBookmarkRemove, MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';

const JobListTable = () => {
    const [loading, setLoading] = useState(true);
    const session = useSession();
    const [jobData, setJobData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(1);
    const today = new Date();

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/getSaveJobs/${session?.data?.user?.email}`,
                    {
                        params: {
                            status: selectedStatus,
                            jobType: selectedType,
                            search: searchQuery,
                            page,
                            limit,
                        },
                    }
                );
                setJobData(data.jobs);
                setTotal(data.total);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        };

        fetchJobs();
    }, [session?.data?.user?.email, selectedStatus, selectedType, searchQuery, page, limit]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
        setPage(1); // Reset to first page on new search
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-center mb-8">Saved Jobs</h1>

            {/* Filter Section */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
                <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 w-full px-4 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option disabled value="">Filter by Status</option>
                        <option value="">All</option>
                        <option value="Live">Live</option>
                        <option value="Closed">Closed</option>
                    </select>

                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option disabled value="">Filter by Job Type</option>
                        <option value="">All</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract-Based">Contract-Based</option>
                    </select>

                    <div className="flex gap-2 w-full">
                        <input
                            type="text"
                            placeholder="Search by job title..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e)}
                            className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded-md">Search</button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border rounded-lg shadow-md">
                {
                    loading ? <Loader /> : <table className="min-w-full bg-white">
                        {/* Table Header */}
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">#</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Title</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Status</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Location Type</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Type</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Vacancy</th>
                                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Deadline</th>
                                <th className="px-6 py-4 text-right font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {jobData.map((job, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 text-xs md:text-sm">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-1 md:px-3 lg:px-6 py-4 flex items-center gap-2">
                                        <FaReact className="text-blue-500" />
                                        {job.job?.jobTitle}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block px-2 py-1 font-medium rounded-full ${new Date(job?.job?.deadline) > today
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                                }`}
                                        >
                                            {
                                                new Date(job?.job?.deadline) > today ? "Live" : "Closed"
                                            }
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{job.job?.locationType}</td>
                                    <td className="px-1 md:px-3 lg:px-6 py-4">
                                        <span className="inline-block px-2 py-1 font-medium rounded-full bg-blue-100 text-blue-600">
                                            {job.job?.jobType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block px-2 py-1 font-medium rounded-full bg-green-100 text-green-600">
                                            {job.job?.vacancy}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(job.job?.deadline).toLocaleDateString()}</td>
                                    <td className="pl-6 py-4 text-right flex gap-2">
                                        <button
                                            className="flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mx-2"
                                        >
                                            <MdBookmarkRemove className="text-lg flex items-center justify-center" />
                                        </button>
                                        <Link href={`/jobs/${job?.job?._id}`}>
                                            <button
                                                className="flex items-center justify-center gap-1 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                                            >
                                                <MdOutlineRemoveRedEye className="text-lg flex items-center justify-center" />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }


                {/* Pagination */}
                <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-t">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">View</span>
                        <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))} className="border border-gray-300 rounded-md py-1 px-3">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                        <span className="text-gray-700">Applicants per page</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`text-gray-700 ${page === 1 && 'cursor-not-allowed'}`}>Previous</button>
                        <div className="space-x-2">
                            {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setPage(index + 1)}
                                    className={`btn p-2 border-2 text-xs  font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg ${page === index + 1 ? "bg-sky-500 text-white" : ""
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button disabled={page === Math.ceil(total / limit)} onClick={() => setPage(page + 1)} className={`text-gray-700 ${page === Math.ceil(total / limit) && 'cursor-not-allowed'}`}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListTable;

{/* <tr key={index} className="border-b hover:bg-gray-50">
    <td className="px-6 py-4">{job.role}</td>
    <td className="px-6 py-4">
        <span
            className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${job.jobStatus === "Live"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
        >
            {job.jobStatus}
        </span>
    </td>
    <td className="px-6 py-4">{job.datePosted}</td>
    <td className="px-6 py-4">{job.endDate}</td>
    <td className="px-6 py-4">
        <span className="inline-block px-2 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600">
            {job.jobType}
        </span>
    </td>
    <td className="px-6 py-4">
        <span className="inline-block px-2 py-1 text-sm font-medium rounded-full bg-green-100 text-green-600">
            {job.appliedStatus}
        </span>
    </td>
    <td className="px-6 py-4 text-right">
        <button className="text-gray-500 hover:text-gray-700">
            <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" />
                <path d="M12 17.5C12.8284 17.5 13.5 16.8284 13.5 16C13.5 15.1716 12.8284 14.5 12 14.5C11.1716 14.5 10.5 15.1716 10.5 16C10.5 16.8284 11.1716 17.5 12 17.5Z" />
                <path d="M12 7.5C12.8284 7.5 13.5 6.82843 13.5 6C13.5 5.17157 12.8284 4.5 12 4.5C11.1716 4.5 10.5 5.17157 10.5 6C10.5 6.82843 11.1716 7.5 12 7.5Z" />
            </svg>
        </button>
    </td>
</tr> */}
