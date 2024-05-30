const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MDI1OTk2LCJpYXQiOjE2OTU5Mzk1OTYsImp0aSI6IjU4N2JhMjRhMDYzODRkMTM4YjJlZGFkZmNjYmZkM2Y5IiwidXNlcl9pZCI6MX0.D_NGjibXxzjGkoTrJjLl6l6YOgQN9pcUeCTF-1ZaTAU'

const token2 = jwt.sign(
    { userId: 'JW1', username: 'Test'},
    JWT_SECRET,
    { expiresIn: "1d" }
  );

try {
    const decoded = jwt.verify(token2, JWT_SECRET);
    console.log('JWT is valid:', decoded);
} catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
        console.error('Token has expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
        console.error('JWT is invalid');
    } else {
        console.error('JWT verification failed:', error.message);
    }
}