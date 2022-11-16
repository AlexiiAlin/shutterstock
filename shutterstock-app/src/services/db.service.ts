const imagesKey = 'saved-images';
const tracksKey = 'saved-tracks';
const videosKey = 'saved-videos';

export default class DB {
  private static _instance: DB;

  private constructor() {
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new DB();
    return this._instance;
  }

  public get images() {
    return JSON.parse(localStorage.getItem(imagesKey) ?? '[]');
  }
  public set images(value) {
    localStorage.setItem(imagesKey, JSON.stringify(value));
  }

  public get tracks() {
    return JSON.parse(localStorage.getItem(tracksKey) ?? '[]');
  }
  public set tracks(value) {
    localStorage.setItem(tracksKey, JSON.stringify(value));
  }

  public get videos() {
    return JSON.parse(localStorage.getItem(videosKey) ?? '[]');
  }
  public set videos(value) {
    localStorage.setItem(videosKey, JSON.stringify(value));
  }

  public clearDB() {
    localStorage.setItem(imagesKey, '[]');
    localStorage.setItem(tracksKey, '[]');
    localStorage.setItem(videosKey, '[]');
  }
}
