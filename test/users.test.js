const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = require("chai").expect;
const requester = chai.request(server).keepOpen();

let userID;

after(function(){
    requester.close();
})

describe("test user", function(){
    describe("get all", function(){
        it("should return all users and 200", function(){
            return requester.get("/api/users")
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(400);
                expect(res.body).to.be.a("array");
            })
        })
    })
    describe("create user", function(){
        it("should return an user after creation and 200", function(){
            return requester.post("/api/users/")
            .send({"email": "didier.raoult@epitech.eu", "username": "didier", "password": "123"})
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                // console.log(res.body)
                expect(res.body).to.be.a("object")
                expect(res.body.data.email).is.not.null
                expect(res.body.data.username).is.not.null
                expect(res.body.data.password).is.not.null
                expect(res.body.data.role).is.not.null
                expect(res.body.data.id).is.not.null
                expect(res.body.data.team).is.not.null
                userID = res.body.data.id;
            })
        })
    })
    describe("get user by id", function(){
        it("should return an user by id and 200", function(){
            return requester.get("/api/users/" + userID)
            .then(function(res){
                console.log(res.status);
                // console.log(res.body)
                expect(res).to.have.status(200);
            })
        })
    })
    describe("update user", function(){
        it("should return 200 and state true", function(){
            return requester.put("/api/users/" + userID)
            .send({"username": "didier"})
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                // console.log(res.body)
                expect(res.body.state).to.be.true;
            })
        })
    })
    describe("delete user", function(){
        it("should return 200 and state true", function(){
            return requester.del("/api/users/" + userID)
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                // console.log(res.body)
                expect(res.body.state).to.be.true;
            })
        })
    })
})
