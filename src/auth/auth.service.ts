import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { Response } from 'express';
import { GlobalService } from 'src/core/services/global/global.service';
import { User } from './entities/user.entity';
import { JwtService } from 'src/core/services/jwt/jwt.service';

@Injectable()
export class AuthService {
    prisma = new PrismaClient();

    constructor(private globalService: GlobalService, private jwtService: JwtService) { }


    async signUp(body: User, res: Response) {
        try {
            let { user_name, full_name, password, email, avatar, age } = body;
            let newUser: User = {
                user_name: user_name,
                full_name: full_name,
                email: email,
                password: bcrypt.hashSync(password, 10),
                avatar: avatar || "",
                age: age,
                role: "USER"
            } as any

            // check userName
            let checkName = await this.prisma.users.findFirst({
                where: {
                    full_name: full_name
                }
            })

            if (checkName) {
                this.globalService.responseApi(res, 400, "", "Name đã tồn tại ");
                return
            }
            await this.prisma.users.create({ data: newUser })
            this.globalService.responseApi(res, 200, "", "Đăng ký thành công")
        } catch (error) {
            console.log('error', error)
            this.globalService.responseApi(res, 500, "", "Đăng ký không thành công");

        }


    }

    login = async (body: User, res: Response) => {
        let { user_name, password } = body

        let checkName = await this.prisma.users.findFirst({
            where: {
                user_name: user_name
            }
        })

        if (checkName) {
            if (bcrypt.compareSync(password, checkName.password)) {
                let key = new Date().getTime()

                let token = this.jwtService.createToken({ userId: checkName.user_id })

                let tokenRefresh = this.jwtService.createTokenRefesh({ userId: checkName.user_id, key })

                await this.prisma.users.update({
                    where: {
                        user_id: checkName.user_id
                    },
                    data: {
                        ...checkName,
                        refresh_token: tokenRefresh
                    }
                })
                this.globalService.responseApi(res, 200, token, "Login thành công")
            } else {
                this.globalService.responseApi(res, 400, "", "Mật khẩu không đúng")
            }
        } else {
            this.globalService.responseApi(res, 400, "", "Name không đúng")
        }

    }

    getUser = async (userId: number, res: Response) => {
        try {
            let user = await this.prisma.users.findUnique({
                where: {
                    user_id: userId
                }
            })
            this.globalService.responseApi(res, 200, user, "Successfully")
        } catch (err) {
            this.globalService.responseApi(res, 400, err, "Error")
        }
    }


    updateUser = async (userId: number, body: User, res: Response) => {
        let { full_name, age, email, avatar } = body;

        try {
            let user = await this.prisma.users.findUnique({ where: { user_id: userId } })
            console.log('user old', user)
            user = { ...user, full_name, age, email, avatar }
            console.log('neww user', user)
            await this.prisma.users.update({
                where: { user_id: userId },
                data: user
            })
            this.globalService.responseApi(res, 200, "", "Successfully")
        } catch (err) {
            this.globalService.responseApi(res, 400, err, "Error")
        }
    }

}
