import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./ChatContainer.module.css";
import { TextMsg } from "../chatElements/chatClasses";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";
import ChatFooter from "./ChatFooter/ChatFooter";
import { setMessages } from "../../store/MessagesReducer/actionContainer";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { getNow, processContext } from "../../helpers/functions"

const ChatContainer = (props) => {
  const { t } = useTranslation("global");
  //dispatch
  const dispacth = useDispatch();
  //messages state
  const message = useSelector((state) => state.messagesContainer.messages);
  const [showSpinner, setShowSpinner] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [inputValueToSend, sendInputValue] = useState("");
  const [isModeAgent, setIsModeAgent] = useState(false);
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  const getGeolocation = () => {
    if(navigator.geolocation)  {
      navigator.geolocation.getCurrentPosition((position) => {
        props.connection.longitud=position.coords.longitude;
        props.connection.latitud=position.coords.latitude;
        props.connection
        .sendMessage('GET_LOCATION')
        .then((response) => {
          const newMsg = new TextMsg({ fromUser: true, text: 'Información enviada' });
          const msgs = [...[newMsg], ...response];
          addMessages(msgs);
        })
        .catch((err) => console.log(err));
      },
      () => {
        console.log('Unable to retrieve your location');
        const newMsg = new TextMsg({ fromUser: false, text: 'Permiso de localización denegado.<br>Por favor, permita el acceso para compartir su ubicación, o escriba su ubicación.' });
        addMessages([newMsg]);
      });
    } else {
        console.log('Geolocation is not supproted by your broswer');
        const newMsg = new TextMsg({ fromUser: false, text: 'La ubicación no está soportada por el explorador.' });
        addMessages([newMsg]);
    }
  };

  const showMessageError = (err) => {
    console.log(err);
    const newMsg = new TextMsg({ fromUser: false, text: t("chatbody.error-msg") });
    addMessages([newMsg]);
  }

  useEffect(() => {
    // If messages array is empty, It sends the initial message to the broker
    if (!message.length) {
      sessionStorage.removeItem('allMsgs');
      setShowSpinner(false);
      props.connection
        .sendInitialMessage()
        .then((response) => addMessages(response))
        .catch((err) => {
          showMessageError();
        }
          );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Añade los mensajes del usuario como parámetro
  const addUserMessage = () => {
    if (inputValue.length <= 0) {
      return;
    }
    console.log('isModeAgent', isModeAgent);
    const value = inputValue;
    const newMsg = new TextMsg({ fromUser: true, text: value, agentChat: isModeAgent, now: getNow() });
    setInputValue("");
    addMessages([newMsg]);
    sendUserMessage(value, [newMsg]);
  };

  const pussButton = (e) => {
    if (e === "GET_LOCATION") {
      getGeolocation();
      return;
    }
    const newMsg = new TextMsg({ fromUser: true, text: e });
    addMessages([newMsg]);
    sendUserMessage(e, [newMsg]);
  };

  const addUserMessageVoice = (msg) => {
    if (msg.length <= 0) {
      return;
    }
    const value = msg;
    const newMsg = new TextMsg({ fromUser: true, text: value });
    addMessages([newMsg]);
    sendUserMessage(value, [newMsg]);
  };

  const sendUserMessage = (text, msg) => {
    // Sending user message to the broker
    setShowSpinner(true);
    console.log("parametro del user" + text);
    if (text ===  t("agent.agentChat")) {
      sessionStorage.setItem('agent',0);
      abrirConexionAgente();
      return;
    }
    else if (text === 'CERRAR' && isModeAgent) {
      setIsModeAgent(false);
      sendAgentMessage(inputValue, 'endOfConversation', false);
      return;
    }

    if (!isModeAgent) {
      props.connection
        .sendMessage(text)
        .then((response) => {
          console.log('datos de la respuesta',response);
          const msgs = [...msg, ...response];
          addMessages(msgs);       
        })
        .catch((err) => {
          showMessageError();
        });
    }
    else {
      console.log('enviar mensaje agente');
      setInputValue("");
      sendAgentMessage(text, 'message',true);
    }
  };

  const cleanAllButtons = (msgs, length) => {
    const nItems = msgs.length;
    console.log('mensajes', msgs);
    sessionStorage.setItem('allMsgs', JSON.stringify(msgs));
    msgs.forEach((item, index) => {
      if ((index < nItems - length) && item.type === 'quick_reply'){
         item.payload.buttons.forEach((element) => {
            element.value = '';
            element.type='disabled';
         });
      }
      if ((index < nItems - length) && item.type === 'CARRUSEL'){
        item.payload.items.forEach((element) => {
           element.buttonList.forEach((button) => {
            button.value='';
            button.type='disabled';
           });

        });
     }
    });
  }

  // Adding new messages to the state
  const addMessages = (newMsgsArray) => {
    console.log('n mensajes', newMsgsArray.length );
    const currentMsgs = [...message, ...newMsgsArray];
    cleanAllButtons(currentMsgs, (newMsgsArray.length - 1));
    dispacth(setMessages(currentMsgs));
    setShowSpinner(false);
  };

  const addSuggestion = (msg) => {
    const newMsg = new TextMsg({ fromUser: true, text: msg });
    setInputValue("");
    addMessages([newMsg]);
    sendUserMessage(msg, [newMsg] );
  }

  const agentTasks = (response) => {

    console.log("response connect", response);
    let client = new W3CWebSocket(
      props.directSocketConnection.urlSocket
    );
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      setIsModeAgent(true);
      sessionStorage.getItem('allMsgs');
      const contextData = processContext(sessionStorage.getItem('allMsgs'));
      sendAgentMessage(contextData,'message', false, true);
    };
    client.onclose = () => {
      console.log('closing connection');
      console.log("Socket hard closed", client.readyState);
    }
    client.onmessage = (messageDirect) => {
      console.log("respuesta del socket", messageDirect);
      const messages = JSON.parse(sessionStorage.getItem('allMsgs'));
      if (messageDirect.data) {
        const dataFromServer = JSON.parse(messageDirect.data);
        console.log("respuesta del socket json", dataFromServer);

        if (dataFromServer.activities[0].text === 'Fin de la conversacion') {
          console.log('mensaje de final de la conversacion');
          setIsModeAgent(false);
          const newMsg = new TextMsg({ fromUser: false, text: '<strong>La conversación con el agente ha finalizado</strong>', agentChat: true, now: getNow() });
          const allMensajes = [...messages,...[newMsg]];
          sessionStorage.setItem('allMsgs', JSON.stringify(allMensajes));
          dispacth(setMessages(allMensajes));
          client.close();
          setIsDisabledInput(true);
        } else if (dataFromServer.activities[0].attachments && dataFromServer.activities[0].from.id !== "user") {
          sessionStorage.setItem('agent', 1);
          const newMsg = new TextMsg({ fromUser: false, text: 'Fichero recibido: [<a href="' + dataFromServer.activities[0].attachments[0].contentUrl +'"target="_blank">' + dataFromServer.activities[0].attachments[0].name + '</a>]', agentChat: true, now: getNow() });
          const allMensajes = [...messages,...[newMsg]];
          sessionStorage.setItem('allMsgs', JSON.stringify(allMensajes));
          dispacth(setMessages(allMensajes));

        } else if (dataFromServer.activities[0].from.id === "user") {
          console.log('es el usuario', dataFromServer.activities[0]);
          if (sessionStorage.getItem('agent') === '0' && (dataFromServer.activities[0].text && dataFromServer.activities[0].text.length < 20)){
            const newMsg = new TextMsg({ fromUser: false, text: 'Seguimos intentando ponerle en contacto con un agente. Por favor, espere en línea.', agentChat: true, now: getNow() });
            const allMensajes = [...messages,...[newMsg]];
            sessionStorage.setItem('allMsgs', JSON.stringify(allMensajes));
            dispacth(setMessages(allMensajes));
          }
        }
        else  {
          //Mensaje del agente
          sessionStorage.setItem('agent', 1);
          const newMsg = new TextMsg({ fromUser: false, text: dataFromServer.activities[0].text, agentChat: true, now: getNow()});
          const allMensajes = [...messages,...[newMsg]];
          sessionStorage.setItem('allMsgs', JSON.stringify(allMensajes));
          dispacth(setMessages(allMensajes));
        }
        setShowSpinner(false);
      }
    };

  }

  const abrirConexionAgente = () => {
    props.directSocketConnection
    .connect()
    .then((response) => {
      agentTasks(response);
    })
    .catch((err) => console.log(err));
  } 

  const sendAgentMessage = (msg, type, isUser, isFirst = false) =>  {
    const dataSend = {
      locale: "es-ES",
      type: type,
      from: {
        id: "user",
      },
      text: msg,
    };
    props.directSocketConnection
      .sendMessageAgent(dataSend)
      .then((response) => {
        console.log("responseSendMessage", response);
        if (!isUser) {
          const messages = JSON.parse(sessionStorage.getItem('allMsgs'));
          const msgToAdd = isFirst ? 'Le doy la bienvenida al <strong>Chat Online de Línea Madrid</strong>. Estamos buscando a la persona más apropiada para que le asista 🙂.<br><br>En cuanto haya un agente disponible, se le notificará por esta vía': msg;
          const newMsg = new TextMsg({ fromUser: isUser, text: msgToAdd, agentChat: true, now: getNow() });
          const newMessages = [...messages,...[newMsg]];
          sessionStorage.setItem('allMsgs', JSON.stringify(newMessages));
          dispacth(setMessages(newMessages));
          setShowSpinner(false);
        }
      })
      .catch((err) => console.log(err));
  }

  //Se crea una constante con toda la composicion de los componentes del chat
  const chatContainer = (
    <div
      className={classes.ChatContainer}
      role="region"
      aria-label={t("chatcontainer.title")}
    >
      {/*hereda los props de app.js, abre el chat si no está abierto
          viene del método de app.js toggleChatHandler */}

      <ChatHeader close={props.closeChat} />
      <ChatBody
        messages={message}
        showSpinner={showSpinner}
        setIsAgent={isModeAgent}
        sendMsg={addUserMessage}
        pushButton={pussButton}
      />
      <ChatFooter
        send={addUserMessage}
        sendVoice={addUserMessageVoice}
        setInputValue={setInputValue}
        sendInputValue={sendInputValue}
        sendSuggestion={addSuggestion}
        setIsAgent={isModeAgent}
        setDisabled={isDisabledInput}
        directSocketConnection={props.directSocketConnection}
      />
    </div>
  );

  return (
    //react.fragment se usa para coger múliples nodos, en este caso coge chatContainer
    <React.Fragment>
      {/*props.show es un prop procedente del state de this.state.chatIsOpen en App.js 
        que indica si el chat está abierto o no*/}
      {props.show ? chatContainer : ""}
    </React.Fragment>
  );
};

export default withTranslation("global")(ChatContainer);
