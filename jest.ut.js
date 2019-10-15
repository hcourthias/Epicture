module.exports = {
    "rootDir": "./",
    "roots": [
        "<rootDir>/api/__tests__"
    ],
    "testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.js?$",
    "moduleFileExtensions": [
        "js",
    ],
    "collectCoverage": true,
    "coverageReporters": [
        "html",
        "lcov"
    ],
    "preset": "jest-expo"
};