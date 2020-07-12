const express = require("express");
const router = express.Router();
const { Gateway, FileSystemWallet } = require("fabric-network");
const path = require("path");
const { truncateSync } = require("fs");

const adminId = "admin";

// Create a new file system based wallet for managing identities.
// Majid NOTE: Below path does not exist yet
const ccpPath = path.resolve(__dirname, "..", "config", "connection-org1.json");
const walletPath = path.join(process.cwd(), "wallet");
const wallet = new FileSystemWallet(walletPath);

/* post createPatiendRecord */
router.post("/register-user", async function (req, res, next) {
  const { patientName } = req.body;

  try {
    //cosnole the wallet path
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(adminId);
    if (!userExists) {
      console.log(`An identity for the user  does not exist in the wallet`);
      res.json({
        status: "failed",
        message: `An identity for the user ${adminId} does not exist in the wallet`,
      });
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // use the identity of user1 from wallet to connect
    await gateway.connect(ccpPath, {
      wallet,
      identity: adminId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("medical");

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
//post medical record
router.post("/add-record", async function (req, res, next) {
  const { patientId, medicalRecord } = req.body;

  try {
    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(adminId);
    if (!userExists) {
      console.log(`An identity for the user  does not exist in the wallet`);
      res.json({
        status: "failed",
        message: `An identity for the user ${adminId} does not exist in the wallet`,
      });
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // use the identity of user1 from wallet to connect
    await gateway.connect(ccpPath, {
      wallet,
      identity: adminId,
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
    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(adminId);
    if (!userExists) {
      console.log(`An identity for the user  does not exist in the wallet`);
      res.json({
        status: "failed",
        message: `An identity for the user ${adminId} does not exist in the wallet`,
      });
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // use the identity of user1 from wallet to connect
    await gateway.connect(ccpPath, {
      wallet,
      identity: adminId,
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
    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(adminId);
    if (!userExists) {
      console.log(`An identity for the user  does not exist in the wallet`);
      res.json({
        status: "failed",
        message: `An identity for the user ${adminId} does not exist in the wallet`,
      });
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // use the identity of user1 from wallet to connect
    await gateway.connect(ccpPath, {
      wallet,
      identity: adminId,
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
    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(adminId);
    if (!userExists) {
      console.log(`An identity for the user  does not exist in the wallet`);
      res.json({
        status: "failed",
        message: `An identity for the user ${adminId} does not exist in the wallet`,
      });
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // use the identity of user1 from wallet to connect
    await gateway.connect(ccpPath, {
      wallet,
      identity: adminId,
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
