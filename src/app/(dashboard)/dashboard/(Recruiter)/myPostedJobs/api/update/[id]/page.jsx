"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateJobs = ({ params }) => {
  const { data: session } = useSession(); // Fetch session data
  const [job, setJob] = useState(null); // Initialize job state to null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/postedJobs/${params.id}`
        );
        setJob(response.data.data); // Update state with job details
      } catch (error) {
        toast.error("Error fetching job details.");
      }
    };
  
    loadJob(); // Fetch job details when component loads
  }, [params.id]); // No warning now, as `loadJob` is defined within useEffect
  
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: job, // Set initial form values
  });

  // Submit updated job data using Axios
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const resp = await axios.put(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/postedJobs/${params.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status === 200) {
        toast.success("Updated Successfully");
      }
    } catch (error) {
      toast.error("Failed to update job");
    }
    setLoading(false);
  };

  // Pre-fill form fields after job data is fetched
  useEffect(() => {
    if (job) {
      reset(job); // Update form with job details once they are loaded
    }
  }, [job, reset]);

  const inputField = `w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500`;

  if (!job) {
    return <div>Loading job details...</div>; // Show loading message until job data is fetched
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 px-2 mx-auto py-10"
      >
        <h1 className="text-2xl font-semibold mb-4">Update Job</h1>

        {/* Job Information */}
        <div>
          <h2 className="text-lg font-semibold">Job Information</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block">Job Title</label>
              <input
                {...register("jobTitle", { required: "Job title is required" })}
                className={inputField}
                placeholder="Job Title"
              />
              {errors.jobTitle && (
                <span className="text-red-500">{errors.jobTitle.message}</span>
              )}
            </div>

            <div>
              <label className="block">Job Type</label>
              <select
                {...register("jobType", { required: "Job type is required" })}
                className={inputField}
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
              {errors.jobType && (
                <span className="text-red-500">{errors.jobType.message}</span>
              )}
            </div>

            <div>
              <label className="block">Job Category</label>
              <input
                {...register("jobCategory", {
                  required: "Job category is required",
                })}
                className={inputField}
                placeholder="Job Category"
              />
              {errors.jobCategory && (
                <span className="text-red-500">
                  {errors.jobCategory.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Job Location</label>
              <input
                {...register("jobLocation", {
                  required: "Job location is required",
                })}
                className={inputField}
                placeholder="Job Location"
              />
              {errors.jobLocation && (
                <span className="text-red-500">
                  {errors.jobLocation.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Salary/Pay Range</label>
              <input
                {...register("salaryRange", {
                  required: "Salary range is required",
                })}
                className={inputField}
                placeholder="e.g. $40,000 - $60,000"
              />
              {errors.salaryRange && (
                <span className="text-red-500">
                  {errors.salaryRange.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Application Deadline</label>
              <input
                type="date"
                {...register("applicationDeadline", {
                  required: "Application deadline is required",
                })}
                className={inputField}
              />
              {errors.applicationDeadline && (
                <span className="text-red-500">
                  {errors.applicationDeadline.message}
                </span>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block">Job Description</label>
              <textarea
                {...register("jobDescription", {
                  required: "Job description is required",
                })}
                className={inputField}
                rows="4"
                placeholder="Job Description"
              />
              {errors.jobDescription && (
                <span className="text-red-500">
                  {errors.jobDescription.message}
                </span>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block">Job Requirements</label>
              <textarea
                {...register("jobRequirements", {
                  required: "Job requirements are required",
                })}
                className={inputField}
                rows="4"
                placeholder="Job Requirements (Skills, experience, qualifications)"
              />
              {errors.jobRequirements && (
                <span className="text-red-500">
                  {errors.jobRequirements.message}
                </span>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block">Work Schedule</label>
              <input
                {...register("workSchedule")}
                className={inputField}
                placeholder="e.g. Monday-Friday, Weekends, Shifts"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div>
          <h2 className="text-lg font-semibold">Company Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block">Company Name</label>
              <input
                {...register("companyName", {
                  required: "Company name is required",
                })}
                className={inputField}
                placeholder="Company Name"
              />
              {errors.companyName && (
                <span className="text-red-500">
                  {errors.companyName.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Company Website</label>
              <input
                type="url"
                {...register("companyWebsite")}
                className={inputField}
                placeholder="Company Website"
              />
            </div>

            <div>
              <label className="block">Company Description</label>
              <textarea
                {...register("companyDescription")}
                className={inputField}
                rows="3"
                placeholder="Company Overview"
              />
            </div>

            <div>
              <label className="block">Industry</label>
              <select {...register("industry")} className={inputField}>
                <option value="">Select Industry</option>
                <option value="Tech">Tech</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block">Recruiter Name</label>
              <input
                {...register("recruiterName", {
                  required: "Recruiter name is required",
                })}
                className={inputField}
                placeholder="Recruiter Name"
              />
              {errors.recruiterName && (
                <span className="text-red-500">
                  {errors.recruiterName.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Recruiter Email</label>
              <input
                type="email"
                {...register("recruiterEmail", {
                  required: "Recruiter email is required",
                })}
                className={inputField}
                placeholder="Recruiter Email"
              />
              {errors.recruiterEmail && (
                <span className="text-red-500">
                  {errors.recruiterEmail.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Recruiter Phone</label>
              <input
                type="tel"
                {...register("recruiterPhone")}
                className={inputField}
                placeholder="Recruiter Phone Number"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
};

export default UpdateJobs;
