const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");

describe("Charity", function () {
  async function deployCharityFixture() {
    const charityContract = await ethers.getContractFactory("Charity");
    const accounts = await ethers.getSigners();
    const owner = accounts[0];
    const funder = accounts[1];
    const Charity1 = await charityContract.deploy();
    const Charity2 = await charityContract.deploy();

    await Charity1.deployed();
    Charity1.connect(owner.address);
    Charity2.connect(funder.address);
    await Charity1.createCharity("krish", "fund toys", "100000");

    return { Charity1, Charity2, owner, funder };
  }

  describe("create charity", function () {
    it("emits event, id increments, event is added to mapping", async () => {
      const { Charity1, owner } = await loadFixture(deployCharityFixture);

      expect(
        await Charity1.createCharity("vinaya", "fund tech", "100000")
      ).to.emit("charityCreated");
      const id = await Charity1.getCurrentId();
      const returnedCharity = await Charity1.getCharities(
        owner.address,
        id.toString()
      );
      assert.equal(returnedCharity.name, "vinaya");
      assert.equal(id.toString(), "2");
    });
  });

  describe("fund charity", function () {
    it("reverts if owners tries to donate", async () => {
      const { Charity1, owner, funder } = await loadFixture(
        deployCharityFixture
      );

      expect(
        await Charity1.fundCharity(owner.address, "1", {
          value: ethers.utils.parseEther("0.01"),
        })
      ).to.be.reverted;
    });

    it("reverts if no funds given", async () => {
      const { Charity2, owner, funder } = await loadFixture(
        deployCharityFixture
      );

      await Charity2.fundCharity(owner.address, "1");
      const returnedCharity = await Charity2.getCharities(owner.address, "1");
      assert.equal(
        returnedCharity.fundedAmount,
        ethers.utils.parseEther("0.01")
      );
    });

    it("funds charity", async () => {
      const { Charity2, owner, funder } = await loadFixture(
        deployCharityFixture
      );

      await Charity2.fundCharity(owner.address, "1", {
        value: ethers.utils.parseEther("0.01"),
      });

      const returnedCharity = await Charity2.getCharities(owner.address, "1");
      assert.equal(
        returnedCharity.fundedAmount,
        ethers.utils.parseEther("0.01")
      );
    });
  });
});
