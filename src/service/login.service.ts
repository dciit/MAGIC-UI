import axios from 'axios';
import { hrapi } from '../constants';
const http = axios.create({
    baseURL: hrapi,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
    }
});

export function API_LOGIN_EMPLOYEE(code: string) {
    return new Promise<any>(resolve => {
        http.get(`/login/${code}`).then((res) => {
            resolve(res.data);
        }).catch((e)=>{
            resolve({
                status : e.response.status,
                message : e.response.statusText
            });
        });
    })
}