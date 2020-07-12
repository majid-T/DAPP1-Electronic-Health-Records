var createError = require("http-errors");
var express = require("express");
var path = require("path");
const fs = require("fs");
const { Gateway, Wallets } = require("fabric-network");
const errResponse = {
  status: "failed",
  message: `Failed to submit request`,
};
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const adminId = "admin";

const getMedicalContract = async () => {
  const ccpPath = path.resolve(
    __dirname,
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
  const identity = await wallet.get(adminId);
  if (!identity) {
    console.log(`ERROR: Couldnt find the identity ${adminId}`);
  }
  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: "admin",
    discovery: { enabled: true, asLocalhost: true },
  });

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("mychannel");
  // Get the contract from the network.
  const contract = network.getContract("medical");
  // Disconnect from the gateway.
  await gateway.disconnect();
  return contract;
};

app.get("/test", async function (req, res, next) {
  const { reqId } = req.query;
  try {
    const contract = await getMedicalContract();
    res.json({
      status: "success",
      message: `API working`,
      data: { test: contract.chaincodeId },
    });
  } catch (error) {
    console.log(error);
    res.json(errResponse);
  }
});

app.post("/register-user", async function (req, res, next) {
  const { patientName } = req.body;

  try {
    //get contract instance
    const contract = await getMedicalContract();

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

app.post("/add-record", async function (req, res, next) {
  res.json({
    status: "success",
    message: `medical record updated successfully`,
    medicalRecordId: req.id,
  });
});

app.post("/modify-consent", async function (req, res, next) {
  const { patientId, medicalRecordId, consetTo, identity, status } = req.body;

  res.json({
    status: "success",
    message: `Consent modification for ${patientId}:${medicalRecordId} for user ${consetTo},Status=${status}`,
  });
});

app.get("/get-medical-record", async function (req, res, next) {
  const { name, recId, userId } = req.query;
  console.log(name, recId, userId);

  if (recId === "all") {
    res.json({
      status: "success",
      message: `medical record updated successfully`,
      data: records,
    });
  } else {
    let result = {};
    result = records.find((x) => x.medicalRecordId === recId);
    res.json({
      status: "success",
      message: `Data found`,
      data: result,
    });
  }
});

app.delete("/delete-user", async function (req, res, next) {
  console.log(req);
  res.json({
    status: "success",
    message: `medical record updated successfully`,
    medicalRecordId: result.medicalRecordId,
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(1000);
console.log("server running on 1000");
