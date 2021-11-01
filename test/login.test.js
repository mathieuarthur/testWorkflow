const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = require("chai").expect;
const requester = chai.request(server).keepOpen();

let token;

after(function(){
    requester.close();
})

describe("test login", function(){
    describe("login", function(){
        it("should return auth true, a token and 200", function(){
            return requester.post("/api/login")
            .send({"email": "didier@didier.com", "password": "didier"})
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                expect(res.body.auth).to.be.true
                expect(res.body.token).to.be.not.null
                token = res.body.token
            })
        })
    })
    describe("isAuth", function(){
        it("should return auth true and 200", function(){
            return requester.get("/api/isAuth")
            .set("x-access-token", token)
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                expect(res.body.auth).to.be.true
            })
        })
    })
})