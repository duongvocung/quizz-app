import axios, { Axios } from "axios";

const instanceAxios = axios.create();

// export const authLogin = async (user) => {
//     try {
//         const res = await instanceAxios.post(`https://fwa-ec-quiz.herokuapp.com/v1/auth/login`, user)
//         return {
//             success: true,
//             data: res.data
//         };
//     } catch (error) {
//         return {
//             success: false,
//             data: error.response.data.message
//         }
//     }
// }

export function authLogin(user) {
    return instanceAxios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/auth/login",
        data: user,
    }).then((res) => {
        return {
            success: true,
            data: res.data,
        };
    });
}
export function authRegister(params) {
    return instanceAxios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/auth/register",
        data: params,
    }).then((res) => {
        return {
            success: true,
            data: res.data,
        };
    });
}
// try {
//     axios.post('https://fwa-ec-quiz.herokuapp.com/v1/auth/register',params)
//     message.success('Succes fully', 3);
//     // onClick={() => navigator("/Login")}
//     navigator('/')
// } catch (error) {
//     console.log('bbb');

// }


export const getQuestionByUser = async () => {
    try {
        const res = await axios.get(`/v1/questions`);
        // console.log(res);
        return {
            success: true,
            data: res.data,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            data: error.response.data.message,
        };
    }
};

export function refreshToken(refreshToken) {
    return instanceAxios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/auth/refresh-tokens",
        data: {
            refreshToken: refreshToken,
        },
    });
}

export function submitButton(answer) {
    return axios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/questions/submit",
        data: answer,
    });
}

export function getDataAdmin(limit) {
    return axios({
        method: "GET",
        url: `https://fwa-ec-quiz.herokuapp.com/v1/questions/edit?limit=${limit}`,
        // data:prams
    });
}
export function createQuestionDataAdmin(question) {
    return axios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/questions/edit",
        data: question,
    });
}
export function deleteQuestionDataAdmin(id) {
    return axios({
        method: "DELETE",
        url: `https://fwa-ec-quiz.herokuapp.com/v1/questions/edit/${id}`,
    });
}

export function editQuestionDataAdmin(question, id) {
    return axios({
        method: "PATCH",
        url: `https://fwa-ec-quiz.herokuapp.com/v1/questions/edit/${id}`,
        data: question,
    });
}

export function getQuestionByIdDataAdmin(id) {
    return axios({
        method: "GET",
        url: `https://fwa-ec-quiz.herokuapp.com/v1/questions/edit/${id}`,
    });
}
