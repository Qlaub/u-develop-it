const express = require('express');
const router = express.Router();
const candidateRoutes = require('./candidateRoutes');
const partyRoutes = require('./partyRoutes');
const voterRoutes = require('./voterRoutes');

router.use(candidateRoutes);
router.use(partyRoutes);
router.use(voterRoutes);

module.exports = router;