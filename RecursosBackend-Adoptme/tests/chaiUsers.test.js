import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js";
import chai from "chai";

mongoose.connect("mongodb+srv://maxirosanda:ZnyxQclWtB5ndaDS@cluster0.wh168.mongodb.net/adoptme70345?retryWrites=true&w=majority&appName=Cluster0");

const expect = chai.expect;

describe("Users DAO", () => {
    before(function (){
        this.users = new Users();
    })
    beforeEach(function (){
        mongoose.connection.collections.users.drop();
        this.timeout(5000);
    })
    it("El Dao debe poder obtener los usuarios en formato de arreglo", async function () {

        const users = await this.users.get();
        expect(users).to.be.an("array");
    })

    it("El Dao debe agregar correctamente un elemento a la base de datos", async function () {
        const user = {
            first_name: "Test",
            last_name: "User",
            email:"test@gmail.com",
            password:"test123",
        }
        const result = await this.users.save(user);
        expect(result).to.have.property("_id");
        expect(result.first_name).to.equal(user.first_name);
        expect(result.last_name).to.equal(user.last_name);
        expect(result.email).to.equal(user.email);
    })

});


