const express = require('express');
const router = express.Router();
const candidateRoutes = require('./candidateRoutes');
const partyRoutes = require('./partyRoutes');

router.use(candidateRoutes);
router.use(partyRoutes);

module.exports = router;