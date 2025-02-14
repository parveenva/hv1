const jobData = [
    { title: "Chef", location: "Noida", description: "Experienced chef needed for a fine-dining restaurant." },
    { title: "Waiter", location: "Delhi", description: "Friendly and energetic waiter required." },
    { title: "Restaurant Manager", location: "Gurgaon", description: "Seeking an experienced manager for a busy restaurant." },
  ];
  
  const JobPostings = () => {
    return (
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-[#582c4f] mb-4">Latest Job Openings</h2>
        {jobData.map((job, index) => (
          <div key={index} className="mb-4 border-b pb-3">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.location}</p>
            <p className="text-sm">{job.description}</p>
            <button className="mt-2 bg-[#582c4f] text-white py-1 px-4 rounded">Apply Now</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default JobPostings;
  