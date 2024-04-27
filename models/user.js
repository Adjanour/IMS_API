
import {getDB}  from "../configs/db.js"


export const User = getDB("ims").collection("users")

