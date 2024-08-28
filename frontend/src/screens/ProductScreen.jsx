import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from 'react-bootstrap';
import Ratings from '../components/Ratings';
import Loader from '../components/Loader';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function ProductScreen() {
    const { id: productId } = useParams();

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const [qty, setQty] = useState(1);

    const {
        data: product,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId);

    const addToCartHandler = ()=>{
        dispatch(addToCart({...product,qty}))
        navigate('/cart')
    }


    return (
        <>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant={'danger'}>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Row>
                    {/* Product Image */}
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    {/* Product Info */}
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Ratings
                                    value={product.rating}
                                    text={`${product.numReviews} Reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Price: ${product.price}</strong>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    {/* Add to cart and see item in stock */}
                    <Col md={3}>
                        <Card>
                            {/* Price */}
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {/* Stock */}
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            <strong>
                                                {product.countInStock > 0
                                                    ? 'In Stock'
                                                    : 'Out Of Stock'}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {/* Quantity selector */}
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                >
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                {/* Add to cart button */}
                                <ListGroup.Item>
                                    <Button
                                        className="btn btn-block"
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                    >
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default ProductScreen;
