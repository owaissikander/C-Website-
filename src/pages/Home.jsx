import { Button } from "antd";
import { useEffect, useState, } from "react";
import { addItemToLocalStorage, getItemsFromLocalStorage, isItemAddedToCart } from "../utils/localStorage";
import { useParams } from "react-router";
import { Link } from "react-router-dom";



function Home() {
  const [selectedValue, setSelectedValue] = useState('')
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const { id } = useParams()
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products').then((res) => res.json())
      .then((data) => setPost(data)
      );
  }, [])


  const filteredPost = post.filter((item) => {
    const nameLower = item.title.toLowerCase();
    const searchLower = search.toLowerCase();
    const selectedValueLower = selectedValue.toLowerCase();

    // Combined filtering condition
    return (
      (!searchLower || nameLower.indexOf(searchLower) !== -1) &&
      (!selectedValueLower || nameLower.indexOf(selectedValueLower) !== -1)
    );
  });



  return (
    <>


      <h1 className="text-center my-5 text-3xl font-semibold underline">
        E-Commerce
      </h1>
      <div className='mx-10 w-3/4 mx-auto ' >
        <select className='w-full border-2  p-3 font-bold' value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
          <option value="">Select an option</option>
          <option value="Clothes">Fjallraven </option>
          <option value="Electronics">Mens Casual </option>
          <option value="Furnitures">Mens Cotton Jacket</option>
          <option value="Shoes">Mens Casual Slim Fit</option>
          <option value="Miscellaneous">John Hardy </option>

        </select>
      </div>


      <div className="mx-10 w-3/4 mx-auto ">
        <input
          placeholder="Search"
          type="search"
          className="w-full border-2  p-3 font-bold"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap m-4 p-6 mx-auto">
        {

          filteredPost.map((data) => (

            <div key={data.id} className="lg:w-1/4 p-3 md:w-1/2 p-2 w-full">
              <div className="border  rounded-md p-4 shadow-black shadow-md overflow-hidden">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={data.image}
                  />
                </a>
                <p className="mt-4 p-2">{data.category}</p>

                <div className="mt-1 p-1">

                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {data.title}
                  </h2>

                  <p className="mt-1">{data.description.slice(0, 40)}</p>
                  <div className="flex justify-between ">

                    <div>

                      <p className="text-start font-bold mt-5" >Price : ${data.price}</p>
                    </div>
                    <div className="flex mt-4">
                      <Link to={`/product/${data.id}`} >
                        <Button>View Details</Button>
                      </Link>

                    </div>

                  </div >

                </div>
              </div>
            </div>
          ))

        }
      </div>

    </>
  )








}

export default Home;