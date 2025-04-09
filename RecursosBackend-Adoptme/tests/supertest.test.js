import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");


describe("Test Adoptme",()=>{
    describe("Test Pets",()=>{
        it("Debe crear un nuevo pet",async () => {
            const response = await requester.post("/api/pets").send({
                name: "Max",
                specie: "dog",
                birthDate: "02/18/2020"
            })
            expect(response.statusCode).to.equal(201);
            expect(response.ok).to.equal(true);
            expect(response.body.payload).to.have.property("_id");
            expect(response.body.payload.name).to.equal("Max");
            expect(response.body.payload.specie).to.equal("dog");
            expect(response.body.payload.adopted).to.equal(false);

        })

        it("una mascota sin el campo  nombre, el módulo debe responder con un status 400",async()=>{
            const response = await requester.post("/api/pets").send({
                specie: "dog",
                birthDate: "02/18/2020"
            })
            expect(response.statusCode).to.equal(400);
            expect(response.ok).to.equal(false);
            
        })

        it("Debe obtener todas las mascotas",async()=>{
            const response = await requester.get("/api/pets");
            expect(response.statusCode).to.equal(200);
            expect(response.ok).to.equal(true);
            expect(response.body).to.have.property("status");
            expect(response.body).to.have.property("payload");
        })

        it("Debe actualizar una mascota",async()=>{
            const response = await requester.post("/api/pets").send({
                name: "Max",
                specie: "dog",
                birthDate: "02/18/2020"
            })
            const petId = response.body.payload._id;
            const responseUpdate = await requester.patch(`/api/pets/${petId}`).send({
                name: "Pitu"
            })
            expect(responseUpdate.statusCode).to.equal(200);
            expect(responseUpdate.ok).to.equal(true);
            expect(responseUpdate.body.payload.name).to.equal("Pitu");
        })

        it("Debe eliminar una mascota",async()=>{
            const response = await requester.post("/api/pets").send({
                name: "Max",
                specie: "dog",
                birthDate: "02/18/2020"
            })
            const petId = response.body.payload._id;
            const responseDelete = await requester.delete(`/api/pets/${petId}`);
            expect(responseDelete.statusCode).to.equal(200);
            expect(responseDelete.ok).to.equal(true);
            expect(responseDelete.body.message).to.equal("pet deleted");
            const responseGet = await requester.get(`/api/pets/${petId}`);
            expect(responseGet.statusCode).to.equal(404);
            expect(responseGet.ok).to.equal(false);
        })

        it("Debe crear una mascota con imagen",async()=>{
            const response = await requester.post("/api/pets/withimage")
            .field("name","Max")
            .field("specie","dog")
            .field("birthDate","02/18/2020")
            .attach("image","./tests/assets/dog.png");

            expect(response.statusCode).to.equal(201);
            expect(response.ok).to.equal(true);
            expect(response.body.payload).to.have.property("_id");
        })


    })
})
