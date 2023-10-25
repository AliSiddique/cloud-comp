export let BASEURL:string;

if(process.env.NODE_ENV === "production") {
    BASEURL = "https://django-react-authentication.herokuapp.com"
} else {
    BASEURL = "http://127.0.0.1:8000"
}
