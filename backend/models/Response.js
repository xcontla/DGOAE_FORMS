import mongoose from "mongoose";

const responseSchema = mongoose.Schema({
  gid: {
    type: String,
    required: true,
  },
  doc_name: {
    type: String,
    required: true,
  },
  IdRespuesta: {
    type: String,
    trim: true,
  },
  responses: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  fechaEntrega: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  
});

const Response = mongoose.model("Response", responseSchema);
export default Response;


/*import mongoose from "mongoose";

const responseSchema = mongoose.Schema({
 {
    doc_name: {
    type: String,
    required: true,
  },
  IdRespuesta: {
    type: String,
    trim: true,
  },
  responses: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  fechaEntrega: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  
});

const Response = mongoose.model("Response", responseSchema);
export default Response;
*/
