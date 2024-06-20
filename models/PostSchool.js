import mongoose from 'mongoose';

const postSchoolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  prices: {
    class11: { type: Number, required: true },
    class12: { type: Number, required: true }
  },
  description: { type: String, required: true },
  infrastructure: { type: String },
  contact: {
    phone: { type: String, required: true }
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  courses: { type: String },
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

const PostSchool = mongoose.model('PostSchool', postSchoolSchema);

export default PostSchool;
