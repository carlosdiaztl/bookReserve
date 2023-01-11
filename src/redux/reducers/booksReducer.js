import { booksTypes } from "../types/booksTypes";
const initialState = {
    books: []
};

export const booksReducer = (state = initialState, action) => {

    switch (action.type) {

        case booksTypes.BOOKS_FILL:

            return { ...state, books: [...action.payload]};

        
        case booksTypes.BOOKS_EDIT:
            return{
                ...state,
                books: state.books.map((book)=>{
                    const originalBook = book;
                    if (book.id === action.payload.id){
                        originalBook.titulo = action.payload.titulo;
                        originalBook.descripcion = action.payload.descripcion;
                        originalBook.reserved = action.payload.reserved;
                        originalBook.autor = action.payload.autor;
                        originalBook.image = action.payload.image
                    }
                    return originalBook
                })
            }
        
        default:
            return state;
    }
}