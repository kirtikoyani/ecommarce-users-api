import { RequestHandler } from "express";
const Product = require("../../Db/productSchema");

export const getAllProduct: RequestHandler = async (req, res, next) => {
  try {
    const productsData = await Product.find();
    res.status(200).json(productsData);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const getProductById: RequestHandler = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const productData = await Product.findById(_id);
    if (!productData) {
      throw new Error("Product not found");
    }
    res.status(200).json(productData);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const postProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const createProduct = await product.save();
    res.status(201).json(createProduct);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const putProduct: RequestHandler = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const updateProduct = await Product.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!updateProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updateProduct);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete(_id);

    if (!deleteProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send(); // No content on successful deletion
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
