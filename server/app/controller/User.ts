import { Controller } from 'egg';
import {
    BaseCode, LoginCode
} from '../enum/enumResponseCode'
export default class UserController extends Controller {
    public async login() {
        const { ctx } = this;
        if(!ctx.request.body.userId) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失userId',
                data: null
            }
            return
        }
        if(!ctx.request.body.password) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失password',
                data: null
            }
            return
        }
        ctx.body = await ctx.service.user.login(ctx);
    }
    public async register() {
        const { ctx } = this;
        if(!ctx.request.body.userId) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失userId',
                data: null
            }
            return
        }
        if(!ctx.request.body.playerId) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失playerId',
                data: null
            }
            return
        }
        if(!ctx.request.body.roleId) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失roleId',
                data: null
            }
            return
        }
        if(!ctx.request.body.password) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失password',
                data: null
            }
            return
        }
        if(!ctx.request.body.account) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失account',
                data: null
            }
            return
        }
        ctx.body = await ctx.service.user.register(ctx);
    }
    public async updateUserInfo() {
        const { ctx } = this;
        if(!ctx.request.body.userId) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失userId',
                data: null
            }
            return
        }
        if(!ctx.request.body.playerId) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失playerId',
                data: null
            }
            return
        }
        if(!ctx.request.body.roleId) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失roleId',
                data: null
            }
            return
        }
        if(!ctx.request.body.account) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失account',
                data: null
            }
            return
        }
        ctx.body = await ctx.service.user.updateUserInfo(ctx);
    }
    public async updatePassword() {
        const { ctx } = this;
        if(!ctx.request.body.userId) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失userId',
                data: null
            }
            return
        }
        if(!ctx.request.body.password) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失password',
                data: null
            }
            return
        }
        if(!ctx.request.body.oldPassword) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失oldPassword',
                data: null
            }
            return
        }
        if(ctx.request.body.oldPassword == ctx.request.body.password) {
            ctx.body = {
                code: LoginCode.UPDATESAMEPASSWORD,
                msg: '原密码与新密码相同',
                data: null
            }
            return
        }
        ctx.body = await ctx.service.user.updatePassword(ctx);
    }

    
    
}