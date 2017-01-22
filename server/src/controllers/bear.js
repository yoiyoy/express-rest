import mongoose from 'mongoose';
import express from 'express';
import httperrors from 'httperrors';
import hideProps from '../util/hideProps';

const router = express.Router();
const Bear = mongoose.model('Bear');

// routes
router.get('/bears', find);
router.post('/bears', create);
router.get('/bears/:id', findById);
router.put('/bears/:id', update);
router.delete('/bears/:id', remove);

// handlers below..
function find(req, res, next) {
  Bear.find()
    .then(bears => res.json(bears))
    .catch((err) => next(err));
}

function create(req, res, next) {
  let bear = new Bear({ name : req.body.name });

  bear.save()
    .then(bear => res.json(bear))
    .catch((err) => next(err));
}

function findById(req, res, next) {
  Bear.findById(req.params.id)
    .then(bear => {
      if (bear === null) {
        throw new httperrors.NotFound(
          `[id: ${req.params.id}] Bear를 찾을 수 없습니다.`);
      }
      return res.json(bear);
    })
    .catch((err) => next(err));
}

function update(req, res, next) {
  Bear.findById(req.params.id)
    .then(bear => {
      if (bear === null) {
        throw new httperrors.NotFound(
          `[id: ${req.params.id}] Bear를 찾을 수 없습니다.`);
      }
      bear.name = req.body.name;
      return bear.save();
    })
    .then(bear => res.json(bear))
    .catch((err) => next(err));
}

function remove(req, res) {
  Bear.findByIdAndRemove(req.params.id)
  .then(bear => res.json(bear))
  .catch((err) => next(err));
}

export default router;
