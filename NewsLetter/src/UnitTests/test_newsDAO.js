import { NewsDB } from '../js/IndexedDB.js';

const db = new NewsDB('DbTeste', 'TableTeste');

export class Test_NewsDAO {


    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Checks if the connection with the IndexedDB is possible.
     */
    async Test_Connection() {
        console.log('News Data Acess Object - Connection - Unit Testing')

        try {
            let result = await db.startDB();
            console.log('The Connection was successful');
        } catch (e) {
            console.log('The Connection failed');
            throw (e);
        }
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Checks if you can save an item on IndexedDB.
     */
    async Test_addNewsToFav() {
        console.log('News Data Acess Object - Save to Database - Unit Testing')
        db.startDB();

        try {
            let newObj = { nome: 'Teste' }
            db.addNewsToFav(newObj);

            console.log('Save to Database was successful');
        } catch (e) {
            console.log('Save to Database failed.');
            throw (e);
        }
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Checks if you can make a get from IndexedDB.
     */
    async Test_GetAll() {
        console.log('News Data Acess Object - Get All from Database - Unit Testing');
        try {
            console.log('Trying to get News');
            db.getAllNews();
            console.log('NewsDB.getAllNews() succedded');
        } catch (e) {
            console.log('NewsDB.getAllNews() failed. It is not working proplery');

        }
    }
}