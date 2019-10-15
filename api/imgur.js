import { AuthSession } from "expo";
import { AsyncStorage } from 'react-native';
import { api } from '../config/api';

/**
 * imgur API Wrapper
 * @author ImOverlord
 * 
 * @description Wrap Imgur API calls for ease of use
 */

/**
 * user_token
 * @description cached user_token for Imgur
 */
let user_token = null;
let refresh_token = null;
let username = null;

/**
 * imgur
 * @description API Base URL
 */
const BASE_URL = "https://api.imgur.com";

/**
 * loginImgur
 * @description OAuth Imgur Implementation
 */
export function loginImgur() {
    const redirectURL = AuthSession.getRedirectUrl();

    return AuthSession.startAsync({
        authUrl: `${BASE_URL}/oauth2/authorize?client_id=${api.client_id}&response_type=token&redirect_uri=${encodeURIComponent(redirectURL)}`
    })
    .then((result) => {
        user_token = result.params.access_token;
        refresh_token = result.params.refresh_token;
        username = result.params.account_username;
        return saveUserAuth();
    })
    .then(() => {
        getUserPosts().then(() => { console.log("OK") })
    });
}

/**
 * refreshAuthToken
 * @description Refresh User Auth Token
 * @param {Object} userAuth
 */
function refreshAuthToken(userAuth) {
    return fetch(`${BASE_URL}/oauth2/token`, {
        method: 'POST',
        body: generateUrlEncoded({
            grant_type: refresh_token,
            refresh_token: userAuth.refresh_token,
            client_id: api.client_id,
            client_secret: api.client_secret
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        return Promise.resolve();
    });
}

function generateUrlEncoded(data) {
    const form = new URLSearchParams();
    for (const key in data) {
        form.append(key, data[key]);
    }
    return form;
}

function saveUserAuth() {
    const userAuth = {
        user_token,
        refresh_token,
        username
    };
    return AsyncStorage.setItem('userAuth', JSON.stringify(userAuth));
}

/**
 * loginInit
 * @description Init Imgur Api System
 */
export function loginInit() {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("userAuth")
        .then((value) => {
            if (value === null)
                return reject(new Error("No User Auth"));
            const userAuth = JSON.parse(value);
            user_token = userAuth.user_token;
            refresh_token = userAuth.refresh_token;
            username = userAuth.username;
            return refreshAuthToken(userAuth);
        })
        .then((result) => {
            resolve();
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        })
    });
}

/**
 * generateClientRequest
 * @description Generate Request Init Object for Imgur Api Fetch
 * @param {string} method 
 */
function generateClientRequest(method = 'GET') {
    console.log(user_token);
    return {
        method,
        headers: {
            Authorization: `Client-ID ${api.client_id}`
        }
    };
}

/**
 * generateUserRequest
 * @description Generate Request Init Object for Imgur Api Fetch
 * @param {string} method HTTP Method
 */
function generateUserRequest(method = 'GET') {
    return {
        method,
        headers: {
            Authorization: `Bearer ${user_token}`
        }
    };
}

/**
 * getGalleryTop
 * @description Get Gallery Top
 */
export function getGalleryTop() {
    return fetch(`${BASE_URL}/3/gallery/top`, generateClientRequest())
    .then((response) => {
        return response.json();
    });
}

/**
 * getGalleryHot
 * @description Get Gallery Hot
 */
export function getGalleryHot() {
    return fetch(`${BASE_URL}/3/gallery/hot`, generateClientRequest())
    .then((response) => {
        return response.json();
    });
}

/**
 * upvoteImage
 * @description Endpoint to Upvote an Image
 * @param {string} idImage Identifier of the image
 */
export function upvoteImage(idImage) {
    return fetch(``, generateClientRequest('POST'))
    .then((response) => {
        return response.json();
    });
}

/**
 * getUserProfile
 * @description Get User Profile
 * @param {string} clientName Defaults to current usernames
 * @returns Account Model https://api.imgur.com/models/account
 */
export function getUserProfile(clientName = username) {
    return fetch(`${BASE_URL}/3/account/${clientName}`, generateClientRequest())
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        result.data.username = username;
        return Promise.resolve(result.data);
    });
}

/**
 * getUserPosts
 * @description Get User's Posts
 */
export function getUserPosts() {
    return fetch(`${BASE_URL}/3/account/me/images`, generateUserRequest())
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        return Promise.resolve(result.data);
    });
}