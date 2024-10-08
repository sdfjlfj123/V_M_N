import axios from "axios";
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token=localStorage.getItem('token')
    config.headers.Authorization=`Bearer ${token}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const authorization = response.headers['authorization']
    // console.log(authorization)
    authorization && localStorage.setItem('token', authorization)
    // console.log(response.headers['authorization'])
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status=error.response['status']
    // console.log(status)
    if(status===401){
        // console.log(11)
        window.location.href='/login'
    }
    return Promise.reject(error);
});