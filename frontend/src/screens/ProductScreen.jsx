import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Ratings from '../components/Ratings';
import products from '../products';

function ProductScreen() {
    const { id: productId } = useParams();
    const product = products.find((p) => p._id === productId);

    return (
        <>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>

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

                            {/* Add to cart button */}
                            <ListGroup.Item>
                                <Button
                                    className="btn btn-block"
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ProductScreen;
