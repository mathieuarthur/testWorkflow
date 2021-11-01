const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = require("chai").expect;
const requester = chai.request(server).keepOpen();

after(function(){
    requester.close();
})

describe("test workingtime", function(){
    describe("create workingtime", function(){
        it("should return state true and 200", function(){
            return requester.post("/api/time/43")
            .send({"start": "2021-01-01 15:30:00", "end": "2021-01-01 08:30:00"})
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                expect(res.body.state).to.be.true
            })
        })
    })
    describe("get workingtime by id", function(){
        it("should return all workingtime by id and 200", function(){
            return requester.get("/api/time/43")
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.a("array")
                expect(res.body.state).to.be.true
            })
        })
    })
    describe("update workingtime", function(){
        it("should return 200 and state true", function(){
            return requester.put("/api/time/43")
            .send({"start":"2020-01-01T14:30:00.000Z"})
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                expect(res.body.state).to.be.true;
            })
        })
    })
})