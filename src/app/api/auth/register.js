import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise;
    const db = client.db();

    // Insert the new user into the database
    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created', userId: result.insertedId });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
