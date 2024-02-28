import { errorMessage } from "@src/constants/messages/errorMessages";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import HttpStatus from "@src/responses/httpStatus";

const ProjectValidator = {
  create: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage(errorMessage.projectNameRequired),
    body("description")
      .trim()
      .notEmpty()
      .withMessage(errorMessage.projectDescriptionRequired),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors });
      }
      next();
    },
  ],
  assignToProject: [
    body("projectID")
      .notEmpty()
      .withMessage(errorMessage.projectIdRequired)
      .isMongoId()
      .withMessage(errorMessage.invalidIdType),
    body("userIDs")
      .notEmpty()
      .withMessage(errorMessage.userIdsRequired)
      .isArray()
      .withMessage(errorMessage.arrayType),
    body("userIDs.*").isMongoId().withMessage(errorMessage.invalidIdType),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors });
      }
      next();
    },
  ],
};

export default ProjectValidator;
