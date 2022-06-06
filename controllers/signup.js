import fs from 'fs';

const SignUpController = (req, res)=>{   
    res.render('../views/signup.ejs');
}

const login = (req,res) => {
    const { login, password } = req.body;
}

export { SignUpController };