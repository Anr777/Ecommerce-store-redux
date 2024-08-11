import { useLoaderData } from "react-router-dom";
import { ProductsGrid, ProductsList } from ".";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useEffect, useState } from "react";


function ProductsContainer() {
  
  
  const { meta } = useLoaderData();
  const totalProducts = meta.pagination.total;
  const [ layout, setLayout ] = useState(localStorage.getItem('layoutdefault') || 'grid');

  function setActiveStyles( pattern ) {
    return `text-xl btn btn-circle btn-sm ${ pattern && 'btn-primary text-primary-content'}`;
  }

  useEffect( () => {
    localStorage.setItem('layoutdefault', layout);
  }, [layout]);

  return (
    <>
      {/**HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          { totalProducts } product{ totalProducts > 1 &&'s' }
        </h4>
        <div className="flex gap-x-2">
          
          <button type="button" onClick={ () => setLayout('grid') }
            className={`${ layout === 'grid' && setActiveStyles(layout) }`}
          >
            <BsFillGridFill />
          </button>
          <button type="button" onClick={ () => setLayout('list') }
            className={`${ layout === 'list' && setActiveStyles(layout) }`}  
          >
            <BsList />
          </button>

        </div>
      </div>
      {/**PRODUCTS */}
      <div>
        {
          totalProducts === 0 && <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5> 
        }
      </div>
      {
        layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )
      }
    </>
  )
}

export default ProductsContainer
