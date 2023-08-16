export const initialState = {
  questions: [
    {
      questionText: "Pregunta 1",
      questionType: "radio",
      options: [{ optionText: "Opcion 1" }],
      open: true,
      required: false,
      isEncrypt: false,
    },
  ],
  questionType: "radio",
  document_name: "Untitled Form",
  document_description: "add the description",
  isEncrypted: false,
};

export const actionTypes = {
  SET_QUESTIONS: "SET_QUESTIONS",
  CHANGE_TYPE: "CHAGE_TYPE",
  SET_DOC_NAME: "SET_DOC_NAME",
  SET_DOC_DESC: "SET_DOC_DESC",
  SET_DOC_ENCRYPT: "SET_DOC_ENCRYPT",
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    case actionTypes.CHANGE_TYPE:
      return {
        ...state,
        questions: action.questionType,
      };
    case actionTypes.SET_DOC_NAME:
      return {
        ...state,
        questions: action.document_name,
      };
    case actionTypes.SET_DOC_DESC:
      return {
        ...state,
        questions: action.document_description,
      };

    case actionTypes.SET_DOC_ENCRYPT:
      return {
        ...state,
        isEncrypted: action.isEncrypted,
      }
    
    default:
      return state;
  }
};

export default Reducer;
