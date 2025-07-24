use job_portal;

// Insert Jobs 
db.jobs.insertMany([
  { job_id: 1, job_title: "Backend Developer", company: "InnovaTech", location: "Bangalore", salary: 1200000, job_type: "remote", posted_on: new Date("2025-07-01") },
  { job_id: 2, job_title: "Data Analyst", company: "DataSpark", location: "Hyderabad", salary: 900000, job_type: "hybrid", posted_on: new Date("2025-06-28") },
  { job_id: 3, job_title: "Frontend Developer", company: "InnovaTech", location: "Chennai", salary: 800000, job_type: "on-site", posted_on: new Date("2025-07-10") },
  { job_id: 4, job_title: "DevOps Engineer", company: "CloudShift", location: "Pune", salary: 1300000, job_type: "remote", posted_on: new Date("2025-07-12") },
  { job_id: 5, job_title: "ML Engineer", company: "InnovaTech", location: "Remote", salary: 1400000, job_type: "remote", posted_on: new Date("2025-07-15") }
]);

// Insert Applicants 
db.applicants.insertMany([
  { applicant_id: 101, name: "Aditi Sharma", skills: ["Python", "SQL", "MongoDB"], experience: 2, city: "Hyderabad", applied_on: new Date("2025-07-16") },
  { applicant_id: 102, name: "Rahul Mehta", skills: ["Java", "React"], experience: 3, city: "Bangalore", applied_on: new Date("2025-07-18") },
  { applicant_id: 103, name: "Sneha Iyer", skills: ["Python", "MongoDB"], experience: 1, city: "Chennai", applied_on: new Date("2025-07-18") },
  { applicant_id: 104, name: "Vikram Singh", skills: ["AWS", "Docker", "Kubernetes"], experience: 4, city: "Pune", applied_on: new Date("2025-07-19") },
  { applicant_id: 105, name: "Meera Nair", skills: ["Python", "PowerBI"], experience: 2, city: "Hyderabad", applied_on: new Date("2025-07-19") }
]);

// Insert Applications 
db.applications.insertMany([
  { application_id: 1001, applicant_id: 101, job_id: 1, application_status: "interview scheduled", interview_scheduled: true, feedback: "Positive" },
  { application_id: 1002, applicant_id: 101, job_id: 4, application_status: "submitted", interview_scheduled: false, feedback: "" },
  { application_id: 1003, applicant_id: 103, job_id: 5, application_status: "interview scheduled", interview_scheduled: true, feedback: "Pending" },
  { application_id: 1004, applicant_id: 104, job_id: 4, application_status: "submitted", interview_scheduled: false, feedback: "" },
  { application_id: 1005, applicant_id: 105, job_id: 2, application_status: "submitted", interview_scheduled: false, feedback: "" }
]);

//1
db.jobs.find({ job_type: "remote", salary: { $gt: 1000000 } });

//2
db.applicants.find({ skills: "MongoDB" });

//3 
db.jobs.countDocuments({ posted_on: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } });

//4 
db.applications.find({ application_status: "interview scheduled" });

//5 
db.jobs.aggregate([
  { $group: { _id: "$company", job_count: { $sum: 1 } } },
  { $match: { job_count: { $gt: 2 } } }
]);

//6 
db.applications.aggregate([
  {
    $lookup: {
      from: "jobs",
      localField: "job_id",
      foreignField: "job_id",
      as: "job_info"
    }
  },
  { $unwind: "$job_info" },
  {
    $lookup: {
      from: "applicants",
      localField: "applicant_id",
      foreignField: "applicant_id",
      as: "applicant_info"
    }
  },
  { $unwind: "$applicant_info" },
  {
    $project: {
      _id: 0,
      job_title: "$job_info.job_title",
      applicant_name: "$applicant_info.name"
    }
  }
]);

//7 
db.applications.aggregate([
  {
    $group: {
      _id: "$job_id",
      application_count: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "jobs",
      localField: "_id",
      foreignField: "job_id",
      as: "job_info"
    }
  },
  { $unwind: "$job_info" },
  {
    $project: {
      _id: 0,
      job_title: "$job_info.job_title",
      application_count: 1
    }
  }
]);

//8 
db.applications.aggregate([
  {
    $group: {
      _id: "$applicant_id",
      applications_count: { $sum: 1 }
    }
  },
  { $match: { applications_count: { $gt: 1 } } },
  {
    $lookup: {
      from: "applicants",
      localField: "_id",
      foreignField: "applicant_id",
      as: "applicant_info"
    }
  },
  { $unwind: "$applicant_info" },
  {
    $project: {
      _id: 0,
      applicant_name: "$applicant_info.name",
      applications_count: 1
    }
  }
]);

//9 
db.applicants.aggregate([
  {
    $group: {
      _id: "$city",
      applicant_count: { $sum: 1 }
    }
  },
  { $sort: { applicant_count: -1 } },
  { $limit: 3 }
]);

//10 
db.jobs.aggregate([
  {
    $group: {
      _id: "$job_type",
      avg_salary: { $avg: "$salary" }
    }
  }
]);

//11
db.applications.updateOne(
  { application_status: "submitted" },
  { $set: { application_status: "offer made" } }
);

//12 
db.jobs.deleteOne({
  job_id: {
    $nin: db.applications.distinct("job_id")
  }
});

//13 
db.applications.updateMany({}, { $set: { shortlisted: false } });

//14
db.applicants.updateMany(
  { city: "Hyderabad" },
  { $inc: { experience: 1 } }
);

//15 
db.applicants.deleteMany({
  applicant_id: {
    $nin: db.applications.distinct("applicant_id")
  }
});
