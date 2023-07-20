import JWT from "jsonwebtoken";

// Protected routes token based
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );

        req.user = decode;
        next();
    } catch (error) {
        res.status(401).send("Unauthorized : no token provided.");

        console.log(error);
    }
};
