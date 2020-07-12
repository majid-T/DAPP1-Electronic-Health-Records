const express = require("express");
const router = express.Router();
const { Gateway, FileSystemWallet, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

const adminId = "admin";

// Create a new file system based wallet for managing identities.
// Majid NOTE: Below path does not exist yet

/* post createPatiendRecord */
router.post("/register-user", async function (req, res, next) {
  const { patientName } = req.body;

  try {
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get("appUser");
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log('gateway', gateway);
    await gateway.connect(ccp, {
      wallet,
      identity: "appUser",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");
    // console.log('network',network);
    // Get the contract from the network.
    const contract = network.getContract("medical");
    //  console.log('contract',contract.chaincodeId);

    // Evaluate the specified transaction.

    const result = await contract.submitTransaction(
      "createPatientRecord",
      patientName
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    await gateway.disconnect();
    res.json({
      status: "success",
      message: `create patient successful`,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: `Failed to create a user ${error}`,
    });
  }
});
//post medical recordR
router.post("/add-record", async function (req, res, next) {
  const { patientId, medicalRecord } = req.body;

  try {
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get("appUser");
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log('gateway', gateway);
    await gateway.connect(ccp, {
      wallet,
      identity: "appUser",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("medical");

    // Evaluate the specified transaction.

    const result = await contract.submitTransaction(
      "writePatientMedicalInfo",
      patientId,
      medicalRecord
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    await gateway.disconnect();
    res.json({
      status: "success",
      message: `medical record updated successfully`,
      data: result.medicalRecordId,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: `Failed to submit transaction: ${error}`,
    });
  }
});

//post consentTo
router.post("/modify-consent", async function (req, res, next) {
  const { patientId, medicalRecordId, consentTo, flag } = req.body;

  try {
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get("appUser");
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log('gateway', gateway);
    await gateway.connect(ccp, {
      wallet,
      identity: "appUser",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("medical");

    // Evaluate the specified transaction.

    const result = await contract.submitTransaction(
      "modifyConsent",
      patientId,
      medicalRecordId,
      consentTo,
      flag
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    await gateway.disconnect();
    res.json({
      status: "success",
      message: `Medical record consent updated successfully`,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: `Failed to modify consent: ${error}`,
    });
  }
});

//get medical record
router.get("/get-medical-record", async function (req, res, next) {
  const { patientId, medicalRecordId } = req.body;

  try {
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get("appUser");
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log('gateway', gateway);
    await gateway.connect(ccp, {
      wallet,
      identity: "appUser",
      discovery: { enabled: true, asLocalhost: true },
    });
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("medical");

    // Evaluate the specified transaction.

    const result = await contract.evaluateTransaction(
      "getMedicalInfoById",
      patientId,
      medicalRecordId
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    await gateway.disconnect();
    res.json({
      status: "success",
      message: `Medical record query success`,
      data: result.toString(),
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: `Failed to get medical record: ${error}`,
    });
  }
});

//delete medical record
router.delete("/delete-user", async function (req, res, next) {
  const { patientId } = req.body;

  try {
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get("appUser");
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log('gateway', gateway);
    await gateway.connect(ccp, {
      wallet,
      identity: "appUser",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("medical");

    // Evaluate the specified transaction.

    const result = await contract.submitTransaction("deleteUser", patientId);
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    await gateway.disconnect();
    res.json({
      status: "success",
      message: `medical record updated successfully`,
      data: result.toString(),
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: `Failed to submit transaction: ${error}`,
    });
  }
});
module.exports = router;
