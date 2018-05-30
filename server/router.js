const express = require('express');
const router = express.Router();
const ctrl = require('./controllers/auth');

const pharm = require('./controllers/pharm');
const lab = require('./controllers/lab');
const hospital = require('./controllers/hospital');

router.post('/register',ctrl.register);
router.post('/login',ctrl.login);

router.post('/user',ctrl.insert);
router.put('/user/:id',ctrl.update);
router.delete('/user/:id',ctrl.remove);
router.get('/user/:id',ctrl.get);
router.get('/users',ctrl.auth,ctrl.getAll);
router.get('/users/count',ctrl.count);
router.post('/user/search',ctrl.search);

router.post('/lab',lab.insert);
router.put('/lab/:id',lab.update);
router.delete('/lab/:id',lab.remove);
router.get('/lab/:id',lab.get);
router.get('/labs',lab.getAll);
router.get('/labs/count',lab.count);
router.post('/lab/search',lab.search);

router.post('/hospital',hospital.insert);
router.put('/hospital/:id',hospital.update);
router.delete('/hospital/:id',hospital.remove);
router.get('/hospital/:id',hospital.get);
router.get('/hospital',hospital.getAll);
router.get('/hospital/count',hospital.count);
router.post('/hospital/search',hospital.search);

router.post('/pharm',pharm.insert);
router.put('/pharm/:id',pharm.update);
router.delete('/pharm/:id',pharm.remove);
router.get('/pharm/:id',pharm.get);
router.get('/pharms',pharm.getAll);
router.get('/pharms/count',pharm.count);
router.post('/pharm/search',pharm.search);

module.exports = router ;


