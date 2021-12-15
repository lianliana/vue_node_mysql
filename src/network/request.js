import axios from 'axios'

axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
    config.headers.Authorization =window.sessionStorage.getItem('token')
    return config
})

export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}

export function post(url, params) {    
    return new Promise((resolve, reject) => {         
        axios.post(url, params)        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(res => {
                resolve(res.data);
                // Loading.service(true).close();
                //  Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data)
                // Loading.service(true).close();
                Message({message: '加载失败', type: 'error'});
            })
    });
}

export function deletefn(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params)
            .then(res => {
                resolve(res.data);
                // Loading.service(true).close();
                //  Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data)
                // Loading.service(true).close();
                Message({message: '加载失败', type: 'error'});
            })
    });
}
