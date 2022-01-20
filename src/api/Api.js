import axios from "axios";

const BaseUrl = 'http://localhost:8050';

class Api {
    // Admins
    static getAllAdmins(){
        return axios.get(BaseUrl + '/administrators');
    }

    static getAdmin(adminId) {
        return axios.get(BaseUrl + '/administrators/' + adminId);
    }

    static createAdmin(admin){
        return axios.post(BaseUrl + '/administrators', admin);
    }

    static updateAdmin(admin) {
        return axios.put(BaseUrl + '/administrators', admin);
    }

    static deleteAdmin(adminId) {
        return axios.delete(BaseUrl + "/administrators/" + adminId);
    }

    // Company
    static getAllCompanies() {
        return axios.get(BaseUrl + "/companies");
    }

    static getCompany(companyId) {
        return axios.get(BaseUrl + '/companies/' + companyId);
    }

    static createCompany(company) {
        return axios.post(BaseUrl + "/companies", company);
    }

    static updateCompany(company) {
        return axios.put(BaseUrl + '/companies', company);
    }

    static deleteCompany(companyId) {
        return axios.delete(BaseUrl + "/companies/" + companyId);
    }

    // Data
    static getAllData() {
        return axios.get(BaseUrl + "/data");
    }

    static getData(dataId) {
        return axios.get(BaseUrl + '/data/' + dataId);
    }

    static createData(data) {
        return axios.post(BaseUrl + "/data", data);
    }

    static updateData(data) {
        return axios.put(BaseUrl + '/data', data);
    }

    static deleteData(dataId) {
        return axios.delete(BaseUrl + "/data/" + dataId);
    }

    // Tags
    static getAllTags() {
        return axios.get(BaseUrl + "/tags");
    }

    static getTag(tagId) {
        return axios.get(BaseUrl + '/tags/' + tagId);
    }

    static createTag(tag) {
        return axios.post(BaseUrl + "/tags", tag);
    }

    static updateTag(tag) {
        return axios.put(BaseUrl + '/tags', tag);
    }

    static deleteTag(tagId) {
        return axios.delete(BaseUrl + "/tags/" + tagId);
    }

    // Trackers
    static getAllTrackers() {
        return axios.get(BaseUrl + "/trackers");
    }

    static getTracker(trackerId) {
        return axios.get(BaseUrl + '/trackers/' + trackerId);
    }

    static createTracker(tracker) {
        return axios.post(BaseUrl + "/trackers", tracker);
    }

    static updateTracker(tracker) {
        return axios.put(BaseUrl + '/trackers', tracker);
    }

    static deleteTracker(trackerId) {
        return axios.delete(BaseUrl + "/trackers/" + trackerId);
    }

    // Visits
    static getAllVisits() {
        return axios.get(BaseUrl + "/visits");
    }

    static getVisit(visitId) {
        return axios.get(BaseUrl + '/visits/' + visitId);
    }

    static createVisit(visit) {
        return axios.post(BaseUrl + "/visits", visit);
    }

    static updateVisit(visit) {
        return axios.put(BaseUrl + '/visits', visit);
    }

    static deleteVisit(visitId) {
        return axios.delete(BaseUrl + "/visits/" + visitId);
    }

    // Visitor
    static getAllVisitors() {
        return axios.get(BaseUrl + "/visitors");
    }

    static getVisitor(visitorId) {
        return axios.get(BaseUrl + '/visitors/' + visitorId);
    }

    static createVisitor(visitor) {
        return axios.post(BaseUrl + "/visitors", visitor);
    }

    static updateVisitor(visitor) {
        return axios.put(BaseUrl + '/visitors', visitor);
    }

    static deleteVisitor(visitorId) {
        return axios.delete(BaseUrl + "/visitors/" + visitorId);
    }

    // Visitor Tags
    static getAllVisitorTags() {
        return axios.get(BaseUrl + "/visitor/tags");
    }

    static getVisitorTag(visitortagId) {
        return axios.get(BaseUrl + '/visitor/tags/' + visitortagId);
    }

    static createVisitorTag(visitortag) {
        return axios.post(BaseUrl + "/visitor/tags", visitortag);
    }

    static updateVisitorTag(visitortag) {
        return axios.put(BaseUrl + '/visitor/tags', visitortag);
    }

    static deleteVisitorTag(visitortagId) {
        return axios.delete(BaseUrl + "/visitor/tags/" + visitortagId);
    }
}

export default Api;