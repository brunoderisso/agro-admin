import axios from "axios";
import { EventEmitter } from "events";

import { LocalConfig } from "../LocalConfig"
import SessionStore from '../stores/SessionStore';
import errorHandlerWithCallback from "../helpers/errorHandler";


class GeoStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.props = props
  }

  getGeoStates(cancelToken, iso2, callbackFunc) {
    const token = SessionStore.getToken();

    if (!token) {
      return;
    }

    this.axios = axios.get(LocalConfig.apiURL + "/api/geo/country/" + iso2 + "/state/", {
      cancelToken: cancelToken.token.token.token,
      headers: {
        "Content-Type": "text/plain",
        "Authorization": "Bearer " + token,
      }
    })
      .then((responseData) => {
        if (!responseData) {
          callbackFunc(null);
        } else {
          if (responseData.data) {
            callbackFunc({ id: cancelToken.id, data: responseData.data });
          } else {
            callbackFunc(null);
          }
        }
      })
      .catch(errorHandlerWithCallback(callbackFunc));
  }

  getGeoCities(cancelToken, countryIso2, stateIso2, callbackFunc) {
    const token = SessionStore.getToken();

    if (!token) {
      return;
    }

    this.axios = axios.get(LocalConfig.apiURL + "/api/geo/country/" + countryIso2 + "/state/" + stateIso2 + "/city/", {
      cancelToken: cancelToken.token.token.token,
      headers: {
        "Content-Type": "text/plain",
        "Authorization": "Bearer " + token,
      }
    })
      .then((responseData) => {
        if (!responseData) {
          callbackFunc(null);
        } else {
          if (responseData.data) {
            callbackFunc({ id: cancelToken.id, data: responseData.data });
          } else {
            callbackFunc(null);
          }
        }
      })
      .catch(errorHandlerWithCallback(callbackFunc));
  }
}

const geoStore = new GeoStore();

export default geoStore;
