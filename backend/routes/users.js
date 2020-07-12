const express = require("express");
const router = express.Router();
const {
  FileSystemWallet,
  Gateway,
  X509WalletMixin,
} = require("fabric-network");
const path = require("path");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/enrollPatient", async function (req, res, next) {
  let { userId } = req.body;

  try {
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "config",
      "connection-org1.json"
    );
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists(userId);
    if (!userExists) {
      console.log(`An identity for the user  does not exist in the wallet`);
      console.log("Run the registerUser.js application before retrying");
      res.json({
        result: "failed",
        message: `An identity for the user ${userId} does not exist in the wallet`,
      });
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // use the identity of user1 from wallet to connect
    await gateway.connect(ccpPath, {
      wallet,
      identity: userId,
      discovery: { enabled: true, asLocalhost: true },
    });

    //get the CA client object from gateway for interacting with the CA
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register(
      {
        affiliation: "org1.department1",
        enrollmentID: userId,
        role: "patient",
        attrs: [{ name: "role", value: "patient", ecert: true }],
      },
      adminIdentity
    );

    const enrollment = await ca.enroll({
      enrollmentID: userId,
      enrollmentSecret: secret,
    });

    const userIdentity = X509WalletMixin.createIdentity(
      "Org1MSP",
      enrollment.certificate,
      enrollment.key.toBytes()
    );

    await wallet.import(userId, userIdentity);
    console.log(
      'Successfully registered and enrolled admin user "user2" and imported it into the wallet'
    );
    res.json({
      result: "ok",
      message: `Successfully registered and enrolled admin user ${userId} and imported it into the wallet`,
    });
  } catch (error) {
    console.error(`Failed to register user "user2": ${error}`);
    res.json({
      result: "failed",
      message: `Failed to register user ${userId}: ${error}`,
    });
  }
});

module.exports = router;
