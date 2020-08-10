import News from "../model/News.js";

export class NewsDB {
    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * It gets two params with the constructor, these are the DataBase Name and Table,
     * respectively. These are important values, which are used to create the Db and find it.
     * @param {String} dbName
     * @param {String} tableName
     */
    constructor(dbName, tableName) {
        this.dbName = dbName;
        this.tableName = tableName;
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Creates the connection recieving the DbName that its passed on its call.
     */
    connection = async() => {
        let connection = await window.indexedDB.open(this.dbName);

        return connection;
    };

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Initiates the Database and see if everything connects.
     */
    startDB = async() => {
        let req = await this.connection();
        req.onsuccess = e => {
            console.log("Deu boa!, DB nome: " + this.dbName);
        };

        req.onerror = e => {
            console.log("Deu ruim, DB nome: " + this.dbName);
        };

        req.onupgradeneeded = e => {
            console.log("Atualizando o DB: " + this.dbName);
            let db = e.target.result;
            var store = db.createObjectStore(this.tableName, {
                keyPath: "id",
                autoIncrement: true
            });

            store.onsuccess = () => {
                console.log("Tabela : " + this.tableName + "  foi criada com sucesso");
            };
            store.onerror = () => {
                console.log("Tabela : " + this.tableName + " não conseguiu ser criada");
            };
        };
    };

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Adds a News object to the Database.
     * @param {News} noticia
     */
    addNewsToFav = async noticia => {
        let req = await this.connection(this.dbName);

        req.onsuccess = e => {
            let db = e.target.result;
            let store = db
                .transaction(this.tableName, "readwrite")
                .objectStore(this.tableName);
            let storeAdd = store.add(noticia);

            storeAdd.onsuccess = e => {
                let newsId = e.target.result;
                console.log(
                    "Adicionado noticia aos favoritos. Id da Noticia: " + newsId
                );
            };

            storeAdd.onerror = () => {
                console.log("Não foi possível adicionar a noticia");
            };
        };

        req.onerror = e => {
            console.log("Não foi possível abrir o Db" + dbName);
        };
    };

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Returns all the news on indexed DB.
     */
    getAllNews = () => {
        return new Promise(async resolve => {
            let req = await this.connection(this.dbName);

            req.onsuccess = async e => {
                let db = e.target.result;

                let articlesList;

                let store = db
                    .transaction(this.tableName, "readwrite")
                    .objectStore(this.tableName);
                let result = await store.getAll();

                result.onsuccess = response => {
                    articlesList = response.target.result;
                    resolve(articlesList);
                };
            };

            req.onerror = () => {
                console.log("Não foi possível abrir o Db" + this.dbName);
            };
        });
    };
}