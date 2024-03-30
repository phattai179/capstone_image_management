import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class GlobalService {

    responseApi = (res: Response, code, data, message) => {
        res.status(code).json({
            message: message,
            data: data,
            date: new Date()
        })
    }


}
