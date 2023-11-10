import { logger } from "../logger"

type WorkerCommandType = 'READY'|'encrypt_TestPasscode'|'getCONETBalance'|'getRegiestNodes'|
'encrypt_createPasscode'|'encrypt_lock'|'encrypt_deletePasscode'|'storePreferences'|
'newProfile'|'storeProfile'|'invitation'|'WORKER_MESSAGE'|
'isAddress'|'getFaucet'|'syncAsset'|'sendAsset'|'getUSDCPrice'|
'buyUSDC'|'mintCoNETCash'|'getSINodes'|'getRecipientCoNETCashAddress'|
'getUserProfile'|'sendMessage'|'setRegion'


type WorkerCommandErrorType = 'NOT_READY'|'INVALID_DATA'|
'NO_UUID'|'INVALID_COMMAND'|'OPENPGP_RUNNING_ERROR'|
'PouchDB_ERROR'|'GENERATE_PASSCODE_ERROR'|'FAILURE'|'COUNTDOWN'

export interface WorkerCommand {
    cmd: WorkerCommandType
    data?: any
    uuid: string
    err?: WorkerCommandErrorType
}
export type WorkerCallStatus = 'SUCCESS' | 'NOT_READY' | 'UNKNOWN_COMMAND' |
'TIME_OUT' | 'SYSTEM_ERROR'

type StartWorkerResolveForAPI = [WorkerCallStatus, any []]

const postUrl: (url: string, data: string) => Promise<null|boolean> = (url, data) => {
    return new Promise( async (resolve, reject )=> {
        const timeout = 1000
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        let status:null|boolean  = null
        await fetch (url, {
            method: "POST",
            headers: {
                Accept: "text/event-stream",
                "Content-Type": 'application/json;charset=UTF-8'
            },
            body: data,
            cache: 'no-store',
            referrerPolicy: 'no-referrer',
            signal: controller.signal
        })
        .then ( async res => {
            
            if (!res.ok) {
                
                if (res.status === 403) {
                    return null
                }
                console.log (`postUrl return resolve (false) res.status = [${res.status}]`)
                return false
            }
            status = true
            const returnData = await res.json()
            
            if (!returnData) {
                return true
            }
            console.log (`postUrl status = [${res.status}] returnData = `, returnData)
            console.log (`postUrl return JSON data`, returnData)
            return returnData
            
        })
        .then(_data => {
            return resolve (_data)
        })
        .catch (ex => {
            return resolve (status)
        })

        clearTimeout(id)
    })
}

export const testLocalServer = () => {
    return postUrl(`http://localhost:3001/loginRequest`, '')
}

export const postPasscode: (passcode: string) => Promise<null|boolean|WorkerCommand> = (passcode) => {
    return postUrl(`http://localhost:3001/loginRequest`, JSON.stringify({data:passcode}))
}

