const router = require("express").Router();
const { Artist, LineItem, Order, Track, Vinyl } = require("../db");
const { requireToken } = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const vinyls = await Vinyl.findAll({
      include: Artist,
    });
    vinyls.sort((a, b) => a.id - b.id);
    return res.status(200).json({ vinyls });
  } catch (error) {
    next(error);
  }
});

// CART PATHS
router.put("/cart", requireToken, async (req, res, next) => {
  try {
    await Order.update(
      { complete: true },
      {
        where: {
          complete: false,
          userId: req.user.id,
        },
      }
    );
    await Order.create({ userId: req.user.id });
    res.json({ message: "success" });
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
    const order = await Order.findOne({
      where: {
        complete: false,
        userId: req.user.id,
      },
    });

    const existingItem = await LineItem.findOne({
      where: {
        orderId: order.id,
        vinylId: req.params.vinylId,
      },
    });

    if (existingItem) {
      await existingItem.update({ qty: existingItem.qty + 1 });
      return res.json({ existingItem });
    }

    const lineItem = await LineItem.create({
      orderId: order.id,
      vinylId: req.params.vinylId,
    });

    const newItem = await LineItem.findByPk(lineItem.id, {
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

    res.status(200).json({ newItem });
  } catch (error) {
    next(error);
  }
});

router.delete("/cart/:lineId", requireToken, async (req, res, next) => {
  try {
    const deletedItem = await LineItem.destroy({
      where: { id: req.params.lineId },
    });
    res.status(200).send({ deletedItem });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
