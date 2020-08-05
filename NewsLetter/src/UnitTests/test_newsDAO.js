import { NewsDB } from '../js/newsDAO.js';
import News from '../model/newsModel.js';

const db = new NewsDB('DbTeste', 'TableTeste');

export class Test_NewsDAO {


    async Test_Connection() {
        console.log('News Data Acess Object - Conection - Unit Testing')

        try {
            let result = await db.startDB();
            console.log('The Connection was successful');
        } catch (e) {
            console.log('The Connection failed');
            throw (e);
        }
    }

    async Test_addNewsToFav() {
        console.log('News Data Acess Object - Save to Database - Unit Testing')
        db.startDB();

        try {
            let newObj = { nome: 'Teste'}
            db.addNewsToFav(newObj);
            
            console.log('Save to Database was successful');
        }catch(e){
            console.log('Save to Database failed.');
            throw(e);
        }
    }
}