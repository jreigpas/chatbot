const messages = [
  {
    // single image
    type: "image",
    fromUser: false,
    payload: {
      image:
        "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
    },
  },
  {
    // carousel
    type: "carousel",
    fromUser: false,
    payload: {
      items: [
        {
          type: "card",
          payload: {
            title: "Titulo de la Card",
            image:
              "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
            buttons: [
              {
                title: "Más información",
                value: "Más información",
                action: null,
                type: null,
              },
              {
                title: "Más información",
                value: "Más información",
                action: null,
                type: null,
              },
            ],
          },
        },
        {
          type: "card",
          payload: {
            title: "Titulo de la Card",
            image:
              "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
            buttons: [
              {
                title: "Más información",
                value: "Más información",
                action: null,
                type: null,
              },
            ],
          },
        },
        {
          type: "card",
          payload: {
            title: "Titulo de la Card",
            image:
              "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
            buttons: [
              {
                title: "Más información",
                value: "Más información",
                action: null,
                type: null,
              },
            ],
          },
        },
      ],
    },
  },
  {
    // single card
    type: "card",
    payload: {
      title: "Titulo de la Card",
      image:
        "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
      buttons: [
        {
          title: "Más información",
          value: "Más información",
          action: null,
          type: null,
        },
      ],
    },
  },
  {
    // image carousel
    type: "carousel",
    fromUser: false,
    payload: {
      items: [
        {
          type: "image",
          fromUser: false,
          payload: {
            image:
              "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
          },
        },
        {
          type: "image",
          fromUser: false,
          payload: {
            image:
              "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
          },
        },
        {
          type: "image",
          fromUser: false,
          payload: {
            image:
              "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
          },
        },
        {
          type: "image",
          fromUser: false,
          payload: {
            image:
              "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
          },
        },
      ],
    },
  },
  {
    // mixed carousel
    type: "carousel",
    fromUser: false,
    payload: {
      items: [
        {
          // single card
          type: "card",
          payload: {
            title: "Titulo de la Card",
            image:
              "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
            buttons: [
              {
                title: "Más información",
                value: "Más información",
                action: null,
                type: null,
              },
            ],
          },
        },
        {
          type: "image",
          fromUser: false,
          payload: {
            image:
              "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
          },
        },
        {
          type: "image",
          fromUser: false,
          payload: {
            image:
              "https://sonarplusd.com/system/attached_images/27595/medium/everis-logo-sic-2019.jpg?1556532034",
          },
        },
      ],
    },
  },
];

export default messages;
