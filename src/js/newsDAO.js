const dbName = 'NewsDb';
const tableName = 'NewsFav';

export default function NewsDb() {


    const connection = async(dbName) => {
        let connection = await window.indexedDB.open(dbName);

        return connection;
    }

    const startDB = async() => {
        debugger;
        let req = await connection(dbName);
        let db;

        req.onsuccess = (e) => {
            db = e.target.result;
            console.log('Deu boa!, DB nome: ' + dbName);
            console.log(db);
        }

        req.onerror = (e) => {
            db = e.target.result;
            console.log('Deu ruim, DB nome: ' + dbName);
            console.log(db);
        }

        req.onupgradeneeded = (e) => {
            console.log('Atualizando o DB: ' + dbName);
            db = e.target.result;

            var store = db.createObjectStore(tableName, {
                keyPath: 'id',
                autoIncrement: true
            })

            store.onsuccess = () => {
                console.log('Tabela : ' + tableName + '  foi criada com sucesso');
            }
            store.onerror = () => {
                console.log('Tabela : ' + tableName + ' não conseguiu ser criada');
            }
        };
    }

    const addNewsToFav = async(noticia) => {
        let req = await connection(dbName);

        req.onsuccess = (e) => {
            debugger;

            let db = e.target.result;

            let store = db.transaction(tableName, 'readwrite').objectStore(tableName);
            let storeAdd = store.add(noticia);

            storeAdd.onsuccess = e => {
                let newsId = e.target.result;
                console.log('Adicionado noticia aos favoritos. Id da Noticia: ' + newsId);
            }

            storeAdd.onerror = () => {
                console.log("Não foi possível adicionar a noticia");
            }
        }

        req.onerror = (e) => {
            console.log('Não foi possível abrir o Db' + dbName);
        }
    }

    const getAllNews = async() => {
        debugger;
        let req = await connection(dbName);

        req.onsuccess = async(e) => {
            let db = e.target.result;

            let store = db.transaction(tableName, 'readwrite').objectStore(tableName);
            let result = await store.getAll();

            return result;
        }

        req.onerror = () => {
            console.log('Não foi possível abrir o Db' + dbName);
        }

    }

    return {
        startDB,
        addNewsToFav,
        getAllNews
    }
}