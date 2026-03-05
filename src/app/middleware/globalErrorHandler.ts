import { NextFunction, Request, Response } from "express"
import { envVars } from "../../config/env"

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if(envVars.NODE_ENV==="development"){
        console.log("Erorr From Global Error Handler: ",error)
    }
    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error
    })
}