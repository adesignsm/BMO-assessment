import React, {useState, useEffect} from "react";
import axios from "axios";

const BOOK_API = process.env.REACT_APP_STARTER_API;
const COVER_API = process.env.REACT_APP_BOOK_COVER_API;

const defaultImage = "https://nnpbeta.wustl.edu/img/bookCovers/genericBookCover.jpg";

const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const [bookResults, setBookResults] = useState([]);

    const [dataStatus, setDataStatus] = useState(false); //loading status
    const [searchStatus, setSearchStatus] = useState(false); //search status

    useEffect(() => {
        queryData();
    }, [bookResults]);

    const queryData = async () => {

        await axios.get(`${BOOK_API}${searchInput}`)
        .then(response => {

            const data = response.data.docs;
            console.log(data.length);
            setBookResults(data);
            
            if (bookResults.length > 0) {
                setDataStatus(true);
                setSearchStatus(false);
            } else {
                setDataStatus(false);
                setSearchStatus(true);
            }

        }, reason => {
            window.location.reload();
            console.error(reason);
        })
    }

    const handleInput = (e) => {

        if (e.key === "Enter") {    

            setSearchInput(e.target.value);
            e.target.value = "";
        }
    }

    // const filteredData = () => {

    //     console.log("clicked");

    //     queryData();

    //     bookResults.sort((book1, book2) => {
    //         if (book1.title.toLowerCase() < book2.title.toLowerCase()) return -1;
    //         if (book1.title.toLowerCase() > book2.title.toLowerCase()) return 1;
    //         return 0;
    //     }).map((book) => {
    //        return <ul key = {book.key}>
    //             <h1> {book.title}</h1>
    //             <img className = "book-cover" src = { book.cover_i ? `${COVER_API}${book.cover_i}.jpg` : defaultImage}/>
    //             <li> Author: {book.author_name[0]}</li>
    //             <li> Published on {book.publish_date[0]}</li> 
    //         </ul>
    //     })
    // }

    return (
        <> 
            <h1>Search for a book title</h1> 
            <input type = "text" placeholder = "Enter a book" onKeyPress = {e => {handleInput(e)}}/>
            <button> Sort by Alphabetical Order </button>

            {bookResults.length > 0 ? (bookResults.map((book) => {
                return <ul key = {book.key}>
                    <h1> {book.title}</h1>
                    <img className = "book-cover" src = { book.cover_i ? `${COVER_API}${book.cover_i}.jpg` : defaultImage}/>
                    <li> Author: {book.author_name ? book.author_name[0] : null}</li>
                    <li> Published on {book.publish_date[0]}</li> 
                </ul>
            })) :  <h1 style = {{display: searchStatus ? "block" : "none"}}> Sorry that search does not exist </h1>}

            <h1 style = {{display: dataStatus ? "block" : "none"}}> Loading Results </h1>
        </>
    )
}

export default Search;