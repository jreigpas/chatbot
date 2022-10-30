//import demoInput from "../../demoInput";
//Reducer state messages

//initial value of the state
const initialMessage = {
  messages:[],
  // messages: demoInput,
};

const reducerContainer = (state = initialMessage, action) => {
  switch (action.type) {
    case "MESSAGES_CURRENT":
      return { ...state, messages: action.current };
    default:
      return state;
  }
};
export default reducerContainer;
