// This utility function is used to handle asynchronous operations in Express routes.
//higher order function accepts an asynchronous function as an argument and returns a new function that wraps the original function in a try-catch block.

import { promises } from "dns"
import { Promise } from "mongoose"


const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next))
            .catch((error) => {
                next({
                    status: error.status || 500,
                    message: error.message || "Internal Server Error",
                    success: false
                });
            });
    };
};




/* using try catch 
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next); //await the execution of the original function
    } catch (error) {
        res.status(500).json({ success: false, message: error.message }); //if an error occurs, catch it and send a response with a 500 status code and the error message in JSON format.
    }

};
*/



/*
const asyncHandler = (fn) => {} //taking fucntion as arg
const asyncHandler = (fn) =>{ () => {}} //pass function as arg to next funct
the above line same as below
const asyncHandler = (fn) => async() => {}
*/

