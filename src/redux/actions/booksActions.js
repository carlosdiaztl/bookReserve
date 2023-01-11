import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseConfig";
import { booksTypes } from "../types/booksTypes";

const collectionName = 'books';
const booksCollection = collection(dataBase, collectionName);



export const actionFillBooksAsync = () => {
    return async (dispatch) => {
        const querySnapshot = await getDocs(booksCollection);
        const books = [];
        try {
            querySnapshot.forEach(element => {
                const book = {
                    id: element.id,
                    ...element.data()
                }
                books.push(book)
            });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(actionFillbooksSync(books));

        }
    }
}

const actionFillbooksSync = (books) => {
    return {
        type: booksTypes.BOOKS_FILL,
        payload: books
    }
}


export const actionEditBooksAsync = (bookEdit) => {
    return async (dispatch) => {
        const bookRef = doc(dataBase, collectionName, bookEdit.id)
        try {
            await updateDoc(bookRef, bookEdit);
            dispatch(actionEditBooksSync({
                id: bookRef.id, 
                ...bookEdit
            }))
        } catch (error) {
            console.log(error)
           
        }       
    }
}

const actionEditBooksSync = (bookEdit) => {
    return {
        type: booksTypes.BOOKS_EDIT,
        payload: {...bookEdit}
    }
}

