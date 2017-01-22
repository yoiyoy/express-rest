import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from "mongoose";
import app from '../src/app';

const should = chai.should();
const handleErr = (err, done, cb) => {
  if(!err && cb) cb();
  done(err);
};
const Bear = mongoose.model('Bear');

chai.use(chaiHttp);
describe('API BEAR', () => {

  beforeEach((done) => {
    Bear.remove({})
      .then(done())
      .catch(err => handleErr(err, done));
  });

  describe('/api/bears - GET', () => {
    it('should get all the bears', (done) => {
      chai.request(app)
        .get('/api/bears')
        .end((err, res) => handleErr(err, done, () => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.equal(0);
        }));
    });
  });

  describe('/api/bears - POST', () => {
    let bear = { name: 'pooh' };

    it('should post a bear', (done) => {
      chai.request(app)
        .post('/api/bears')
        .send(bear)
        .end((err, res) => handleErr(err, done, () => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('name').equal(bear.name);
        }));
    });
  });

  describe('/api/bears/:id - GET', () => {
    it('should get a bears', (done) => {
      let bear = new Bear({ name: 'teddy' });
      bear.save()
        .then(bear => {
          chai.request(app)
            .get('/api/bears/' + bear.id)
            .end((err, res) => handleErr(err, done, () => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              res.body.should.have.property('name').equal(bear.name);
            }));
        })
        .catch(err => handleErr(err, done))
    });
  });

  describe('/api/bears/:id - PUT', () => {
    it('should update a bear', (done) => {
      let bear = new Bear({ name: 'teddy' });
      let updatingBear = { name: 'ted' };

      bear.save()
        .then(bear => {
          chai.request(app)
            .put('/api/bears/' + bear.id)
            .send(updatingBear)
            .end((err, res) => handleErr(err, done, () => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              res.body.should.have.property('name').equal(updatingBear.name);
            }));
        })
        .catch(err => handleErr(err, done));
    });
  });

  describe('/api/bears/:id - DELETE', () => {
    it('should delete a bear', (done) => {
      let bear = new Bear({ name: 'teddy' });

      bear.save()
        .then(bear => {
          chai.request(app)
            .delete('/api/bears/' + bear.id)
            .end((err, res) => handleErr(err, done, () => {
              res.should.have.status(200);
              res.body.should.be.a('object');
            }));
        })
        .catch(err => handleErr(err, done));
    });
  });

});
