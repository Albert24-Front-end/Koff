import { API_URL } from "../const";

export class APIService {
    #apiUrl = API_URL;

    constructor() {
        this.accessKey = localStorage.getItem('accessKey');
        console.log()
    }
}