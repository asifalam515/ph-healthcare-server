import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { envVars } from "../../config/env";

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if(envVars.NODE_ENV==="development"){
        console.log("Erorr From Global Error Handler: ",error)

    }
    let statusCode:number =  status.INTERNAL_SERVER_ERROR
    let message:string = "Internal Server Error";
    let errorDetails:any = error;
    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error
    })
}