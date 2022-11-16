import express from 'express';
import controller from '../controllers';
const router = express.Router();

router.get('/images', controller.getImages);
router.get('/tracks', controller.getTracks);
router.get('/videos', controller.getVideos);

export = router;
