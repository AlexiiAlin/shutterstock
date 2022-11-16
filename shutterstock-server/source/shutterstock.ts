const sstk = require('shutterstock-api');
const dotenv = require('dotenv');
dotenv.config();

class Shutterstock {
    private static _instance: Shutterstock;
    private readonly _imagesApi: any;
    private readonly _audioApi: any;
    private readonly _videosApi: any;

    private constructor() {
        sstk.setBasicAuth(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
        // sstk.setAccessToken(process.env.OAUTH_TOKEN);
        this._imagesApi = new sstk.ImagesApi();
        this._audioApi = new sstk.AudioApi();
        this._videosApi = new sstk.VideosApi();
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Shutterstock();
        return this._instance;
    }

    public get imagesApi() {
        return this._imagesApi;
    }
    public get audioApi() {
        return this._audioApi;
    }
    public get videosApi() {
        return this._videosApi;
    }
}

export default Shutterstock;
