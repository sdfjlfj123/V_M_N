import axios from "axios"
function upload(path,ruleForm){
    const params = new FormData()
    for (let i in ruleForm) {
        params.append(i, ruleForm[i])
    }
    return axios.post(path, params, {
        headers: {
            "Content-Type": 'multipart/form-data',
        }
    })

}
export default upload