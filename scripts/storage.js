export const getLocalStorage = key => {
    return localStorage.getItem(key) ?
    // парсим обратно со строки
    JSON.parse(localStorage.getItem(key)) :
    [];
}

export const setLocalStorage = (key, value) => {
    // преобращаем в строку чтобы не было Object Object
    localStorage.setItem(key, JSON.stringify(value))
}