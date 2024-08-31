import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";


export async function sendVerificationEmail(
    email:string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry Message Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return {success: true,message: 'verification Email Sent successfully'}
    } catch (emailerror) {
        console.error("Error Sending verification email", emailerror);
        return {success: false,message: 'failed to send verification Email'}
    }
}
