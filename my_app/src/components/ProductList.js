import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'


export default function ProductList() {

    const {categoryname} = useParams();
    const [products, setProducts] = useState([]);
    const [ filters, setFilters] = useState({n:10, page :1,sort:'price', order:'asc'});

    useEffect(()=>{
        fetchProducts();
    },[filters]);

    const fetchProducts = async ()=>{
        try{
            const response = await axios.get(`/categories/${categoryname}/products`, {params:filters});
            setProducts(response.data);

        }catch(error){
            console.log('Error fetching products', error);;
        }
    };

    const handleFilterChange = (e) =>{
        setFilters({...filters,[e.target.name] : e.target.value});
    }

  return (
    <Container>
        <h1 className='my-4'>Top Products in {categoryname}</h1>
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId='formGridSort'>
                    <Form.Label>Sort By</Form.Label>
                    <Form.Control as="select" name='sort' value={filters.sort} onChange={handleFilterChange}>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                        <option value="discount">Discount</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='formGridOrder'>
                    <Form.Label>Order</Form.Label>
                    <Form.Control as="select" name='order' value={filters.order} onChange={handleFilterChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='formGridNumber'>
                    <Form.Label>Number of Products</Form.Label>
                    <Form.Control as="select" name='n' value={filters.n} onChange={handleFilterChange}>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='formGridPage'>
                    <Form.Label>Page</Form.Label>
                    <Form.Control as="select" name='page' value={filters.page} onChange={handleFilterChange}>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        </Form>
        <Row>
            {products.map(product =>(
                <Col key={product.productId} sm={12} md={6} lg={4} className='my-3' >
                    <Link to={`/categories/${categoryname}/products/${product.productId}`}>
                        <div className='card'>
                            <img src={`https://via.placeholder.com/150?text=${product.productName}`} className="card-image-top" alt={product.productName} />
                            <div className='card-body'>
                                <h5 className='card-title'>{product.productName}</h5>
                                <p className='card-title'>Price: ${product.price}</p>
                                <p className='card-title'>Rating: ${product.rating}</p>
                                <p className='card-title'>Discount: ${product.discount}</p>
                                <p className='card-title'>Availability: ${product.availibility}</p>
                            </div>
                        </div>
                    </Link>
                </Col>
            ))}
        </Row>
        <div className='d-flex justify-content-between my-4'>
            <Button onClick={()=>setFilters({...filters,page:filters.page-1})} disabled={filters.page===1}>Previous</Button>
            <Button onClick={()=>setFilters({...filters,page:filters.page-1})} disabled={filters.page===1}>Next</Button>
        </div>
    </Container>
  )
}
