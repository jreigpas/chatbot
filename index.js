const express = require("express");/*
const helmet = require("helmet");
const permissionsPolicy = require("permissions-policy");*/

const app = express();

const PORT = process.env.PORT || 3000;

const allowOrigin =
  process.env.ALLOW_ORIGIN || "https://test-carpetaciudadana.redsara.es";//TODO: añadir web de cliente

/*
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "default-src": ["*", "data:"],
    },
  })
);

app.use(
  permissionsPolicy({
    features: {
      fullscreen: ["self"], // fullscreen=()
      camera: [],
      microphone: [],
      geolocation: [],
      payment: [],
      usb: [],
    },
  })
);
*/

app.use((req, res, next) => {
  //res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Origin", "*");//TODO: poner solo para permitir el origen de cliente
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

app.use("/", express.static(__dirname + "/build/"));

app.listen(PORT, () => {
  console.log(`Server starterd at port ${PORT}`);
});

module.exports = {
  app,
};
