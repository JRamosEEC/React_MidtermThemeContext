import Loading from './../components/Loading';
import { useFetch } from './../JS/useFetch';
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
    const {data: products, loading, error} = useFetch('products');

    const navigate = useNavigate();
  
    const handleShowProductInformation = (productID) => {
        navigate('/productDetail/' + productID);
    };

    
    if(error != undefined && error.length > 0) { return <p style={{ textAlign:'center'}}>An error occurres {error}</p>; };

    if (loading) { return <Loading /> }

    return (
        <>
            {products.length ? (
                products.map((product) => {
                    return (
                        <a key={product.id} onClick={() => {handleShowProductInformation(product.id)}} id="productContainer" className='row no-marginL'>
                            <img src={product.image} className="col-auto" style={{width: 100, height: 100}}/>
                            <p className="col d-flex align-items-center text-light">{product.title}</p>
                        </a>
                    );
                })
            ) : undefined}
        </>
    );
};
  
export default ProductsPage;