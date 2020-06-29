# DAPP1-Electronic-Health-Records

## Secure Management and Sharing of Electronic Health Records

### Students:

- Aditi Sharma
- Neeraj Bhasin
- Majid Shockoohi
- Malhar Dave
- Mariam Delos Reyes
- Taj Sivers

DAPP Using Blockchain and Hyperledger Fabric to track Electronic Health Records consent given by patient to different users.

This solution will use Hyperledger Fabric Blockchain to be as a gateway to provide information on consent given by patient to various section of health care system to access patient medical records.
Actual records are not being stored and only id of each record will be stored on-chain alongside information on who may or may not access this information.
Functionalities will be exposed through REST Api , therefore bringing potential of all kind of systems, apps and architecture to be build on top of the system.

## Modeling Ver:0.1.0

### Assets

#### Pateint Medical Record

```json
{
  "patientName": "String Some name",
  "patientId": "String some Id",
  "eanabled": true,
  "medicalRecord": [
    {
      "medicalRecordId": "String some Id",
      "uploadedBy": "String uploader Id",
      "dateUploaded": "String ISO Date",
      "medicalRecordData": "String anything",
      "consentTo": [
        "String some Id or some public Key",
        "String some Id or some public Key",
        "String some Id or some public Key",
        "String some Id or some public Key"
      ]
    }
  ]
}
```

### Contracts

=== MedicalRecord ===

| Function       | Input                              | output                      | Description                |
| -------------- | ---------------------------------- | --------------------------- | -------------------------- |
| register user  | patientName,patientId              | bool (success registry)     | Create new patient record  |
| add data       | patientId,medicalRecObj            | string (medicalRecordId)    | add medical record data    |
| modify consent | patientId,medicalRecordId,consetTo | bool (success modification) | add/remove consent to user |
| read data      | patientId, medicalRecordId         | string(medical record data) | read mecical record        |
| delete user    | patientId                          | bool (delete registry)      | disable user               |

=== exposed REST API endpoints details:

| TBD | TBD | TBD | TBD |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |
| TBD | TBD | TBD | TBD |

### Transactions

Checked functions will change the state of blockchain and will cause a transaction on blockchain

- [x] register user
- [x] add data
- [x] modify consent
- [ ] read data
- [x] delete user

### Business Networks - Blockchain architecture

![Blockchain Architecture](./documents/images/arch.jpeg)

### Participants

System participates in phase I:

- Patients
- Health data providers (Doctors,Hospitals, Health centers)
- 3rd Party data viewers (Family members, Government institutions, Research centers)

## System overview Ver:0.1.0

### States

![State Diagram](./documents/images/stateD.png)

| State                              | Description of state                                                      |
| ---------------------------------- | ------------------------------------------------------------------------- |
| No Patient Records                 | State where no user has been created hence no records exists.             |
| Patient records                    | After user registry or modification of data bew record will exists        |
| Modifying consent for user         | User will modify consent given for single record changing state           |
| Adding new data to patient records | New data on patient will be added to the record changing state to new one |
| Deleting user from system          | Deleting user will disable user in DB and disable modification on records |

### Transitions

#### Transition design

| Transition              | State From -> To                                      | Description |
| ----------------------- | ----------------------------------------------------- | ----------- |
| register user           | No Patient Records -> Patient Records                 | ..          |
| add data                | Patient records -> Adding new data to patient records | ..          |
| add data to BC & DB     | Adding new data to patient records -> Patient records | ..          |
| modify consent          | Patient records -> Modifying consent for user         | ..          |
| modify in BC & DB       | Modifying consent for user -> Patient Records         | ..          |
| delete user             | Patient records -> deleting user from system          | ..          |
| disable user in BC & DB | deleting user from system -> No Patient Records       | ..          |

#### Transition implementation - Psuedo-Code

| Transition              | Function code & params                            | Notes |
| ----------------------- | ------------------------------------------------- | ----- |
| register user           | addUser(patientName,patientId)                    | ..    |
| add data                | addMedRecord(patientId,medicalRecObj)             | ..    |
| add data to BC & DB     | await ctx.stub.putState(patientId, medicalRecObj) | ..    |
| modify consent          | modifyConsent(patientId,medicalRecordId,consetTo) | ..    |
| modify in BC & DB       | await ctx.stub.putState(patientId, modObj)        | ..    |
| delete user             | deleteUser(patientId)                             | ..    |
| disable user in BC & DB | await ctx.stub.putState(patientId, modObj)        | ..    |

### Functions

| Function  | Description                           |
| --------- | ------------------------------------- |
| read data | to Read some state of patient records |

#### Functions implementation - Psuedo-Code

| Function                                      | Function code & params                        | Notes        |
| --------------------------------------------- | --------------------------------------------- | ------------ |
| check for consent for user,patient and record | haveConsent(patientId,userId,medicalRecordId) | returns bool |

### Roles

| Role             | Description                                                               | access and capabilities             |
| ---------------- | ------------------------------------------------------------------------- | ----------------------------------- |
| Patient          | Patient who is an individual in system                                    | register - provide consent to users |
| Health Entity    | Any entity on health system who can upload data or may need acces to data | upload data -read data              |
| 3rd Party viewer | Any entity who may need only read access to data                          | read data                           |
| System Admin     | Will handle system internal states                                        | will modify BC & BD and create ids  |

| Transition & Functions  | Called by     | Description |
| ----------------------- | ------------- | ----------- |
| register user           | Patient       | ..          |
| add data                | Health Entity | ..          |
| add data to BC & DB     | System Admin  | ..          |
| modify consent          | Patient       | ..          |
| modify in BC & DB       | System Admin  | ..          |
| delete user             | Patient       | ..          |
| disable user in BC & DB | System Admin  | ..          |
| F:read data             | all Users     | ..          |

## Notes on running APP:

- Fronetend code is in frontend folder with instruction on how to run in separate READ.ME file. [FRONTEND](./frontend)
- Backend code including chaincode is in backend folder with instruction on how to run in separate READ.ME file [BACKEND](./backend)

### HOW TO RUN PROJECT:

TBD
