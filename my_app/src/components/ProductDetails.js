import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card, CardFooter } from 'react-bootstrap'

export default function ProductDetails() {

const {categoryname, productid} = useParams();
const [product, setProduct] = useState(null);

useEffect(()=>{
    fetchProductDetails();
},[]);

const fetchProductDetails = async () =>{
    try{
        const response = await axios.get(`/categories/${categoryname}/products/${productid}`);
        setProduct(response.ProductDetails)
    }catch(error){
        console.log("Error fetching product details: ", error);
    }
};

if(!product) return <div>Loding ...</div>;

  return (
    
<Container className='my-4'>
    <Row>
        <Col md={6}>
            <img src={`https://via.placeholder.com/300?text=${product.productName}`} alt={product.productName} className='img-fluid' />

        </Col>
        <Col md={6}>
            <Card>
                <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>
                        <strong>Company:</strong>{product.company}<br/>
                        <strong>Category:</strong>{product.category}<br/>
                        <strong>Price:</strong>{product.price}<br/>
                        <strong>Rating:</strong>{product.rating}<br/>
                        <strong>Discount:</strong>{product.discount}<br/>
                        <strong>Availability:</strong>{product.availability}<br/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </Row>
</Container>

  )
}
