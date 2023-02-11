import { Service } from 'egg';
import { Context } from 'egg';
import Erypto from '../util/crypto';
import SqliteUtil from '../util/sqlite'
import {
    BaseCode,
    LoginCode
} from '../enum/enumResponseCode'
interface UserParam {
    userId: number,
    password: string
}
interface RegisterParam extends UserParam {
    loginIp: string,
    roleId: number,
    playerId: string,
    account: string 
}
interface UpdatePasswordParam extends UserParam {
    oldPassword: string
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
        let param: UserParam = ctx.request.body
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

    public async register(ctx: Context): Promise<loginServiceResult> {
        let param: RegisterParam = ctx.request.body
        let res = await this.sqlite.run<[string, string, number, string, string], LoginResult>(`insert into user (player_id, login_ip, role_id, password, account) values(?, ?, ?, ?, ?)`, [param.playerId, param.loginIp, param.roleId, this.ownErypto.genMD5(param.password), param.account])
        if(res && res.code == 0) {
            return {
                code: BaseCode.SUCCESS,
                msg: '注册成功',
                data: null
            }
        } else {
            return {
                code: BaseCode.SQLERROR,
                msg: '请求异常',
                data: null
            }
        }
    }

    public async updateUserInfo(ctx: Context): Promise<loginServiceResult> {
        let param: RegisterParam = ctx.request.body
        let res = await this.sqlite.run<[string, string, number, string, number], LoginResult>(`update user player_id = ?, login_ip = ?, role_id = ?, account = ? where user_id = ?`, [param.playerId, param.loginIp, param.roleId, param.account, param.userId])
        if(res && res.code == 0) {
            return {
                code: BaseCode.SUCCESS,
                msg: '更新基础信息成功',
                data: null
            }
        } else {
            return {
                code: BaseCode.SQLERROR,
                msg: '请求异常',
                data: null
            }
        }
    }

    public async updatePassword(ctx: Context): Promise<loginServiceResult> {
        let param: UpdatePasswordParam = ctx.request.body
        let checkBeforePassword = await this.sqlite.get<[number], LoginResult>(`select password from user where user_id = ?`, [param.userId])
        console.log(checkBeforePassword)
        if(checkBeforePassword && checkBeforePassword.code == 0) {
            if(checkBeforePassword.data && checkBeforePassword.data.password == this.ownErypto.genMD5(param.oldPassword)) {
                let res = await this.sqlite.run<[string, number], LoginResult>(`update user set password = ? where user_id = ?`, [this.ownErypto.genMD5(param.password), param.userId])
                if(res && res.code == 0) {
                    return {
                        code: BaseCode.SUCCESS,
                        msg: '更新密码成功',
                        data: null
                    }
                } else {
                    return {
                        code: BaseCode.SQLERROR,
                        msg: '请求异常',
                        data: null
                    }
                }
            } else {
                return {
                    code: LoginCode.PASSWORDERROR,
                    msg: '密码错误',
                    data: null
                }
            }
        } else {
            return {
                code: BaseCode.SQLERROR,
                msg: '该用户不存在或请求异常',
                data: null
            }
        }
    }
}
