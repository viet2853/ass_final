import Joi from "joi";
import Category from "../models/category";
import Product from "../models/product";

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

export const getAll = async (req, res) => {
  try {
    const data = await Category.find();
    if (data.length == 0) {
      return res.json({
        message: "No category in database !",
      });
    }
    return res.json({
      message: "Get list category success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id).populate("products");
    if (category.length === 0) {
      return res.status(200).json({
        message: "No category in database !",
      });
    }
    return res.status(200).json({
      message: "Get category success",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Delete category success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = categorySchema.validate(body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.json({
        message: errors,
      });
    }

    const data = await Category.create(body);
    if (data.length === 0) {
      return res.status(400).json({
        message: "Add category failed",
      });
    }
    return res.status(200).json({
      message: "Add category success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findByIdAndUpdate(id, req.body, { new: true });
    console.log(req.body)
    if (!data) {
      return res.status(400).json({
        message: "Update category failed",
      });
    }
    return res.status(200).json({
      message: "Update category success",
      data,
    });
  } catch (error) {
    console.log('err')
    return res.status(400).json({
      message: error,
    });
  }
};
