import Joi from "joi";
import Product from "../models/product";
import Category from "../models/category";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string(),
  description: Joi.string(),
  categoryId: Joi.string().required(),
});

export const getAll = async (req, res) => {
  const {
    _sortBy = "createdAt",
    _orderBy = "asc",
    _limit = 10,
    _page = 1,
    _search = '',
    _categoryId = '',
  } = req.query;
  //use computed property name sort
  let query = {};
  if (_search) {
    query = {
      $or: [
        { name: { $regex: new RegExp(_search), $options: "i" } },
        { description: { $regex: new RegExp(_search), $options: "i" } },
      ]
    }
  }
  if (_categoryId) {
    query = {
      ...query,
      categoryId: _categoryId,
    }
  }
  console.log(query)
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sortBy]: _orderBy === "desc" ? -1 : 1,
    },
  };

  try {
    const data = await Product.paginate(query, options);
    if (data.length == 0) {
      return res.json({
        message: "No product in database !",
      });
    }
    return res.json({
      message: "Get list product success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id).populate("categoryId");
    if (data.length === 0) {
      return res.status(200).json({
        message: "No product in database !",
      });
    }
    return res.status(200).json({
      message: "Get product success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Delete product success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = productSchema.validate(body, { abortEarly: false });
    if (error) {
      return res.json({
        message: error.details.map((err) => err.message),
      });
    }

    const product = await Product.create(body);
    if (product.length === 0) {
      return res.status(400).json({
        message: "Add product failed",
      });
    }
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });

    // Trước khi sản phẩm được thêm thành công , cần thêm objectId của product vào category
    // + category sẽ tìm và update products mặc định mảng rỗng và thêm 1 object vào đó bằng cách tìm trong product có categoryId giống category thì sẽ được thêm vào

    return res.status(200).json({
      message: "Add product success",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      return res.status(400).json({
        message: "Update product failed",
      });
    }
    return res.status(200).json({
      message: "Update product success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
