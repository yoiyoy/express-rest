import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

const should = chai.should();
const handleErr = (err, done, cb) => {
  if(!err && cb) cb();
  done(err);
};

describe('TEST', () => {

  describe('/PING - GET', () => {
    it('should reponse with "pong"', (done) => {
      chai.request(app)
      .get('/ping')
      .end((err, res) => handleErr(err, done, () => {
        res.should.have.status(200);
        res.body.should.be.a('string');
        res.body.should.be.equal('pong');
      }));
    });

  })

});
