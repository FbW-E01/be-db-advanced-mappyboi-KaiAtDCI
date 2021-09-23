import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  submitDate: { type: Date, default: Date.now },
  firstName: { type: String, },
  lastName: { type: String },
  description: { type: String },
  position: { type: Object },
});

ReportSchema.statics.createReport = async function(firstName, lastName, position, description) {
  console.log(position);
  return await this.create({
    firstName: firstName,
    lastName: lastName,
    position: position,
    description: description,
  });
};

const Report = mongoose.model('reports', ReportSchema);
export default Report;