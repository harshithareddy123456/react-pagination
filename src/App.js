import { useEffect } from "react";
import { useState } from "react";
import "./styles/styles.css";

function App() {
  const [products, setProducts] = useState(null);
  const [page, setPages] = useState(1);
  const fetchProducts = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=100");
    const response = await data.json();
    setProducts(response.products);
  };
  const handlebuttonclick = (pageselected) => {
    if (
      pageselected >= 1 &&
      pageselected <= products.length / 10 &&
      pageselected !== page
    ) {
      setPages(pageselected);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="container">
      <div className="productContainer">
        {products && products.length > 0
          ? products.slice(page * 10 - 10, page * 10).map((prod) => (
              <>
                <div className="product" key={prod.id}>
                  <img
                    className="prodimg"
                    src={prod.images[0]}
                    alt={prod.title}
                  ></img>
                  <span>{prod.title}</span>
                </div>
              </>
            ))
          : null}
      </div>
      {products && products.length > 0 && (
        <>
          <div className="paginationcontainer">
            {page > 1 ? (
              <span
                onClick={() => handlebuttonclick(page - 1)}
                className="pagebutton1"
              >
                ⬅️
              </span>
            ) : null}
            {[...Array(products.length / 10)].map((_, i) => (
              <span
                className={`pagebutton ${page === i + 1 ? "pageselected" : ""}`}
                key={i}
                onClick={() => handlebuttonclick(i + 1)}
              >
                {i + 1}
              </span>
            ))}
            {page < products.length / 10 ? (
              <span
                onClick={() => handlebuttonclick(page + 1)}
                className="pagebutton1"
              >
                ➡️
              </span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
