import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { Link } from "../models/links.js";
import { randomBytes } from "crypto";
import { access } from "fs/promises";
//

//

const router = express.Router();

router.post(
  "/",
    [body("url").isURL().withMessage("Enter a valid url")],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ msg: errors.array().toString() });
      }
      const url = req.body.url as string;

      const shortCode = randomBytes(10).toString("hex");

      const link = new Link({ url: url, shortCode: shortCode });
      await link.save();

      res.status(201).json({
        id: link._id,
        url: link.url,
        shortCode: link.shortCode,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:code",
  async (req: Request, res: Response, next: NextFunction) => {
    const code = req.params.code;
    try {
      const link = await Link.findOne({ shortCode: code });
      if (!link) {
        const error = new Error("no such a link");
        throw error;
      }
      link.accessCount = link.accessCount + 1;
      await link.save();

      // res.status(200).json({
      //   id: link._id,
      //   url: link.url,
      //   shortCode: link.shortCode,
      //   createdAt: link.createdAt,
      //   updatedAt: link.updatedAt,
      // });
    res.redirect(link.url)
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:code",
  [body("url").isURL().withMessage("Enter a valid url")],
  async (req: Request, res: Response, next: NextFunction) => {
    const code = req.params.code;
    const url = req.body.url;
    try {
      const link = await Link.findOne({ shortCode: code });
      if (!link) {
        const error = new Error("no such a link");
        throw error;
      }
      link.url = url;
      await link.save();

      res.status(200).json({
        id: link._id,
        url: link.url,
        shortCode: link.shortCode,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:code",
  async (req: Request, res: Response, next: NextFunction) => {
    const code = req.params.code;
    try {
      const link = await Link.findOneAndDelete({ shortCode: code });
      if (!link) {
        const error = new Error("no such a link");
        throw error;
      }
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:code/stats",
  async (req: Request, res: Response, next: NextFunction) => {
    const code = req.params.code;
    try {
      const link = await Link.findOne({ shortCode: code });
      if (!link) {
        const error = new Error("no such a link");
        throw error;
      }
      res
        .status(200)
        .json({
          id: link._id,
          url: link.url,
          shortCode: link.shortCode,
          accessCount: link.accessCount,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
        });
    } catch (error) {
      next(error);
    }
  }
);

export { router as ShortenRouter };
