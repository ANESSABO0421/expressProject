import pkg from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { verify } = pkg;

export default function Auth(req, res, next) {
  try {
    const key = req.headers.authorization;//in home.jsx we pass the headers were inside the headers consist the Authorization
    if (!key) {
      return res.status(404).send("unauthorized access");
    }
    const token = key.split(" ")[1];//WE GET AN ARRAY OF TWO LIKE ["Bearer" , "Token"] so we only nee the token
    const auth = verify(token, process.env.JWT_TOKEN);//verify it by looking on .env
    req.user = auth;
    next();
  } catch (error) {
    return res.status(500).send(error);
  }
}
