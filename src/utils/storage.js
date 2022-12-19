export function setItem(key,value){
    if(typeof value === 'object'){
        localStorage.setItem(key,JSON.stringify(value))
    }else{
        localStorage.setItem(key,value)
    }
}

export function getItem(key){
    let value = localStorage.getItem(key)
    try {
        value = JSON.parse(value)
        return value
    } catch (error) {
        return value
    }
    
}
export function removeItem(key){
    localStorage.removeItem(key)
}
