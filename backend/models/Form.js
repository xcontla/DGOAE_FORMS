import mongoose from "mongoose";

const formSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    IdPregunta: {
      type: String,
      trim: true,
      required: true,
    },

    document_name: {
      type: String,
      trim: true,
      // required: true,
    },
    document_description: {
      type: String,
      trim: true,
      // required: true,
    },
    questions: {
      type: Array,
      trim: true,
      required: true,
    },
    isEncrypted: {
      type: Boolean,
      trim: true,

    },
    fechaEntrega: {
      type: Date,
      required: true,
      default: Date.now(),
    },

 
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);
export default Form;
