import React, { useEffect, useState } from "react";
import { Badge, Button, Card, FormSelect } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  actionEditBooksAsync,
  actionFillBooksAsync,
} from "../../redux/actions/booksActions";
import "../styles.scss";

const Home = () => {
  const { books } = useSelector((store) => store.booksStore);
  const userStore = useSelector((store) => store.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userStore);
  useEffect(() => {
    dispatch(actionFillBooksAsync());
  }, []);
  const showReserve = (b) => {
    console.log(b);

    // const docRef = doc(dataBase, `books/${b.id}`);

    // console.log(docRef);
    if (b.reserved) {
      const newb = {
        ...b,
        reserved: !b.reserved,
      };

      dispatch(actionEditBooksAsync(newb));
      dispatch(actionFillBooksAsync());
    } else {
      const newb = {
        ...b,
        reserved: !b.reserved,
        by: userStore.name,
      };

      dispatch(actionEditBooksAsync(newb));
      dispatch(actionFillBooksAsync());
    }
  };
  const goDetails =(b)=>{
console.log(b.id);
navigate(`book/${b.id}`)
  }


  return (
    <div className="content">
      <div className="justify-content-center row gap-2 col-12">
        {books && books.length ? (
          books.map((book, index) => (
            <Card key={index} style={{ width: "19rem" }}>
              <Card.Img className="mt-1" variant="top" src={book.image} />
              <Badge bg="warning" text="dark">
                {book.autor}
              </Badge>
              <Card.Body>
                <Card.Title>{book.titulo}</Card.Title>
                <Card.Text>
                  {book.reserved
                    ? `ya reservado por  ${book.by}  `
                    : "disponible"}
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button onClick={()=>{goDetails(book)} }>ver detalles </Button>

                  <Button
                    variant={book.reserved ? "danger" : "success"}
                    size="sm"
                    onClick={() => {
                      showReserve(book);
                    }}
                  >
                    {book.reserved ? `ya reservado` : "reservar"}
                  </Button>
                
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Home;
