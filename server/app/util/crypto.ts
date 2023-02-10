const crypto = require('crypto');
export default class Erypto {
    md5 = crypto.createHash('md5');

    genMD5(input: string): string {
        return this.md5.update(input).digest('hex');
    }
    
    genMD5WithSalt(input: string): string {
        return this.md5.update(input).digest('hex');
    }
}