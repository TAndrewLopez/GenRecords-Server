const conn = require("./conn");

const { Artist, LineItem, Order, Track, User, Vinyl } = require("./models");

//ASSOCIATIONS
User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(LineItem);
LineItem.belongsTo(Order);

Vinyl.hasMany(LineItem);
LineItem.belongsTo(Vinyl);

Vinyl.hasMany(Track);
Track.belongsTo(Vinyl);

Artist.hasMany(Vinyl);
Vinyl.belongsTo(Artist);

module.exports = { conn, Artist, LineItem, Order, Track, User, Vinyl };
