/*
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");
const ClientIdentity = require("fabric-shim").ClientIdentity;
require("date-utils");

class Medical extends Contract {
    patientId = 0;

    async initLedger(ctx) {
        console.info("============= START : Initialize Ledger ===========");
        //     //database lookup

        //   {
        //   "patientName": "String Some name",
        //   "patientId": "String some Id",
        //   "eanabled": true,
        //   "medicalRecord": [
        //     {
        //       "medicalRecordId": "String some Id",
        //       "uploadedBy": "String uploader Id",
        //       "dateUploaded": "String ISO Date",
        //       "medicalRecordData": "String anything",
        //       "consentTo": [
        //         "String some Id or some public Key",
        //         "String some Id or some public Key",
        //         "String some Id or some public Key",
        //         "String some Id or some public Key"
        //       ]
        //     }
        //   ]
        // }
        //
        console.info("============= END : Initialize Ledger ===========");
    }

    /**
     *
     * @param {Context} ctx
     * @param {string} _patientName
     * @dev creating empting record for patient
     */
    async createPatientRecord(ctx, _patientName) {
        //check the role of the current user
        console.log(
            `CHAINCODE: request for creating new record for ${_patientName}`
        );

        try {
            const record = {
                patientName: _patientName,
                patientId: "PA" + this.patientId,
                enabled: true,
                medicalRecord: [],
            };
            await ctx.stub.putState(
                this.patientId + "",
                Buffer.from(JSON.stringify(record))
            );
            this.patientId = this.patientId + 1;
            return { status: "success", value: true };
        } catch (error) {
            return { status: "fail", msg: error };
        }
        // const recordAsBytes = await ctx.stub.getState("PA" + this.patientId);
        // console.log("recordAsBytes", recordAsBytes);
        // if (!recordAsBytes || recordAsBytes.length === 0) {
        //     const record = {
        //         patientName: _patientName,
        //         patientId: "PA" + this.patientId,
        //         enabled: true,
        //         medicalRecord: [],
        //     };
        //     await ctx.stub.putState(
        //         this.patientId,
        //         Buffer.from(JSON.stringify(record))
        //     );
        //     this.patientId = this.patientId + 1;
        //     return { status: "success", value: true };
        // } else {
        //     return {
        //         status: "fail",
        //         msg: `Record for ${_patientName} already exists`,
        //     };
        // }
    }

    //add doctors under consentTo

    /**
     *
     * @param {Context} ctx
     * @param {string} _patientId
     * @param {string} _medicalRecordId
     * @param {string} _consetTo
     * @param {string} _status
    
     */
    async modifyConsent(_patientId, _medicalRecordId, _consetTo, _status) {
        console.log(
            `CHAINCODE: request for modification of consent for ${_patientId} record ${_medicalRecordId}`
        );
        console.log(
            `My input Params: patientId:${_patientId} , medicalRecordId:${_medicalRecordId}, consetTo:${_consetTo},status:${_status}`
        );
        //extracting the caller record
        const recordAsBytes = await ctx.stub.getState(_patientId);
        console.log("recordAsBytes", recordAsBytes);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            return {
                status: "fail",
                msg: `No Patient with id ${_patientId} exists`,
            };
        }

        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        if (_status === true) {
            //adding target into caller's consentTo
            const hasPermission = record.medicalRecord[
                _medicalRecordId
            ].consentTo.filter((doc) => {
                return doc.id === _consetTo;
            });

            if (!hasPermission || hasPermission.length === 0) {
                record.medicalRecord[_medicalRecordId].consentTo.push(
                    _consetTo
                );
            }

            await ctx.stub.putState(
                _patientId,
                Buffer.from(JSON.stringify(record))
            );
        } else {
            const newPermission = record.medicalRecord[
                _medicalRecordId
            ].consentTo.filter((doc) => {
                return doc.id != _consetTo;
            });
            record.medicalRecord[_medicalRecordId].consentTo = newPermission;

            //Add try-catch here later
            await ctx.stub.putState(
                _patientId,
                Buffer.from(JSON.stringify(record))
            );
        }
        return { status: "success", value: true };
    }

    /**
     * @param {Context} ctx
     * @param {string} _patientId
     * @param {string} _medicalRecordObj
     */
    async writePatientMedicalInfo(ctx, _patientId, _medicalRecordObj) {
        console.log(`CHAINCODE: request for adding new data for ${_patientId}`);
        console.log(
            `My input Params: patientId:${_patientId} , medicalRecordObj:${_medicalRecordObj}`
        );
        //extract the patient record
        const {
            _medicalRecordId,
            _uploadedBy,
            _medicalRecordData,
        } = _medicalRecordObj;

        console.log(`Destructed from ${_medicalRecordObj}: \nmedicalRecordId:${_medicalRecordId},
            uploadedBy:${_uploadedBy},
            medicalRecordData:${_medicalRecordData}`);

        //will receive the record in form of bytes
        const recordAsBytes = await ctx.stub.getState(_patientId);
        console.log("recordAsBytes", recordAsBytes);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            return {
                status: "fail",
                msg: `No patient with ${_patientId} exists!`,
            };
        }

        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        const now = new Date();
        const newMedicalRecord = {
            medicalRecordId: _medicalRecordId,
            uploadedBy: _uploadedBy,
            dateUploaded: now.toFormat("YYYY/MM/DD PP HH:MI"),
            medicalRecordData: _medicalRecordData,
            consentTo: [_uploadedBy],
        };

        record.medicalRecord.push(newMedicalRecord);

        try {
            await ctx.stub.putState(
                _patientId,
                Buffer.from(JSON.stringify(record))
            );

            return { status: "success", value: _medicalRecordId };
        } catch (error) {
            return { status: "fail", msg: error };
        }
    }

    /**
     * deleting the
     * @param {Consent} ctx
     * @param {string} _patientId
     */
    async deleteUser(ctx, _patientId) {
        console.log(`CHAINCODE: request for deleteing user ${_patientId}`);
        console.log(`My input Params: patientId:${_patientId}`);
        //extracting the caller record
        const recordAsBytes = await ctx.stub.getState(_patientId);
        console.log("recordAsBytes", recordAsBytes);

        if (!recordAsBytes || recordAsBytes.length === 0) {
            return {
                status: "fail",
                msg: `No patient with ${_patientId} exists!`,
            };
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());
        //updating the consentTo
        record.enabled = false;

        try {
            await ctx.stub.putState(
                _patientId,
                Buffer.from(JSON.stringify(record))
            );
            return { status: "success", value: true };
        } catch (error) {
            return { status: "fail", msg: error };
        }
    }
    /**
     *
     * @param {Context} ctx
     * @param {string} _patientId
     * @param {string} _medicalRecordId
     */
    async getMedicalInfoById(ctx, _patientId, _medicalRecordId) {
        console.log(
            `CHAINCODE: request for getMedicalInfoById for user ${_patientId}`
        );
        console.log(
            `My input Params: _patientId:${_patientId} , _medicalRecordId:${_medicalRecordId}`
        );

        const recordAsBytes = await ctx.stub.getState(_patientId);
        console.log("recordAsBytes", recordAsBytes);

        if (!recordAsBytes || recordAsBytes.length === 0) {
            return {
                status: "fail",
                msg: `No patient with ${_patientId} exists!`,
            };
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());
        if (_medicalRecordId === "all") {
            const medicalRecord = record.medicalRecord;
            return { status: "success", value: JSON.stringify(medicalRecord) };
        } else {
            const medicalRecord = record.medicalRecord[_medicalRecordId];
            return {
                status: "success",
                value: JSON.stringify(medicalRecord),
            };
        }
    }
}

module.exports = Medical;
