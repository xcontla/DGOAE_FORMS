import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    questionType:{
      type: String,
      required: false,
    },
    questionText:{
      type: String,
      required: false,
},
    options:{
      type: Array,
      required: false,
    },
    
    open:{
      type: Boolean,
      required: false,
    },
    required:{
      type: Boolean,
      required: false,
    }
    ,
    isEncrypt:{
      type: Boolean,
      required: false,
    }
  },
);



const Question = mongoose.model("Question", questionSchema);
export default Question;
