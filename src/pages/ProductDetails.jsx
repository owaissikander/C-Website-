
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import {
  addItemToLocalStorage,
  getItemsFromLocalStorage,
  isItemAddedToCart,
} from "../utils/localStorage";
import { CartContext } from "../context/CartContext";
import { data } from "autoprefixer";


function ProductDetail() {
  const { setProduct } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProductt] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json()).then((data) => setProductt(data));

  }, [id])


  const addToCart = () => {
    addItemToLocalStorage({ ...product, quantity: 1 });

    const allProducts = getItemsFromLocalStorage();
    setProduct([...allProducts]);
  };
  return (

    <div
      className="p-10 flex h-screen flex-col justify-center items-center"
    >
      {product ? (

        <div className="m-10 w-1/2 border flex flex-col justify-center items-center">
          <h1 className="text-4xl mb-6">{product.category}</h1>

          <img className="h-52 w-52" src={product.image} />
          <h1 className="my-3 text-center  text-4xl underline font-semibold">
            {product.title}
          </h1>

          <div className="flex justify-between ">

            <div>

              <p className="me-12 mt-2 text-black font-bold" > PRICE : {product.price}</p>
            </div>
            <div>

              <Button className="ms-14 mb-2 text-black border-black " color="primary" size="large" onClick={addToCart}>
                {isItemAddedToCart(id) ? "Add More" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default ProductDetail;