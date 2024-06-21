import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;


    try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Create a new user an save to db
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
})
console.log(newUser);

res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user!' });
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;

    try {

    // Check if the user exists

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if (!user) return res.status(401).json({ message: 'Invalid Credentials!' }); 
    

    // Check if the password is correct

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid Credentials!' });

    // Generate cookie token and send it to the user

    res.setHeader('Set-Cookie', "test=" + "myValue");
    } catch(err) {
        console.log(first)
        res.status(500).json({ message: 'Failed to login!' });
    }
}

export const logout = (req, res) => {}