import fs from "fs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const {
  APP_HOST: hostname,
  APP_PORT: port,
  //APP_TOKEN: secret,
  APP_SECRET: secret
} = process.env;

const SignInController = (req, res)=>{   
    res.render('signin');
}

// const login = (req,res) => {
//     const login = req.body.username;
//     const password = req.body.password;
//     const users = JSON.parse(fs.readFileSync('data/datas.json', "utf-8"));
//     const user = users.find(
//         (user) => user.login == login && user.password == password
//       );
//       if (user) {
//         const token = jwt.sign(
//             {
//               userId: user.id,
//               name: user.name,
//               login: user.login,
//               role: user.role,
//             },
//             secret,
//             {
//               expiresIn: "120s",
//             }
//           );
//           //res.status(200).json({ message: `Token généré : ${token}` });
//           res.redirect('/login');
//     } else {
//         res.status(401).json({ message: "Erreur d'authentification" });
//     }
// }

const logout = (req, res) => {
    req.session.destroy(function(err){
        if(err){
           console.log(err);
        }else{
            console.log('DANS LE ELSE');
            res.redirect('/');
        }
     });
}

export { SignInController, logout };