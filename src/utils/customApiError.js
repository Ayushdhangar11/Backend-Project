/* Custom error class to handle errors in a standardized way
- This class extends the built-in Error class and adds additional properties such as statusCode and success to provide more context about the error.
- these make our error handling more consistent and easier to manage across the application.
*/
class customApiError extends Error {
    constructor(
        message = "Something went wrong",
        statusCode = 500,
        success = false,
        errors = [],
        stack = "" // The stack trace is typically generated automatically when an error is thrown, but we can also allow it to be passed in as an argument for more control over the error's stack trace.
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null; //  property can be used to store any additional data related to the error, such as validation errors or other relevant information that can help in debugging or providing more context about the error.
        this.success = success;
        this.errors = errors;
        this.stack = stack;

        //production grade uses 
        if(stack)
        {
            this.stack = stack; //batata hai ki error kaha se aaya hai, isse humko pata chal jata hai ki errorkis line pe hua hai aur kis file me hua hai.
        }else{
            Error.captureStackTrace(this, this.constructor); //ye method error ke stack trace ko capture karta hai aur usse error object ke stack property me assign karta hai. Isse humko pata chal jata hai ki error kaha se aaya hai, isse humko pata chal jata hai ki error kis line pe hua hai aur kis file me hua hai.
        }
    }
} 



export { customApiError } ;