const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/moreErrors/BadRequestError");
const NotFoundError = require("../utils/moreErrors/NotFoundError");
const ForbiddenError = require("../utils/moreErrors/ForbiddenError");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.error(e);
      next(e);
    });
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else if (e.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(e);
      }
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else if (e.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Requested resource not found"));
      } else {
        next(e);
      }
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else if (e.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Requested resource not found"));
      } else {
        next(e);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return next(
          new ForbiddenError("You are not authorized to delete this item"),
        );
      }
      return item.deleteOne().then(() => {
        res.status(200).send({ data: item, message: "Item deleted" });
      });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else if (e.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Requested resource not found"));
      } else {
        next(e);
      }
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
};
