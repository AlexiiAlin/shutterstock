import { Request, Response, NextFunction } from 'express';
import Shutterstock from '../shutterstock';

const getImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = await Shutterstock.getInstance().imagesApi.searchImages(req.query)
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e);
    }
};

const getImagesByIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = {
            'view': "minimal" // String | Amount of detail to render in the response
        };
        const payload = req.query.ids ? (req.query.ids as any).split(',') : [];
        const { data } = await Shutterstock.getInstance().imagesApi.getImageList(payload, queryParams)
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e);
    }
};


const getTracks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = await Shutterstock.getInstance().audioApi.searchTracks(req.query)
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e);
    }
};

const getTracksByIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = {
            'view': "minimal" // String | Amount of detail to render in the response
        };
        const payload = req.query.ids ? (req.query.ids as any).split(',') : [];
        const { data } = await Shutterstock.getInstance().audioApi.getTrackList(payload, queryParams)
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e);
    }
};

const getVideos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = await Shutterstock.getInstance().videosApi.searchVideos(req.query)
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e);
    }
};

const getVideosByIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = {
            'view': "minimal" // String | Amount of detail to render in the response
        };
        const payload = req.query.ids ? (req.query.ids as any).split(',') : [];
        const { data } = await Shutterstock.getInstance().videosApi.getVideoList(payload, queryParams)
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e);
    }
};

export default { getImages, getImagesByIds, getTracks, getTracksByIds, getVideos, getVideosByIds };
