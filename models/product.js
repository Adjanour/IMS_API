import { getDB } from "../configs/db.js";

export const Product = getDB("ims").collection("products")