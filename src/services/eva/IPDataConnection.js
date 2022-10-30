import axios from "axios";

class IPDataConnection {

  constructor() {
    this.ipDataToken = process.env.REACT_APP_IPDATA_TOKEN;
  }

  getIpdata = async () => {

    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.ipdata.co?api-key=${this.ipDataToken}`
        )
        .then(async (response) => {
          console.log('valores de ipData',response.data.threat);
          const thread = response.data.threat;
          let isSecure = true;
           if (thread.is_tor ||
            thread.is_anonymous ||
            thread.is_known_attacker ||
            thread.is_known_abuser ||
            thread.is_threat ||
            thread.is_bogon) {
                isSecure = false;
            }
            else if (thread.scores && (thread.scores.threat_score>80 || 
                                  thread.scores.trust_score<40) ){
               isSecure = false;
            }
            const responseUpdate = await this.addInfoIPData(response.data);
            console.log(responseUpdate);
          resolve(isSecure);
        })
        .catch((err) => {          
          console.log('err',err);
          reject();
        });
    });
  };

  addInfoIPData = async (data) => {
    return new Promise((resolve, reject) => {
      let headers = [];
      headers["Authorization"] = "Bearer " + this.evaToken;

      data = JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      })

      axios
        .post(
          `https://jsonplaceholder.typicode.com/posts`,
          data,
          { headers: headers }
        )
        .then((response) => {
          console.log('response update', response);
          resolve(response);
        })
        .catch((err) => {          
            console.log('err',err);
            return resolve(true);
            //reject();
        });
    });
  };


}

export default IPDataConnection;
