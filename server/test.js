const { User } = require('./model/User');

describe('GET /tutors', () => {
  test('It should respond with an array of tutors', async () => {
    const request = require('supertest');
    const app = require('./index'); // Assume your Express app is exported from this file
    const response = await request(app).get('api/user/tutors');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(User.find).toHaveBeenCalledWith({ usertype: "Tutor" }); // Ensure find was called correctly
  });

  test('It should handle errors', async () => {
    User.find.mockRejectedValue(new Error('Fake error'));  // Simulate an error

    const response = await request(app).get('/tutors');
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: "Internal server error" });
    expect(User.find).toHaveBeenCalledWith({ usertype: "Tutor" });
  });
});


describe('GET /tutors', () => {
  test('It should respond with an array of tutors', async () => {
    const response = await request(app).get('/tutors');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Additional checks can include checking the length of the array or properties of tutors
  });

  test('It should handle errors', async () => {
    // Simulate an error scenario, for example by mocking the User.find method to throw an error
    jest.spyOn(User, 'find').mockImplementation(() => Promise.reject(new Error('Fake error')));
    const response = await request(app).get('/tutors');
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: "Internal server error" });
  });
});
