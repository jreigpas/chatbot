import { useSelector, useDispatch } from "react-redux";
import WidgetButton from "./components/WidgetButton/WidgetButton";
import WidgetButtonSmall from "./components/WidgetButtonSmall/WidgetButtonSmall";
import ChatContainer from "./components/ChatContainer/ChatContainer";
import { setChatIsOpens } from "../src/store/ChatReducer/actionChat";
import React, { useState } from "react";
import IPDataConnection from "./services/eva/IPDataConnection";
//import TagManager from 'react-gtm-module'
import DirectSocketConnection from "../src/services/eva/DirectSocketConnection";
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM,
  dataLayer: [{
    'Vendor': 'Ayuntamiento de Madrid'
  }]
};

console.log('valor', process.env.REACT_APP_GTM);

TagManager.initialize(tagManagerArgs);

const App = (props) => {
  //dispatch
  const dispacth = useDispatch();
  //chatIsOpen state
  const chatIsOpen = useSelector((state) => state.chatApp.chatIsOpen);
  const [IsBigButtonOpened, setIsBigButtonOpened] = useState(true);
  const ipDAtaConnection = new IPDataConnection();
  const directSocketConnection = new DirectSocketConnection();

  const toggleChatHandler = (option) => {
    if (option === "chat") {
      // check ipddata
      ipDAtaConnection
      .getIpdata()
      .then((response) => {
        console.log('valor de la respuesta', response);
        if (response){
          dispacth(setChatIsOpens(!chatIsOpen));
        }
      })
      .catch((err) => console.log(err));

    } else if (option === "bigButton") {
      setIsBigButtonOpened(true);
    } else {
      setIsBigButtonOpened(false);
    }
  };

  return (
    <div className="App">
      <WidgetButtonSmall
        show={!chatIsOpen && !IsBigButtonOpened}
        click={toggleChatHandler}
      />
      <WidgetButton
        show={!chatIsOpen && IsBigButtonOpened}
        click={toggleChatHandler}
      />
      {chatIsOpen && (
        <ChatContainer
          show={chatIsOpen}
          closeChat={toggleChatHandler}
          connection={props.connection}
          directSocketConnection={directSocketConnection}
        />
      )}
    </div>
  );
};

export default App;
