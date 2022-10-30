import axios from "axios";

import processResponse from "./processResponse";
import config from "../../config";
export class EvaMsg {
  constructor({ text, code, context }) {
    this.text = text;
    this.code = code;
    this.context = context;
  }
}
class Eva4Connection {

  constructor() {
    this.sessionCode = "";

    this.eva4Config = config.eva4Config;
    this.userRef = Math.floor(Math.random() * 1000000000000000000 + 1);
    this.evaToken = "";
    this.longitud = "";
    this.latitud = "";
  }

  sendInitialMessage = () => {
    
    return new Promise((resolve, reject) => {     
      this.sendMessage("33wWrVrVwWRWVrvAw", null, {
         lang: "es",
         session: "",
      })
        .then((messages, session) => resolve(messages, session))
        .catch((err) => reject(err));
    });    
  };

  getEvaToken = () => {
    return new Promise((resolve, reject) => {
      const msg = {
        grant_type: this.eva4Config.token.grant_type,
        client_id: this.eva4Config.token.client_id,
        client_secret: this.eva4Config.token.client_secret,
      };
      const msgEnconded = new URLSearchParams(msg).toString();
      axios
        .post(
          `https://${this.eva4Config.token.keycloak_ur}/auth/realms/${this.eva4Config.token.org_name}/protocol/openid-connect/token`,
          msgEnconded
        )
        .then((response) => {
          const token = response.data.access_token;
          return resolve(token);
        })
        .catch((err) => reject(err));
    });
  };

  sendMessage = async (text, code, options) => {

    if (!this.evaToken) {
      this.evaToken = await this.getEvaToken();
    }

    return new Promise((resolve, reject) => {
      const context = {
        // getting some context data from cookies
        lng: "es",
        latitud: this.latitud,
        longitud: this.longitud,
        // form: options.form,
        // user_data: {token: token}
      };
      const msg = new EvaMsg({
        text: text || "",
        code: code || "",
        context: context,
      });
      const sessionCode = options ? options.session : this.sessionCode;
      const headers = this.eva4Config.conversation.headers;
      headers["USER-REF"] = this.userRef;
      headers["Authorization"] = "Bearer " + this.evaToken;

      const bot = this.eva4Config.conversation.url.botUUID;

      axios
        .post(
          `https://api-${this.eva4Config.conversation.url.instance}.eva.bot/eva-broker/org/${this.eva4Config.conversation.url.orgUUID}/env/${this.eva4Config.conversation.url.envUUID}/bot/${bot}/conversations/${sessionCode}`,
          msg,
          { headers: headers }
        )
        .then((response) => {
          const { messages, context, sessionCode } = processResponse(response);
          this.context = context;
          this.sessionCode = sessionCode;
          return resolve(messages, sessionCode);
        })
        .catch((err) => {          
          if (err.response && err.response.status === 401) {
            this.evaToken = "";
            return resolve(this.sendMessage(text, code, options));
          }
          return resolve();
        });
    });
  };
}

export default Eva4Connection;
