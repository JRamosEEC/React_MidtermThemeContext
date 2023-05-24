import Loading from './../components/Loading';
import { useFetch } from './../JS/useFetch';
import { useParams, useNavigate } from 'react-router-dom';


const ProductDetail = () => {
    const productID = Number(useParams().productID) || 0;

    const {data: product, loading, error} = useFetch('products/' + productID);

    const navigate = useNavigate();
    const handleShowProducts = () => {
        navigate('/products');
    };
    
    if(error != undefined && error.length > 0) { return <p style={{ textAlign:'center'}}>An error occurres {error}</p>; };

    if (loading) { return <Loading /> }

    return (
        <>
            {Object.keys(product).length > 0 ? (
                <>
                    <div className='row align-items-center'>
                        <img src={product.image} className="col-auto" style={{width: 250, height: 250}}/>
                        <div className="col text-light">
                            <p className='row'>Title: <b>{product.title}</b></p>

                            <p className='row'>Price: <b>${product.price}</b></p>

                            <p className='row'>Category: <b>{product.category}</b></p>

                            <p className='row'>Description: <b>{product.description}</b></p>

                            <p className='row'>Rating: <b>{product.rating.rate} with {product.rating.count} reviews</b></p>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <a id="btn" onClick={handleShowProducts} name="Home" className="btn btn-primary">Go Back</a>
                    </div>
                </>
            )
            : undefined}
        </>
    );
};
  
export default ProductDetail;