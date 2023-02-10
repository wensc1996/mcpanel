import { Controller } from 'egg';
import {
    BaseCode
} from '../enum/enumResponseCode'
export default class UserController extends Controller {
    public async login() {
        const { ctx } = this;
        if(!ctx.request.body.userId) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失userId'
            }
            return
        }
        if(!ctx.request.body.password) {
            ctx.body = {
                code: BaseCode.LACKPARAM,
                msg: '参数缺失password'
            }
            return
        }
        ctx.body = await ctx.service.user.login(ctx);
    }
}