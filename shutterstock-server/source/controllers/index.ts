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


const getTracks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = await Shutterstock.getInstance().audioApi.searchTracks(req.query)
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

export default { getImages, getTracks, getVideos };
