const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors')

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());

app.get('/students', cors() ,async (req, res) => {
    try {
      const students = await prisma.user.findMany({
        where: {
          usertype: 'Student',
        },
      });
      res.json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/tutors', async (req, res) => {
    try {
      const tutors = await prisma.user.findMany({
        where: {
          usertype: 'Tutor',
        },
      });
      res.json(tutors);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
