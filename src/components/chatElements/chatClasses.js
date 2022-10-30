class Msg {
  constructor(type, fromUser, payload) {
    this.type = type;
    this.fromUser = fromUser || false;
    this.payload = payload;
  }
}

export class TextMsg extends Msg {
  constructor({ fromUser, text, agentChat, now}) {
    super();
    this.type = "text";
    this.fromUser = fromUser;
    this.payload = {
      text: text,
    };
    this.agentChat = agentChat;
    this.now = now;
  }
}

export class Button {
  constructor({ title, value, action, type }) {
    this.title = title;
    this.value = value;
    this.action = action;
    this.type = type;
  }
}

export class QuickReply extends Msg {
  constructor({ buttons, downloads, position }) {
    super();
    this.position = position;
    this.type = "quick_reply";
    this.payload = {
      buttons: buttons,
      downloads: downloads,
    };
  }
}

export class Carousel extends Msg {
  constructor({ items }) {
    super();
    this.type = "CARRUSEL";
    this.payload = {
      items: items,
    };
  }
}

export class Card extends Msg {
  constructor({ title, image, buttons }) {
    super();
    this.type = "card";
    this.payload = {
      title: title,
      image: image,
      buttons: buttons,
    };
  }
}

export class Image extends Msg {
  constructor({ image, position }) {
    super();
    this.position = position;
    this.type = "card";
    this.payload = {
      image: image,
    };
  }
}
export class Download {
  constructor({ title, url, file, downloadOk, downloadKo, type }) {
    this.title = title;
    this.url = url;
    this.file = file;
    this.downloadOk = downloadOk;
    this.downloadKo = downloadKo;
    this.type = type;
  }
}
export class Form extends Msg {
  constructor({ id, inputs, buttons, position }) {
    super();
    this.position = position;
    this.type = "form";
    this.payload = {
      id: id,
      inputs: inputs,
      buttons: buttons,
    };
  }
}
