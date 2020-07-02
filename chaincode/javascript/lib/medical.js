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
    patientId = "0";
    medicalId = "0";

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
     * @param {string} patientName
     * @dev creating empting record for patient
     */
    async createPatientRecord(ctx, patientName) {
        //check the role of the current user

        const record = {
            patientName: patientName,
            patientId: this.patientId,
            enabled: true,
            medicalRecord: [
                {
                    medicalRecordId: this.medicalId,
                    uploadedBy: "",
                    dateUploaded: "",
                    medicalRecordData: "",
                    consentTo: [],
                },
            ],
        };
        await ctx.stub.putState(
            this.patientId,
            Buffer.from(JSON.stringify(record))
        );
        this.patientId = this.patientId + 1;
        this.medicalId = this.medicalId + 1;
        return true;
    }

    //add doctors under consentTo

    /**
     *
     * @param {Context} ctx
     * @param {string} patientRecordId
     * @param {string} targetName
     * @param {string} medicalRecordId
    
     */
    async providingConsent(ctx, patientRecordId, targetName, medicalRecordId) {
        //extracting the caller record
        const recordAsBytes = await ctx.stub.getState(patientRecordId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${patientRecordId} does not exist`);
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        //adding target into caller's consentTo
        const permission = record.medicalRecord[
            medicalRecordId
        ].consentTo.filter((doc) => {
            return doc.id === targetName;
        });
        if (!permission || permission.length === 0) {
            record.medicalRecord[medicalRecordId].consentTo.push(targetName);
        }

        await ctx.stub.putState(
            patientRecordId,
            Buffer.from(JSON.stringify(record))
        );
        return true;
    }
    /**
     *
     * @param {Context} ctx
     * @param {string} patientRecordId
     * @param {string} targetName
     * @param {string} medicalRecordId
    
     */
    async removingConsent(ctx, patientRecordId, targetName, medicalRecordId) {
        //extracting the caller record
        const recordAsBytes = await ctx.stub.getState(patientRecordId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${patientRecordId} does not exist`);
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        //adding target into caller's consentTo
        const permission = record.medicalRecord[
            medicalRecordId
        ].consentTo.filter((doc) => {
            return doc.id != targetName;
        });
        record.medicalRecord[medicalRecordId].consentTo = permission;

        await ctx.stub.putState(
            patientRecordId,
            Buffer.from(JSON.stringify(record))
        );
        return true;
    }
    /**
     * @param {Context} ctx
     * @param {string} patientId
     * @param {string} medicalInfo
     */
    async writePatientMedicalInfo(ctx, patientId, medicalRecordObj) {
        //extract the patient record
        //will receive the record in form of bytes
        const {
            medicalRecordId,
            uploadedBy,
            medicalRecordData,
            consentTo,
        } = medicalRecordObj;
        const recordAsBytes = await ctx.stub.getState(patientId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${patientId} does not exist`);
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        //checking for permission
        // const permission = record.medicalRecord[
        //     medicalRecordId
        // ].consentTo.filter((doc) => {
        //     return doc.id === targetId;
        // });

        // if (!permission || permission.length === 0) {
        //     throw new Error(`${caller} is not allowed to modify`);
        // }

        const now = new Date();
        // const newMedicalRecord = record.medicalRecord[medicalRecordId];
        record.medicalRecord[medicalRecordId].uploadedBy = uploadedBy;
        record.medicalRecord[medicalRecordId].dateUploaded = now.toFormat(
            "YYYY/MM/DD PP HH:MI"
        );
        record.medicalRecord[
            medicalRecordId
        ].medicalRecordData = medicalRecordData;

        await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(record)));

        return true;
    }

    /**
     * deleting the
     * @param {Consent} ctx
     * @param {string} id
     */
    async deleteUser(ctx, id) {
        //extracting the caller record
        const recordAsBytes = await ctx.stub.getState(id);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());
        //updating the consentTo
        record.enabled = false;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(record)));
        return true;
    }
    /**
     *
     * @param {Context} ctx
     * @param {string} patientId
     * @param {string} medicalRecordId
     */
    async getMedicalInfoById(ctx, patientId, medicalRecordId) {
        const recordAsBytes = await ctx.stub.getState(patientId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${caller} does not exist`);
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());
        const medicalRecord = record.medicalRecord[medicalRecordId];
        return JSON.stringify(medicalRecord);
    }
}

module.exports = Medical;
