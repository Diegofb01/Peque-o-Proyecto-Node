const request = require("supertest");
const app = require("../app");
const db = require("../config/config");


describe("Pruebas de integración para la API", () => {
  test("Debe responder con un código 200 en la ruta /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

afterAll((done) => {
    db.end((err) => {
      if (err) console.error("Error cerrando la conexión:", err);
      else console.log("Conexión a la base de datos cerrada");
      done();
    });
  });   