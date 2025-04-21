import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Test Adoptions",()=>{

    before(async function (){
        const userResponse = await requester.post("/api/sessions/register").send({
            first_name:"Juan",
            last_name:"Perez",
            email:"maxi2222222@gmail.com",
            password:"123456"
        })
        this.userId = userResponse.body.payload
        
        const petResponse = await requester.post("/api/pets").send({
            name:"Max",
            specie:"dog",
            birthDate:"2020-01-01"
        })
        this.petId = petResponse.body.payload._id

    })

    after(async function (){
        await requester.delete(`/api/users/${this.userId}`)
        await requester.delete(`/api/pets/${this.petId}`)
    })

    
    it("Debe crear una adopcion",async function (){
        const response = await requester.post(`/api/adoptions/${this.userId}/${this.petId}`)
        expect(response.status).to.equal(201)
        expect(response.body.status).to.equal("success")
        expect(response.body.message).to.equal("Pet adopted")
    })
})