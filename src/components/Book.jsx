import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'


const Book = () => {
    const { books } = useSelector((store) => store.booksStore);
   const {id}= useParams()
   const [book,setBook]=useState([])
   useEffect(() => {
    if (book.length) {
        
        
    }
    else{
        const filtro= books.find(item=>item.id===id)
        console.log(filtro);
        setBook([...book,filtro]);
        console.log(book[0]);
        
    }

        
    
     
   }, [book])
   
   
//    console.log(book);

  return (
    <div className='col-sm-5'>
    {book && book.length?book.map((item,index)=>(


        <Card key={index} >
      <Card.Img style={{ width: '18rem' }} src={item && item.image?item.image:""} />
      <Card.Body>
        <Card.Title>{item && item.autor?item.autor:""} </Card.Title>
        <Card.Text>
          {item && item.descripcion?item.descripcion:""}
        </Card.Text>
        {item && item.autor?item.autor:""}
       
      </Card.Body>
    </Card>
      
    )):"no"}
   
    
    
     </div>
  )
}

export default Book