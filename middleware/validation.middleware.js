const { TYPE_VIDEO, GENRE_VIDEO } = require("../utils/constants");
const Cover = require("../models/cover.model");
const User = require("../models/user.model");
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../errors/customErrors");

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith("no cover")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to use this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

const validateCoverInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("type")
    .isIn(Object.values(TYPE_VIDEO))
    .withMessage("invalid type value"),
  body("genre")
    .isIn(Object.values(GENRE_VIDEO))
    .withMessage("invalid genre value"),
  body("description").notEmpty().withMessage("description is required"),
]);

const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("invalid mongodb id");

    const cover = await Cover.findById(value);
    if (!cover) throw new NotFoundError(`no cover with that id ${value}`);

    const isAdmin = req.user.role === "admin";
    if (!isAdmin)
      throw new UnauthorizedError("not authorized to use this route");
  }),
]);

const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exist");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
]);

module.exports = validateCoverInput,
  validateIdParam,
  validateRegisterInput,
  validateLoginInput,
  validateUpdateUserInput;
