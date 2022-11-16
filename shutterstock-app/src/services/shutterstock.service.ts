import http from "./http-common";

class ShutterstockService {
  getImages(params) {
    const queryParams = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const url = queryParams ? `/images?${queryParams}` : '/images';
    return http.get<[]>(url);
  }
  getTracks(params) {
    const queryParams = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const url = queryParams ? `/tracks?${queryParams}` : '/tracks';
    return http.get<[]>(url);
  }
  getVideos(params) {
    const queryParams = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const url = queryParams ? `/videos?${queryParams}` : '/videos';
    return http.get<[]>(url);
  }
}

export default new ShutterstockService();
