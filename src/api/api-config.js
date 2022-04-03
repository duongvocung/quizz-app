import axios from "axios";
import { refreshToken } from "./api";

axios.interceptors.request.use(async (req) => {
    const expires = Number(new Date(localStorage.getItem("expires")));
    const current = Number(new Date());

    if (expires <= current) {
        await refreshToken(localStorage.getItem("tokenRefresh"))
            .then((res) => {
                console.log("refreshed");
                localStorage.setItem("token", res.data.access.token);
                localStorage.setItem("expires", res.data.access.expires);
                localStorage.setItem("tokenRefresh", res.data.refresh.token);
                req.headers = {
                    ...req.headers,
                    Authorization: `Bearer ${res.data.access.token}`,
                };

                return req;
            })
            .catch((err) => console.log(err));
    }

    req.headers = {
        ...req.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    return req;
});