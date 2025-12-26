import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";



export const registerUser = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    console.log('Register attempt:', { name, email, role });
    if (email && typeof email === 'string') email = email.trim().toLowerCase();

    let existing;
    try {
      console.log('Checking existing user for', email);
      existing = await prisma.user.findUnique({ where: { email } });
    } catch (dbErr) {
      console.error('DB error on findUnique (register):', dbErr);
      return res.status(500).json({ message: 'Database error', success: false, error: dbErr.message });
    }

    if (existing) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let user;
    try {
      console.log('Creating user:', email);
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: role && ['borrower','librarian'].includes(role) ? role : 'borrower',
        },
      });
    } catch (dbErr) {
      console.error('DB error on create (register):', dbErr);
      return res.status(500).json({ message: 'Database error', success: false, error: dbErr.message });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const { password: _pwd, ...safeUser } = user;

    return res.status(201).json({ message: 'User created successfully', success: true, token, user: safeUser });
  } catch (error) {
    console.error('🔥 Prisma Error:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });

    const user = await prisma.user.findUnique({ where: { email } });

    const errorMsg = 'Authentication failed, Email or Password is Invalid';
    if (!user) return res.status(403).json({ message: errorMsg, success: false });

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) return res.status(403).json({ message: errorMsg, success: false });

    const token = jwt.sign({ id: user.id, role: user.role },
       process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: 'Login Success', success: true, token,
       user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    console.error('🔥 Prisma Error:', error);
    res.status(500).json({ message: 'Internal server error',
       success: false });
  }
};



