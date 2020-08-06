export default class News {

    constructor(article) {
        this.author = article.author;
        this.name = article.source.name;
        this.title = article.title;
        this.description = article.description;
        this.url = article.url;
        this.imageUrl = article.urlToImage;
        this.publishedAt = article.publishedAt;
        this.content = article.content;

        this.validation()
    }


    validation = () => {
        if(this.imageUrl == null){
            this.imageUrl = 'https://via.placeholder.com/300';
        } 
            
        this.name ? this.name : this.title;
        this.title ? this.title : this.name;
    }
}