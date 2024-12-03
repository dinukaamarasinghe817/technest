export default class ProductModal {
    constructor(id, name, rating, totalNumberOfOrders, price, imagePath) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.imagePath = imagePath;
        this.totalNumberOfOrders = totalNumberOfOrders;
    }
  
    displayDetails() {
        console.log(`Id: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Price: $${this.price}`);
        console.log(`Rating: ${this.rating} stars`);
        console.log(`Image Path: ${this.imagePath}`);
        console.log(`Total Orders: ${this.totalNumberOfOrders}`);
    }
  
    updateOrders(newOrders) {
      this.totalNumberOfOrders += newOrders;
      console.log(`Updated total orders: ${this.totalNumberOfOrders}`);
    }
  }