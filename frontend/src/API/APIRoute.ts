export let BASEURL:string;

if(process.env.NODE_ENV === "production") {
    BASEURL = "https://backend-cloud-3onr.onrender.com"
} else {
    BASEURL = "http://127.0.0.1:8000"
}
