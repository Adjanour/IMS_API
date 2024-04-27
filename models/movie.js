import { getDB } from "../configs/db.js";

export const Movie = getDB("sample_mflix").collection("movies")