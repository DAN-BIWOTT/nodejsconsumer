import Axios from 'axios';

export const getArticles = async(URL) => {
    const response = await Axios.get(URL,{headers:{'Access-Control-Allow-Origin': '*','Content-Type':'Application/Json'}});
    return response;
}

export const createArticle = async(URL,data) =>{
    const res = await Axios.post(URL,data);
    return res;
}

export const showArticle = async(myURL) =>{
    const response = await Axios.get(
       myURL,
        {headers:{"Content-Type":"Application/Json"}
    })
    return response;
}

export const deleteArticle = async(myURL) => {
    await Axios.
        delete(
             myURL,
            {headers:{"Content-Type" : "Application/Json"}}
        )
        .catch(res => {
            console.log(res);
        });
}

export const editArticle = async(myURL,data) => {
    return await Axios.put(
        myURL,
        data,
        {headers:{"Content-Type": "Application/Json"}
        });
}