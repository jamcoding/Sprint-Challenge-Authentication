const server = require('./server.js');
const request = require('supertest');

describe('GET /', () => {
    it('200 ok', async () => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200);
    })
})

describe('POST /api/auth/users', () => {
    it('200 ok', async () => {
        const res = await request(server).get('/api/auth/users');
        expect(res.status).toBe(200);
    })
})