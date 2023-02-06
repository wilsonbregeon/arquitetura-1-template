import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            //acessando a informação vindo da requisição
            const q = req.query.q as string | undefined //input

            const userBusiness = new UserBusiness //instanciar objeto
            const output = await userBusiness.getUsers(q)
    
            //resposta da requisição
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const { id, name, email, password } = req.body

            const input = {
                id,
                name,
                email,
                password
            }

            const userBusiness = new UserBusiness()
            const output = userBusiness.createUser(input)
    
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}