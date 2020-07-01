/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract, Context, Context } = require("fabric-contract-api");
const ClientIdentity = require("fabric-shim").ClientIdentity;
require("date-utils");

class Medical extends Contract {
    async initLedger(ctx) {
        console.info("============= START : Initialize Ledger ===========");
        //     //database lookup

        //     const record = {
        //         "patientId": "1",
        //         "patientName": "patient1",
        //         "consentList": ['doc1','doc2'],
        //         "medicalRecord": [{
        //             'recordId':'1',
        //             'doctorName': 'doc1',
        //             'date': 'currentDate',
        //             'information': 'cold'
        //         }]

        //     }
        //
        console.info("============= END : Initialize Ledger ===========");
    }

    /**
     *
     * @param {Context} ctx
     * @dev extracting the CA ID
     */
    getCallerId(ctx) {
        let cid = new ClientIdentity(ctx.stub);
        const idString = cid.getID(); //'x509'
        console.info("getCallerId:", idString);
        const idParams = idString.toString().split("::");
        return idParams[1].split("CN=")[1];
    }
    /**
     *
     * @param {Context} ctx
     * @dev extracting the roles
     */
    getRole(ctx) {
        let cid = new ClientIdentity(ctx.stub);
        return cid.getAttributeValue("role");
    }

    /**
     *
     * @param {Context} ctx
     * @param {string} patientName
     * @dev creating empting record for patient
     */
    async createPatientRecord(ctx, patientName) {
        //check the role of the current user
        let cid = new ClientIdentity(ctx.stub);
        if (!cid.getAttributeValue("role", "patient")) {
            throw new Error("Only patient is allowed");
        }
        const record = {
            patientName: patientName,
            consentList: [],
            medicalRecord: [],
        };
        const patientId = this.getCallerId(ctx);
        await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(record)));
        return true;
    }
    /**
     *
     * @param {Context} ctx
     * @param {string} doctorName
     * @dev creating an empty record for doctor
     */
    async createDoctorRecord(ctx, doctorName) {
        //check the role of the current user
        let cid = new ClientIdentity(ctx.stub);
        if (!cid.getAttributeValue("role", "doctor")) {
            throw new Error("Only doctor is allowed");
        }
        const record = {
            doctorName: doctorName,
            consentList: [],
        };
        const doctorId = this.getCallerId(ctx);
        await ctx.stub.putState(doctorId, Buffer.from(JSON.stringify(record)));
        return true;
    }
    //patient extracting own medical info
    async getMedicalInfo(ctx) {
        //getting current user id
        const caller = this.getCallerId(ctx);

        const recordAsBytes = await ctx.stub.getState(caller);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${caller} does not exist`);
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        return JSON.stringify(record);
    }
    //get medical infor using patientId
    async getMedicalInfoByPatientId(ctx, patientId) {
        const caller = this.getCallerId(ctx);

        const recordAsBytes = await ctx.stub.getState(caller);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${caller} does not exist`);
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        //check for permission
        const permission = record.consentList.filter((doc) => {
            return doc.id == caller;
        });
        if (!permission && permission.length === 0) {
            throw new Error(`${caller} is not allowed`);
        }

        return JSON.stringify(record);
    }
    //get all doctore by role
    async getDoctorsList(ctx) {
        const caller = this.getCallerId(ctx);
        //checking for role-> only patient can see the doctor list
        let cid = new ClientIdentity(ctx.stub);
        if (!cid.assertAttributeValue("role", "patient")) {
            throw new Error(`Only patients are allowed`);
        }

        const recordAsBytes = await ctx.stub.getState(caller);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${caller} does not exist`);
        }

        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        //filtering record for doctors
        const doctors = record.consentList.filter((doc) => {
            return doc.role == "doctor";
        });
        return JSON.stringify(doctors);
    }
    //extract all consentList
    async getConsentList(ctx) {
        console.info("getConsentList", ctx);
        const caller = this.getCallerId(ctx);

        const recordAsBytes = await ctx.stub.getState(caller);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${caller} does not exist`);
        }

        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        return JSON.stringify(record.consentList);
    }
    //add doctors under consentlist
    /**
     *
     * @param {Context} ctx
     * @param {string} id of the target
     * @param {string} role of the target
     */
    async providingConsent(ctx, id, role) {
        //extracting the id and role of function caller
        const callerId = this.getCallerId(ctx);
        const callerRole = this.getRole(ctx);

        //extracting the caller record
        const recordAsBytes = await ctx.stub.getState(callerId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${callerId} does not exist`);
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        //extracting the consentList of the target->assumed as doctor
        const targetConsentListAsBytes = await ctx.stub.getState(id);
        if (
            !targetConsentListAsBytes ||
            targetConsentListAsBytes.length === 0
        ) {
            throw new Error(`${id} does not exist`);
        }
        //converting into string
        const targetRecord = JSON.parse(targetConsentListAsBytes.toString());

        //adding target into caller's consentList
        const permission = record.consentList.filter((doc) => {
            return doc.id === id;
        });
        if (!permission || permission.length === 0) {
            record.consentList.push({ id: id, role: role });
        }

        const targetPermission = targetRecord.consentList.filter((user) => {
            return user.id === id;
        });
        if (!targetPermission || targetPermission.length === 0) {
            targetRecord.consentList.push({ id: callerId, role: callerRole });
        }

        await ctx.stub.putState(callerId, Buffer.from(JSON.stringify(record)));
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(targetRecord)));
        return true;
    }
    /**
     * @param {Context} ctx
     * @param {string} patientId
     * @param {string} medicalInfo
     */
    async writePatientMedicalInfo(ctx, patientId, medicalInfo) {
        //getting the id of the caller-> which should be doctor
        let caller = this.getCallerId(ctx);
        //check the role of current user
        let cid = new ClientIdentity(ctx.stub);
        if (!cid.getAttributeValue("role", "doctor")) {
            throw new Error("Only doctor is allowed");
        }

        //extract the patient record
        //will receive the record in form of bytes
        const recordAsBytes = await ctx.stub.getState(patientId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${patientId} does not exist`);
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        //checking for permission
        const permission = record.consentList.filter((doc) => {
            return doc.id == caller;
        });

        if (!permission || permission.length === 0) {
            throw new Error(`${caller} is not allowed to modify`);
        }

        const now = new Date();
        const medicalRecord = {
            doctorName: caller,
            date: now.toFormat("YYYY/MM/DD PP HH:MI"),
            information: medicalInfo,
        };
        record.medicalRecord.push(medicalRecord);
        await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(record)));

        return true;
    }

    /**
     * deleting the
     * @param {Consent} ctx
     * @param {string} id
     */
    async deleteConsent(ctx, id) {
        //extracting the id and role of function caller
        const callerId = this.getCallerId(ctx);

        //extracting the caller record
        const recordAsBytes = await ctx.stub.getState(callerId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${callerId} does not exist`);
        }
        //converting into string
        const record = JSON.parse(recordAsBytes.toString());

        //extracting the consentList of the target->assumed as doctor
        const targetConsentListAsBytes = await ctx.stub.getState(id);
        if (
            !targetConsentListAsBytes ||
            targetConsentListAsBytes.length === 0
        ) {
            throw new Error(`${id} does not exist`);
        }
        //converting into string
        const targetRecord = JSON.parse(targetConsentListAsBytes.toString());

        //deleting target into caller's consentList
        const permission = record.consentList.filter((doc) => {
            return doc.id != id;
        });
        //updating the consentList
        record.consentList = permission;

        const targetPermission = targetRecord.consentList.filter((user) => {
            return user.id === id;
        });
        //updating the consentList
        targetRecord.consentList = targetPermission;

        await ctx.stub.putState(callerId, Buffer.from(JSON.stringify(record)));
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(targetRecord)));
        return true;
    }
}

module.exports = Medical;
