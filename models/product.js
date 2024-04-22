import { getDB } from "../db.js";

export const Product = getDB("ims").collection("products")