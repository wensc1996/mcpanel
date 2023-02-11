interface errorSQL {
    errno: number,
    code: string,
    "__augmented": boolean
}
export default class SqliteUtil {
    public sqlite3: any = null;
    public db: any = null;
    constructor() {
        this.sqlite3 = require('sqlite3').verbose()
        this.db = new this.sqlite3.Database('mcpabel.db')
    }
    get<T, V>(statement: string, param: T): Promise<V> {
        return new Promise((resolve, reject) => {
            this.db.get(statement, param, (err: errorSQL, res: V) => {
                console.log(res)
                if(err) {
                    reject({
                        code: err.errno,
                        msg: err.code,
                        data: null
                    } as V | PromiseLike<V>)
                } else {
                    resolve({
                        code: 0,
                        msg: 'success',
                        data: res
                    } as V | PromiseLike<V>)
                }
            })
        })
    }
    run<T, V>(statement: string, param: T): Promise<V> {
        return new Promise((resolve, reject) => {
            this.db.run(statement, param, (err: errorSQL) => {
                console.log("SQL:" + err)
                if(err) {
                    reject({
                        code: err.errno,
                        msg: err.code,
                        data: null
                    } as V | PromiseLike<V>)
                } else {
                    resolve({
                        code: 0,
                        msg: 'success',
                        data: null
                    } as V | PromiseLike<V>)
                }
            })
        })
    }

}