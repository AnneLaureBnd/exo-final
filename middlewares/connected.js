// import jwt from "jsonwebtoken";

// const {
//     APP_HOST: hostname,
//     APP_PORT: port,
//     APP_TOKEN: secret,
// } = process.env;

// export default (req, res, next) => {
//     try {
//         if (req.headers.authorization) {
//             const token = req.headers.authorization.split(" ")[1];
//             const tokenSigned = jwt.verify(token, secret);
//             console.log(tokenSigned.name + " est connecté(e) !");
//             res.json({"message": "Vous êtes authentifié"})
//         }
//     } catch (err) {
//         res.status(401).json({message: "Utilisateur non identifié"});
//     }
//     next();
// };
const notConnected =  (req, res, next) => {
    (req.session.user === '' || req.session.user === undefined || req.session.user === null) ? res.redirect('/sign-in') : next();
}

const connected = (req,res,next) => {
    req.session.user ? res.redirect('/') : next();
}

export { notConnected, connected };