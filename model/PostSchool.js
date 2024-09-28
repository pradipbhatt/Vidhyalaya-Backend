import mongoose from 'mongoose';

const PostSchoolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  prices: {
    class11: { type: String, required: true },
    class12: { type: String, required: true }
  },
  description: { type: String },
  infrastructure: { type: String },
  contact: {
    phone: { type: String, required: true }
  },
  location: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  courses: { type: [String] }, // Change from string to array of strings
  rank: { type: Number },
  alumniTotal: { type: Number },
  alumniEngineers: { type: Number },
  alumniDoctors: { type: Number },
  teachers: { type: Number },
  teacherQualifications: { type: String },
  passoutRate: { type: String },
  image: { type: String },
  showMoreUrl: { type: String }
});

const PostSchool = mongoose.model('PostSchool', PostSchoolSchema);

export default PostSchool;