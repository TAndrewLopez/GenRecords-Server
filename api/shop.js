const router = require("express").Router();
const { Artist, LineItem, Order, Track, Vinyl } = require("../db");
const { requireToken } = require("./middleware");

//SHOP ROUTES
router.get("/", async (req, res, next) => {
  try {
    const vinyls = await Vinyl.findAll({
      include: Artist,
    });
    vinyls.sort((a, b) => a.id - b.id);
    return res.json({ vinyls });
  } catch (error) {
    next(error);
  }
});

router.get("/:vinylId", async (req, res, next) => {
  try {
    const vinyl = await Vinyl.findByPk(req.params.vinylId, {
      include: [Artist, Track],
    });

    res.json({ vinyl });
  } catch (error) {
    next(error);
  }
});

// CART PATHS
// router.put("/cart", requireToken, async (req, res, next) => {
//   try {
//     await Order.update(
//       { complete: true },
//       {
//         where: {
//           complete: false,
//           userId: req.user.id,
//         },
//       }
//     );
//     await Order.create({ userId: req.user.id });
//     res.json({ message: "success" });
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/cart/qty", requireToken, async (req, res, next) => {
  try {
    const lineItem = await LineItem.findByPk(req.body.id);
    await lineItem.update({ qty: req.body.qty });

    const updatedItem = await LineItem.findByPk(req.body.id, {
      attributes: ["id", "qty"],
      include: {
        model: Vinyl,
        attributes: ["id", "name", "stock", "price", "img"],
        include: {
          model: Artist,
          attributes: ["id", "name"],
        },
      },
    });
    res.json({ updatedItem });
  } catch (error) {
    next(error);
  }
});

router.get("/cart/:userId", requireToken, async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: { userId: req.params.userId },
      include: {
        model: LineItem,
        attributes: ["id", "qty"],
        include: {
          model: Vinyl,
          attributes: ["id", "name", "stock", "price", "img"],
          include: {
            model: Artist,
            attributes: ["id", "name"],
          },
        },
      },
    });

    userOrders.sort((a, b) => a.id - b.id);
    res.status(200).json({ userOrders });
  } catch (error) {
    next(error);
  }
});

router.put("/cart/:vinylId", requireToken, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        complete: false,
        userId: req.user.id,
      },
    });

    const lineItem = await LineItem.create({
      orderId: cart.id,
      vinylId: req.params.vinylId,
    });

    const itemWithContents = await LineItem.findByPk(lineItem.id, {
      attributes: ["id", "qty"],
      include: {
        model: Vinyl,
        attributes: ["id", "name", "stock", "price", "img"],
        include: {
          model: Artist,
          attributes: ["id", "name"],
        },
      },
    });
    res.json({ itemWithContents });
  } catch (error) {
    next(error);
  }
});

router.delete("/cart/:lineItemId", requireToken, async (req, res, next) => {
  try {
    await LineItem.destroy({
      where: { id: req.params.lineItemId },
    });
    res.json({ deletedItem: Number(req.params.lineItemId) });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
