//Добавляет данные в db.json файл
//Lisab andmed db.json faili
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json()
};

// получает данные из json файла в указанном пути
// saab Andmed json-failist määratud teel
async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, Status: ${res.status}`);
    }

    return await res.json();
}

export {postData};
export {getResource};