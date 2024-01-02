export let BASEURL:string;

if(process.env.NODE_ENV === "production") {
    BASEURL = "http://0.0.0.0:8000"
} else {
    BASEURL = "http://127.0.0.1:8000"
}
