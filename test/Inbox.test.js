// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  //Use one of those accounts to deploy the contracts
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  //address of deployed contract
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setmessage("Bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Bye");
  });
});
/*
class Car {
  park() {
    return "stopped";
  }
  drive() {
    return "vroom";
  }
}
let car;
beforeEach(() => {
  car = new Car();
});

describe("Car is in testing process", () => {
  it("can park", () => {
    assert.equal(car.park(), "stopped");
  });

  it("car can drive", () => {
    assert.equal(car.drive(), "vroom");
  });
});
*/
//https://rinkeby.infura.io/v3/ce775799453446ee8bdacba907455e97
