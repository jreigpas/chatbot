//import Carousel from "../../components/chatElements/Carousel/Carousel";
import {
  TextMsg,
  QuickReply,
  Button,
  Carousel
} from "../../components/chatElements/chatClasses";
//import data from "../../mocks/data.json";

const processResponse = (rowData) => {
  console.log('data', rowData);
  const context = rowData.data.context;
  const sessionCode = rowData.data.sessionCode;
  let dataAnswers = rowData.data.answers;

  const messages = [];

  //const dataAnswers = data;
  //console.log('dataAnswer', dataAnswers);

  dataAnswers.forEach((answer) => {

    if (answer.content.type !== 'CARRUSEL'  && answer.content.type !== 'IGNORE_ANSWER') {
      const text = answer.content;
      const newMsg = new TextMsg({ fromUser: false, text: text, agentChat: false, now: ''});
      messages.push(newMsg);
    }

    console.log("answers", answer)

    if (answer.buttons && answer.buttons.length) {
      console.log("buttons true")
      const buttonsArray = [];
      answer.buttons.forEach((option) => {
        const newBtn = new Button({
          title: option.name,
          value: option.value,
          action: option.action,
          type: option.type,
        });
        buttonsArray.push(newBtn);        
      });
      const newButtonsReply = new QuickReply({ buttons: buttonsArray });
      messages.push(newButtonsReply);  
    }
    if (answer.quickReply && answer.quickReply.length) {
      const buttonsArray = [];
      answer.quickReply.forEach((option) => {
        const newBtn = new Button({
          title: option.name,
          value: option.value,
          action: option.action,
          type: "quick_reply",
        });
        buttonsArray.push(newBtn);
      });
      const newQuickReply = new QuickReply({ buttons: buttonsArray });
      messages.push(newQuickReply);
    } 
    if (answer.content.type === 'CARRUSEL') {

      const items = [];
      answer.content.content.forEach((item) => {
        items.push(item);
        //console.log('item:',item);
      });

      const carrusel = new Carousel({
        items
      })
      messages.push(carrusel);
    }  
  });
  return { messages, context, sessionCode };
};

export default processResponse;
