import { Service } from 'egg';
import { Context } from 'egg';
import Erypto from '../util/crypto';
import SqliteUtil from '../util/sqlite'
import {
    BaseCode,
    LoginCode
} from '../enum/enumResponseCode'
interface LoginParam {
    userId: number,
    password: string
}
interface LoginResponse {
    code: number,
    msg: string,
    data: null | {
        user_id: number,
        player_id: string,
        login_ip: string,
        role_id: number,
        password: string,
        account: string
    }
}
interface loginServiceResult {
    code: number,
    msg: string,
    data: null | {
        userId: number,
        playerId: string,
        loginIp: string,
        roleId: number,
        account: string
    }
}
type LoginResult = undefined | LoginResponse
/**
 * Test Service
 */
export default class UserService extends Service {
    sqlite  = new SqliteUtil()
    ownErypto = new Erypto()

    public async login(ctx: Context): Promise<loginServiceResult> {
        console.log(ctx)
        let param: LoginParam = ctx.request.body
        let res: LoginResult = await this.sqlite.get<[number, string], LoginResult>(`select * from user where user_id = ? and password = ?`, [param.userId, this.ownErypto.genMD5(param.password)])
        if(res && res.code == 0) {
            if(!res.data) {
                return {
                    code: LoginCode.PASSWORDERROR,
                    msg: '账号密码错误或账号不存在',
                    data: null
                }
            } else {
                ctx.session.userId = res.data.user_id
                return {
                    code: LoginCode.LOGINSUCCESS,
                    msg: '登录成功',
                    data: {
                        userId: res.data.user_id,
                        playerId: res.data.player_id,
                        loginIp: res.data.login_ip,
                        roleId: res.data.role_id,
                        account: res.data.account
                    }
                }
            }
        } else {
            return {
                code: BaseCode.SQLERROR,
                msg: '请求异常',
                data: null
            }
        }
    }

}
