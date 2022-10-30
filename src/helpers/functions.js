export const getNow = () => {

  let d = new Date();
  let now = d.toLocaleString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return now;
};

export const processContext = (msg) => {
  const data = JSON.parse(msg);
  let textContext='';
  data.forEach((item) => {
    if (item.type==='text'){
      textContext = textContext + '<br>' + (item.fromUser ? 'Ciudadano:':'Ayuntamiento (bot):') + item.payload.text;
    }
  })
  return textContext;
}
