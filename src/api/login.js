import request from '@/utils/request.js'
export function getCaptcha() {
    return request.get("/captcha/image");
}
export function getSMS(captchaCode,captchaKey, mobile) {
    return request.post("/captcha/sendSmsCaptcha", {
        form: {
            captchaCode,
            captchaKey,
            mobile
        }
    })
}
export function getLogin(smsCode, mobile) { 
    return request.post("/passport/login", {
        form: {
            smsCode,
            mobile,
            isParty: false,
            partyData:  {}
        }
    });
}

export function getUserInfo() { 
    return request.get("/user/info");
}