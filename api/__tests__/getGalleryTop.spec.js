import { getGalleryHot } from '../imgur';
import { config, } from './config';
const fetch = require("node-fetch-polyfill");

describe("getGalleryHot", () => {

    let user_token = null;

    beforeAll((done) => {
        fetch(`https://api.imgur.com/oauth2/token?grant_type=refresh_token&refresh_token=${config.refresh_token}&client_id=${config.client_id}&client_secret=${config.client_secret}`, {
            method: 'POST'
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
            done();
        });
    });

    it("Succes", (done) => {
        expect(true).toBeTruthy();
        done();
    });

});