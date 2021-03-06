const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoicmVnaXN0ZXJUZXN0MSIsImlhdCI6MTU4ODE3NDk1MywiZXhwIjoxNTg4MjYxMzUzfQ.jBh_JNT3p_3vaPtG_icDkQV95EFLikM4SlcEdeHiGfc"

describe("server", function () {

    describe("GET /", function () {
      it("should return 200 OK", function () {
        // make a GET request to / endpoint on the server
        return request(server) // return the async call to let jest know it should wait
          .get("/")
          .then(res => {
            // assert that the HTTP status code is 200
            expect(res.status).toBe(200);
          });
      });

      it("should return {api: 'up and running :)' in body of response", function() {
          const expectedBody = { api: "up and running :)" };
          return request(server)
            .get("/")
            .then(res => {
                expect(res.body).toEqual(expectedBody)
            });
      })
    });

    describe("POST /api/register", function () {
        beforeEach(async () => {
            await db("users").truncate(); // empty the table and reset the id back to 1
        });

        it("return 201 on success", async () => {
            const response = await request(server)
                .post("/api/register")
                .send({ username: "registerTest", password: "registerPass" })
                expect(response.status).toBe(201);
        });

        it('should return a property of username', function () {
            return request(server)
                .post("/api/register")
                .send({ username: "registerTest", password: "registerPass" })
                .then(res => {
                expect(res.body.username).toBe("registerTest");
                });
        });

        it('should add user to the database', async function() {
            const existing = await db('users').where({ username: "tester" })
            expect(existing).toHaveLength(0);

            await request(server)
                .post("/api/register")
                .send({ username: "registerTest", password: "registerPass" })
                .then(res => {
                    expect(res.status).toBe(201)
                })

            const added = await db('users');
            expect(added).toHaveLength(1);
        })
    })

    describe("POST /api/login", function () {
        beforeEach(async () => {
            await db("recipes").truncate();
        })

        it("return 200 on success", async () => {
            const response = await request(server)
                .post("/api/login")
                .send({ username: "registerTest", password: "registerPass" })
                expect(response.status).toBe(200);
        });

        it('should return a welcome message', function () {
            return request(server)
                .post("/api/login")
                .send({ username: "registerTest", password: "registerPass" })
                .then(res => {
                expect(res.body.message).toBe("Welcome!");
                });
        });

        it("should generate & return authentication token when login is successful", function() {
            return request(server)
                .post("/api/login")
                .send({ username: "registerTest", password: "registerPass" })
                .then(res => {
                    expect(res.body).toHaveProperty('token')
                })
        })

        it("should return 401 status if username is not found", function() {
            return request(server)
                .post("/api/login")
                .send({ username: "notAUser", password: "badrequest" })
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })
    });

    describe("GET /api/recipes", function () {

        it("should ask to log in if no token", function () {
            return request(server)
                .get('/api/recipes')
                .then(res => {
                    expect(res.body.message).toBe( "Please log in.")
                })
        })

        it("should display recipes if token", async function () {

            const response = await request(server)
                .get("/api/recipes")
                .set("Content-type", "application/json")
                .set("Authorization", testToken)
                expect(response.status).toBe(200);
        })
    })

    describe("POST /api/recipes", function () {
        beforeEach(async () => {
            await db("recipes").truncate();
        })

        it ("should return 201 on success", async () => {
            response = await request(server)
            .post("/api/recipes")
            .set("Content-type", "application/json")
            .set("Authorization", testToken)
            .send({
                title: "Poached Egg",
                source: "Auntie",
                ingredients: "1 egg",
                instructions: "Crack egg into boiling water, turn heat off and wait 5 min. Remove egg carefully.",
                categories: [1]
            })
                expect(response.status).toBe(201)
        })

        it('should return a message', async () => {
            response = await request(server)
                .post("/api/recipes")
                .set("Content-type", "application/json")
                .set("Authorization", testToken)
                .send({
                    title: "Poached Egg",
                    source: "Auntie",
                    ingredients: "1 egg",
                    instructions: "Crack egg into boiling water, turn heat off and wait 5 min. Remove egg carefully.",
                    categories: [1]
                })
                expect(response.body.message).toBe("Recipe added successfully")
        });

        it('should add recipe to db', async function() {
            const existing = await db('recipes').where({ title: "Poached Egg" });
            expect(existing).toHaveLength(0);

            await request(server)
                .post("/api/recipes")
                .set("Content-type", "application/json")
                .set("Authorization", testToken)
                .send({
                    title: "Poached Egg",
                    source: "Auntie",
                    ingredients: "1 egg",
                    instructions: "Crack egg into boiling water, turn heat off and wait 5 min. Remove egg carefully.",
                    categories: [1]
                })
                .then(res => {
                    expect(res.status).toBe(201)
                })
                
            const added = await db('recipes');
            expect(added).toHaveLength(1);
        })
    })

    describe("GET /api/recipes/:id", function () {

        it("should return 200 on success", async () => {
            const response = await request(server)
            .get("/api/recipes/1")
            .set("Content-type", "application/json")
            .set("Authorization", testToken)
            expect(response.status).toBe(200);
        })

        it("should return Scrambled Eggs as first recipe", function () {
            return request(server)
            .get("/api/recipes/1")
            .set("Content-type", "application/json")
            .set("Authorization", testToken)
            .then(res => {
                expect(res.body[0].title).toBe("Poached Egg")
            })
        })
    })

    describe("PUT /api/recipes/:id", function () {

        it("should return success message", async () => {
            response = await request(server)
            .put("/api/recipes/1")
            .set("Content-type", "application/json")
            .set("Authorization", testToken)
            .send({
                title: "EDITED Poached Egg",
                source: "Auntie",
                ingredients: "1 egg",
                instructions: "Crack egg into boiling water, turn heat off and wait 5 min. Remove egg carefully."
            })
            expect(response.body.message).toBe("Recipe updated successfully")
        })

        it("should update recipe information in the db", async function() {
            const original = await db('recipes').where({ title: "Poached Egg" });
            expect(original).toHaveLength(0);

            const updated = await db('recipes').where({ title: "EDITED Poached Egg" });
            expect(updated).toHaveLength(1);
        })

        it("should tell user to log in if no token", async () => {
            response = await request(server)
            .put("/api/recipes/1")
            .send({
                title: "Edited Poached Egg",
                source: "Auntie",
                ingredients: "1 egg",
                instructions: "Crack egg into boiling water, turn heat off and wait 5 min. Remove egg carefully."
            })
            expect(response.body.message).toBe("Please log in.")
        })
    })

    describe("DELETE /api/recipes/:id", function () {
        // @TODO: create recipe to be deleted:
        // save id in variable to use for .delete
        it("should return success message", async () => {
            response = await request(server)
            .delete("/api/recipes/1")
            .set("Content-type", "application/json")
            .set("Authorization", testToken)
            expect(response.body.message).toBe("Recipe deleted successfully")
        })

        it("should remove recipe from the db", async function() {
            const deleted = await db('recipes').where({ id: 1 });
            expect(deleted).toHaveLength(0);
        })
    })
})