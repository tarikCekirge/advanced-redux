import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  { id: "p1", name: "Laptop", price: 1500, quantity: 1, totalPrice: 1500, description: "Powerful laptop for work and gaming" },
  { id: "p2", name: "Mouse", price: 50, quantity: 1, totalPrice: 50, description: "Wireless ergonomic mouse" },
  { id: "p3", name: "Keyboard", price: 100, quantity: 1, totalPrice: 100, description: "Mechanical keyboard with RGB lights" },
  { id: "p4", name: "Monitor", price: 300, quantity: 1, totalPrice: 300, description: "4K Ultra HD monitor" },
  { id: "p5", name: "Headphones", price: 80, quantity: 1, totalPrice: 80, description: "Noise-canceling headphones" },
  { id: "p6", name: "Smartphone", price: 1000, quantity: 1, totalPrice: 1000, description: "Latest smartphone with amazing features" },
  { id: "p7", name: "Tablet", price: 600, quantity: 1, totalPrice: 600, description: "High-performance tablet for work and play" },
  { id: "p8", name: "Smartwatch", price: 250, quantity: 1, totalPrice: 250, description: "Smartwatch with fitness tracking" },
  { id: "p9", name: "Printer", price: 200, quantity: 1, totalPrice: 200, description: "High-speed wireless printer" },
  { id: "p10", name: "USB Drive", price: 20, quantity: 1, totalPrice: 20, description: "128GB USB flash drive" },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => (
          <ProductItem
            key={item.id}
            title={item.name}
            price={item.price}
            id={item.id}
            description={item.description}
          />
        ))}


      </ul>
    </section>
  );
};

export default Products;
