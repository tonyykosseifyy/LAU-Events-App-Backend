const db = require("../models");
const { refreshToken: RefreshToken } = db;
const defaultCruds = require('./defaultCruds.js')


exports.getAll = defaultCruds.getAll(RefreshToken);

