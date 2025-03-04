import axios from "axios";
import { API_URL } from "../const";

export class APIService {
    #apiUrl = API_URL;

    constructor() {
        this.accessKey = localStorage.getItem('accessKey');
        console.log("this.accessKey", this.accessKey);
    }

    async getAccessKey() {
        try {
            if(!this.accessKey) {
                const response = await axios.get(`${this.#apiUrl}/api/users/accessKey`);
                this.accessKey = response.data.accessKey;
                localStorage.setItem('accessKey', this.accessKey);
            }
        }
        catch(error) {
            console.log("error", error);
        }
    }

    async getData(url, params = {}) {
        if(!this.accessKey) {
            await this.getAccessKey();
        }
        try {
            const response = await axios.get(`${this.#apiUrl}${url}`, {
                headers: {
                    Authorization: `Bearer ${this.accessKey}`,
                },
                params: {}
            });

            return response.data;
        }
        catch (error) {
            if(error.response && error.response.status === 401) {
                this.accessKey = null;
                localStorage.removeItem("accessKey");

                return this.getData(url, params);
            } else {
                console.log(error);
            }
        }
    }

    async getProducts(page = 1, limit = 12, list , category, search) {
        return await this.getData("api/products", {
            page,
            limit,
            list,
            category,
            search,
        });
    }
}