//Reducer state chatIsOpen

//initial value of the state
const initialMessageChat = {
  chatIsOpen: false,
};

const reducerChat = (state = initialMessageChat, action) => {
  switch (action.type) {
    case "CHAT_ISOPEN":
      return { ...state, chatIsOpen: action.chat };
    default:
      return state;
  }
};
export default reducerChat;
