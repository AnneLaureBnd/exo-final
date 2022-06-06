import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const {APP_HOST: hostname, APP_PORT: port, APP_DSN: dsn} = process.env;
const app = express();

mongoose.connect(dsn,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
)

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserModel = mongoose.model("users", UserSchema);

const newUser = async (req,res) => {
    const { username, password } = req.body;
    const User = new UserModel({
        "username": username,
        "password": password
    })
    const isUser = await UserModel.find({ username: username});
    //console.log(isUser);
    if (isUser.length === 0){
        console.log("Utilisateur inconnu");
        User.save()
        .then((doc) => {
            console.log(doc);
            //res.json({"message" : "New user added with success"});
            res.render('signin')
        })
        .catch((err) => {
            console.log(err);
            res.json({"message": "Failed add new user"})
        })
    }
    else if(isUser.length > 0){
        console.log("L'utilisateur existe déjà !")
    }
    else {
        console.log("ERREUR");

    }
}

const verifyUser = async (req,res) => {
    let { username, password } = req.body;
    const isUser = await UserModel.find({ username: username, password: password});
    const User = new UserModel({
        "username": username,
        "password": password
    })
    if (isUser.length === 0){
        console.log("Utilisateur inconnu");
        res.render('signin', {username: username});
    }
    else if(isUser.length > 0){
        console.log("L'utilisateur a été recconu !")
        req.session.user = username;
        console.log(req.session)
        res.render('login', {username: username});
    }
    else {
        console.log("ERREUR");
    }

}
export { newUser, verifyUser };