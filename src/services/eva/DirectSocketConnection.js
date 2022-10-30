import axios from "axios";

class DirectSocketConnection {
  constructor() {
    this.conversationId = "";
    this.urlSocket = "";
    this.token = process.env.REACT_APP_AGENT_TOKEN
  }

  sendInitialMessage = () => {
    return new Promise((resolve, reject) => {
      this.connect()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  };

  connect = async () => {
    return new Promise((resolve, reject) => {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };

      const bodyParameters = {
        key: "value",
      };

      axios
        .post(
          `https://directline.botframework.com/v3/directline/conversations`,
          bodyParameters,
          config
        )
        .then((response) => {
          console.log("respuesta de la llamada a conexión", response);
          this.urlSocket = response.data.streamUrl;
          this.conversationId = response.data.conversationId;
          return resolve();
        })
        .catch((err) => {
          console.log("error:", err);
          return resolve();
        });
    });
  };

  sendMessageAgent = async (msg) => {
    return new Promise((resolve, reject) => {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };

      axios
        .post(
          `https://directline.botframework.com/v3/directline/conversations/${this.conversationId}/activities`,
          msg,
          config
        )
        .then((response) => {
          console.log("respuesta send messsage", response);
          return resolve(this.response);
        })
        .catch((err) => {
          console.log("error:", err);
          return resolve();
        });
    });
  };

  sendAttachment = async (msg) => {
    return new Promise((resolve, reject) => {
      const config = {
        headers: { Authorization: `Bearer ${this.token}`,
                   'Content-Type': 'application/pdf',
                   'Content-Disposition':'name="prueba"; filename="prueba.pdf"' },
      };

      axios
        .post(
          `https://directline.botframework.com/v3/directline/conversations/${this.conversationId}/upload?userId=user`,
          msg,
          config
        )
        .then((response) => {
          console.log("respuesta send messsage", response);
          return resolve(this.response);
        })
        .catch((err) => {
          console.log("error:", err);
          return resolve();
        });
    });
  };

}

export default DirectSocketConnection;
