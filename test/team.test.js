const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = require("chai").expect;
const requester = chai.request(server).keepOpen();

let teamID;

after(function(){
    requester.close();
})

describe("test team", function(){
    describe("get all", function(){
        it("should return all teams and 200", function(){
            return requester.get("/api/teams")
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
            })
        })
    })
    describe("create team", function(){
        it("should return a team after creation and 200", function(){
            return requester.post("/api/teams/")
            .send({"name": "didier", "supervisor": {"name": "arnaud", "id": 43}, "member": [43]})
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object")
                expect(res.body.state).to.be.true
                expect(res.body.data.name).is.not.null
                expect(res.body.data.supervisor).is.not.null
                expect(res.body.data.supervisor.name).is.not.null
                expect(res.body.data.supervisor.id).is.not.null
                expect(res.body.data.teamId).is.not.null
                teamID = res.body.data.teamId;
            })
        })
    })
    describe("get team by id", function(){
        it("should return a team by id and 200", function(){
            return requester.get("/api/teams/" + teamID)
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                expect(res.body.data.name).is.not.null
                expect(res.body.data.supervisor).is.not.null
            })
        })
    })
    describe("delete team", function(){
        it("should return 200 and state true", function(){
            return requester.del("/api/teams/" + teamID)
            .then(function(res){
                console.log(res.status);
                expect(res).to.have.status(200);
                expect(res.body.state).to.be.true;
            })
        })
    })
})
