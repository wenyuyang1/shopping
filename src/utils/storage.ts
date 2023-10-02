const KEY = 'DEMO_SHOPPING_LOGIN_FORM'
const HISTORY_KEY = 'DEMO_KEY_GOODSSEARCH_HISTORY'
interface UserInfo {
    token: string,
    userId: string
}
export function GET_TOKEN() {
    const keyDefault = JSON.stringify({
        token: '',
        userId: ''
    })
    return JSON.parse(localStorage.getItem(KEY) || keyDefault)
}


export function SET_TOKEN(info: UserInfo) {
    localStorage.setItem(KEY, JSON.stringify(info))
}


export function REMOVE_TOKEN() {
    localStorage.removeItem(KEY)
}

export function GET_SEARCHGOODS_HISTORY() {
    const keyDefault = JSON.stringify([])
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || keyDefault)
}

export function SET_SEARCHGOODS_HISTORY(info: any) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(info))
}