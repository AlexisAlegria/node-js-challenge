const supertest = require('supertest')

const app = require('./src/index')

const api = supertest(app)

test('characters are return as json', async () => {
    await api
        .get('/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})