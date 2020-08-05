
export class NewsDB {


    /**
     * It gets two params with the constructor, these are the DataBase Name and Table,
     * respectively. These are important values, which are used to create the Db and find it.
     * @param {String} dbName 
     * @param {String} tableName 
     */
    constructor(dbName, tableName){
        this.dbName = dbName;
        this.tableName = tableName;
    }


    /**
     * Cria a conexão com o Banco de Dados pelo Nome dado no Construtor
     */
     connection = async() => {
         debugger;
        let connection = await window.indexedDB.open(this.dbName);

        return connection;
    }

    /**
     * Inicia o banco e verifica se ele já está criado. Se precisa ele cria;
     */
    startDB = async() => {
        let req = await this.connection();
        let db;

        req.onsuccess = (e) => {
            db = e.target.result;
            console.log('Deu boa!, DB nome: ' + this.dbName);
            console.log(db);
        }

        req.onerror = (e) => {
            db = e.target.result;
            console.log('Deu ruim, DB nome: ' + this.dbName);
            console.log(db);
        }

        req.onupgradeneeded = (e) => {
            console.log('Atualizando o DB: ' + this.dbName);
            db = e.target.result;

            var store = db.createObjectStore(this.tableName, {
                keyPath: 'id',
                autoIncrement: true
            })

            store.onsuccess = () => {
                console.log('Tabela : ' + this.tableName + '  foi criada com sucesso');
            }
            store.onerror = () => {
                console.log('Tabela : ' + this.tableName + ' não conseguiu ser criada');
            }
        };
    }

    /**
     * Adiciona uma noticia ao banco de dados.
     * @param {Object} noticia 
     */
    addNewsToFav = async(noticia) => {
        debugger;
        let req = await this.connection(this.dbName);

        req.onsuccess = (e) => {

            let db = e.target.result;

            let store = db.transaction(this.tableName, 'readwrite').objectStore(this.tableName);
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

    getAllNews = async() => {
        let req = await this.connection(this.dbName);

        req.onsuccess = async(e) => {
            let db = e.target.result;

            let store = db.transaction(this.tableName, 'readwrite').objectStore(this.tableName);
            let result = await store.getAll();

            return result;
        }

        req.onerror = () => {
            console.log('Não foi possível abrir o Db' + this.dbName);
        }

    }
}