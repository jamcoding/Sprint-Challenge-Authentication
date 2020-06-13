const db = require('../database/dbConfig.js');
const Users = require('./users-model.js');

describe('users model', () => {
    describe('insert()', () => {
        it('insert into database', async () => {
            await Users.insert({ username: 'testing1' });

            const users = await db('users');
            expect(users).toHaveLength(1);
        })

        beforeEach(async () => {
            await db('users').truncate();
        })
    })
})