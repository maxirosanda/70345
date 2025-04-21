import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js";
import chai from "chai";

mongoose.connect("mongodb+srv://maxirosanda:ZnyxQclWtB5ndaDS@cluster0.wh168.mongodb.net/adoptme70345?retryWrites=true&w=majority&appName=Cluster0");

const expect = chai.expect;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Users DAO", () => {

    
    before(function (){
        this.user = {
            id: ""
        }
        this.users = new Users();
    })
    beforeEach(async function (){
        this.timeout(5000);
        await sleep(500);

        const user = {
            first_name: "Test",
            last_name: "User",
            email: `test${Date.now()}@mail.com`,
            password: "test123",
          };
        this.user = await this.users.save(user);
    })

    after(async function (){
        mongoose.connection.collections.users.drop();
        await mongoose.disconnect();
    })

    it("El Dao debe poder obtener los usuarios en formato de arreglo", async function () {

        const users = await this.users.get();
        expect(users).to.be.an("array");

    })

    it("El Dao debe agregar correctamente un elemento a la base de datos", async function () {

        expect(this.user).to.have.property("_id");
        expect(this.user.first_name).to.equal("Test");
        expect(this.user.last_name).to.equal("User");
        expect(this.user.email).to.include("test");
    })

    it("El Dao debe poder actualizar un usuario correctamente", async function () {
        const updatedUser = {
            first_name: "Updated"
        }
        const result = await this.users.update(this.user.id,updatedUser);
        expect(result).to.have.property("_id");
        expect(result.first_name).to.equal(updatedUser.first_name);
    })

});


