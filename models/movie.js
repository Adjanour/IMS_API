import { getDB } from "../db.js";

export const Movie = getDB("sample_mflix").collection("movies")