import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtService {

    createToken = (data) => {
        return jwt.sign(data, "BI_MAT", { algorithm: "HS256", expiresIn: "1d" })
    }

    createTokenRefesh = (data) => {
        return jwt.sign(data, "BI_MAT_2", { algorithm: "HS256", expiresIn: "7d" })
    }

}
