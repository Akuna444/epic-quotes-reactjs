import { Link } from "react-router-dom";

const Product = () => {
  return (
    <section>
      <h1>This is Products Page</h1>
      <ul>
        <li>
          <Link to="/product/p1">a Book</Link>
        </li>
        <li>
          <Link to="/product/p2">a Car</Link>
        </li>
        <li>
          <Link to="/product/p3">a Carpet</Link>
        </li>
      </ul>
    </section>
  );
};

export default Product;
