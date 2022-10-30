module.exports = {
  eva4Config: {
    token:{
      keycloak_ur: 'keycloak-europe-admin.eva.bot',
      org_name: 'AYTO-MADRID',
      grant_type: 'client_credentials',
      client_id: 'ayto-madrid',
      client_secret: 'BNJeqK5dX2HdkcNFSWIxI0WsQfluWkog'
    },
    conversation:{
      url:{
        instance: 'europe-instance1',
        orgUUID: 'be19031a-8c28-4407-a0b0-a114f03e17b2',
        // DEV TESTbotUUID: '53e10084-49aa-468d-8a46-021b6aef8105' // BOT TEST
        // DEV 
        envUUID: process.env.REACT_APP_ENV_UUID || 'b2e31e56-0425-4692-9db2-5ee671b9ad8a',
        botUUID: process.env.REACT_APP_BOT_UUID || '4a7fe88c-65ae-4a59-9293-2b81edb52afc' 
        // PRE        
        //envUUID: process.env.ENV_UUID || '8c70d0d7-a78d-4b0a-a37f-9575c161da55',
        //botUUID: process.env.BOT_UUID || '0e2a7fdc-6144-4341-ba6b-c3291f29ab62'  

      },
      headers:{
        "Content-Type": 'application/json',
        //DEV
        "API-KEY": process.env.REACT_APP_API_KEY || 'd5e21644-1293-11ed-8973-4201ac1e010a' ,
        //PRE
        //"API-KEY": process.env.API_KEY || '631c8200-43ff-11ed-941a-4201ac1e0114',
        //"CHANNEL": 'WEB', // BOT TEST
        "CHANNEL": 'Webchat',
        "LOCALE": 'es-ES',
        "OS": 'Windows'
      }
    }
  }
}

