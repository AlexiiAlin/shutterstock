import express from 'express';
import controller from '../controllers';
const router = express.Router();

router.get('/images', controller.getImages);
router.get('/images-by-ids', controller.getImagesByIds);
router.get('/tracks', controller.getTracks);
router.get('/tracks-by-ids', controller.getTracksByIds);
router.get('/videos', controller.getVideos);

export = router;
