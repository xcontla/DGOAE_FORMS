import mongoose from "mongoose";

const allAccessSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  gid: {
    type: String,
    trim: true,
    required: true,
  },
  enable: {
    type: Boolean,
    required: true,
  },
  isEncrypted: {
    type: Boolean,
    trim: true,

  },
  IdRespuesta: {
    type: String,
    required: true,
  },
  IdPregunta: {
    type: String,
    required: true,
  },
});

const AllAccess = mongoose.model("AllAccess", allAccessSchema);
export default AllAccess;
