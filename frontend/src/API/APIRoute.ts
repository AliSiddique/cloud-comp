import { randUrl } from "@/components/Forms/User/ResetPassword/ChangePasswordForm";

export let BASEURL:string;
let urlBACK = "backend-cloud"
if(process.env.NODE_ENV === "production") {
    BASEURL = `https://${urlBACK}${randUrl}`
} else {
    BASEURL = "http://127.0.0.1:8000"
}
