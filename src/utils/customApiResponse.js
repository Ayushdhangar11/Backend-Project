class customApiResponse {
    constructor(statusCode , success = true, message = "Request successful", data = null) {
        this.statusCode = statusCode < 400;
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

export { customApiResponse } ;

//always use this class to send res to api req
// ye class ek custom response structure define karta hai jo hum apne API responses me use kar sakte hain. Isse hum apne API responses ko ek consistent format me organize kar sakte hain, jisme statusCode, success, message, aur data properties hoti hain. Isse hum apne API responses ko zyada structured aur informative bana sakte hain, jisse clients ko samajhne me asani hoti hai ki request successful thi ya nahi, aur agar successful thi to kya data return hua hai.       