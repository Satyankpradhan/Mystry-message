import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(request: Request) {
    await dbConnect()


    try {
       const {username, code} =  await request.json()

       const decodedUsername =  decodeURIComponent(username)
        const user =  await UserModel.findOne({username: decodedUsername})

        if (!user) {
            return Response.json({
                success: false,
                message: "user not found"
             },
             {status: 500}
            )
        }

        const isCodeValid = user.verifyCode ===code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save()

            return Response.json({
                success: true,
                message: "Account Verfied Sucessfully"
             },
             {status: 200}
            )
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Verification code expired and do Sign again"
             },
             {status: 400}
            )
        } else{
            return Response.json({
                success: false,
                message: "Verification code is incorrect"
             },
             {status: 400}
            )
        }

    } catch (error) {
        console.error("Error Verifying username", error);
        return Response.json({
            success: false,
            message: "Error Verifying Username"
         },
         {status: 500}
        ) 
    }
}