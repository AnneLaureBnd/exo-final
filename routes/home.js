import express from "express";
import HomeController from "../controllers/home.js";
import { SignUpController } from "../controllers/signup.js";
import { SignInController, logout } from "../controllers/signin.js";
import { DashboardController } from "../controllers/login.js"
import { notConnected, connected } from "../middlewares/connected.js";
import { newUser, verifyUser } from "../mongo/mongo.js";
import { EphemereController } from "../controllers/ephemere.js";
const router = express.Router()

// Homepage
router.get("/", HomeController);

// S'inscrire
router.get('/sign-up', SignUpController);
router.post('/sign-up', newUser);

// Se connecter
// afficher
router.get('/sign-in', connected, SignInController);
// post formulaire connexion
//router.post('/sign-in', login);
router.post('/sign-in', verifyUser);

// redirection une fois connecté
router.get('/login', notConnected, DashboardController);

// déconnexion
router.get('/logout', logout)

// Page éphémère
router.get('/ephemere', EphemereController)

export default router;