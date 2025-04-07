import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js";
import Assert from "assert";

mongoose.connect("mongodb+srv://maxirosanda:ZnyxQclWtB5ndaDS@cluster0.wh168.mongodb.net/adoptme70345?retryWrites=true&w=majority&appName=Cluster0");

const assert = Assert.strict;

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
        assert.strictEqual(Array.isArray(users),true);
    })

    it("El Dao debe agregar correctamente un elemento a la base de datos", async function () {
        const user = {
            first_name: "Test",
            last_name: "User",
            email:"test@gmail.com",
            password:"test123",
        }
        const result = await this.users.save(user);
        assert.ok(result._id);
        assert.strictEqual(result.first_name,user.first_name);
        assert.strictEqual(result.last_name,user.last_name);
        assert.strictEqual(result.email,user.email);
        assert.strictEqual(Array.isArray(result.pets),true);
    })

});


