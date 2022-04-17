import request from 'supertest'
import app from '../src/index'

describe("POST /api/v1/character", () => {
    test("it should respond with 200 status code", async () => {
        const response = await request(app).post("/api/v1/character").send();
        expect(response.statusCode).toBe(200);
    });

    test("it should have a content-type: application/json in header", async () => {
        const response = await request(app).post("/api/v1/character").send();
        expect(response.header['content-type']).toEqual(expect.stringContaining("application/json"))
    });

    test("it should respond with a Character id", async () => {
        const response = await request(app).post("/api/v1/character").send();
        expect(response.body.id).toBeDefined();
    });
});

describe('GET /api/v1/character/listofcharacters', () => {
    test("it should respond with 200 status code", async () => {
        const response = await request(app).get('/api/v1/charcater/listofcharacters').send();
        expect(response.statusCode).toBe(200);
    });

    test("it should respond with an array", async () => {
        const response = await request(app).get('/api/v1/charcater/listofcharacters').send();
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('GET /api/v1/character/name', () => {
    test("it should respond with 200 status code", async () => {
        const response = await request(app).get('/api/v1/charcater/name').send();
        expect(response.statusCode).toBe(200);
    });

    test("it should respond with an array", async () => {
        const response = await request(app).get('/api/v1/charcater/name').send();
        expect(response.body).toBeInstanceOf(Array)
    })
})