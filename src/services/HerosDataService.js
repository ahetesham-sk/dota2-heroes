import http from "../http-common";

class HerosDataService {
  getAllHeroes() {
    return http.get("https://api.opendota.com/api/heroStats");
  }
}
export default new HerosDataService();
