import React, {useState, useEffect, Fragment} from "react";
import {render, fireEvent } from "@testing-library/react";
import axios from "axios";

const BOOK_API = process.env.REACT_APP_STARTER_API;
const COVER_API = process.env.REACT_APP_BOOK_COVER_API;

//default image for when images do not load in the results
const defaultImage = "https://nnpbeta.wustl.edu/img/bookCovers/genericBookCover.jpg";

const Search = () => {
    const [searchInput, setSearchInput] = useState("");//search input state
    const [bookResults, setBookResults] = useState([]);//book data state
    const [dataStatus, setDataStatus] = useState(false);//loading state

    const [showRawData, setShowRawData] = useState(false);//raw data state
    const [showAlphabeticalData, setShowAlphabeticalData] = useState(false);//alphabetically filtered data
    const [showPublishYearData, setShowPublishYearData] = useState(false);//data filtered by publisj year

    useEffect(() => {
        queryData();
    }, [bookResults]);

    //Query the API with axios
    const queryData = async () => {

       await axios.get(`${BOOK_API}${searchInput}`)
        .then(response => {

            const data = response.data.docs;
            setBookResults(data);
            
            if (bookResults.length > 0) {
                setDataStatus(true);
            } else {
                setDataStatus(false);
            }

        }, reason => {
            console.error(reason);
        })
    }

    //returns raw data
    const RawData = bookResults.map(book => { 
            return <ul key = {book.key}>
                <h1> {book.title}</h1>
                <img alt = {book.title + "cover image"} className = "book-cover" src = { book.cover_i ? `${COVER_API}${book.cover_i}.jpg` : defaultImage}/>
                <li> Author: {book.author_name ? book.author_name[0] : null}</li>
                <li> Published on {book.publish_date[0]}</li> 
            </ul>
        });
    
    //returns filtered data by alphabetical order
    const AlphabeticalData = bookResults.sort((book1, book2) => {
        if (book1.title.toLowerCase() < book2.title.toLowerCase()) return -1;
        if (book1.title.toLowerCase() > book2.title.toLowerCase()) return 1;
        return 0;
    }).map(book => {
        return <ul key = {book.key}>
            <h1> {book.title}</h1>
            <img alt = {book.title + "cover image"} className = "book-cover" src = { book.cover_i ? `${COVER_API}${book.cover_i}.jpg` : defaultImage}/>
            <li> Author: {book.author_name ? book.author_name[0] : null}</li>
            <li> Published on {book.publish_date[0]}</li> 
        </ul>
    })

    //returns data filtered by publish date
    const PublishYearData = bookResults.sort((book1, book2) => {
        return book1.publish_year[0] - book2.publish_year[0];
    }).map(book => {
        return <ul key = {book.key}>
            <h1> {book.title}</h1>
            <img alt = {book.title + "cover image"} className = "book-cover" src = { book.cover_i ? `${COVER_API}${book.cover_i}.jpg` : defaultImage}/>
            <li> Author: {book.author_name ? book.author_name[0] : null}</li>
            <li> Published on {book.publish_date[0]}</li> 
        </ul>
    })
    
    //handle user search input
    const handleInput = (e) => {

        if (e.key === "Enter") {    

            setShowRawData(true);
            setSearchInput(e.target.value);
        }
    }

    //Data filter click events
    const DataFilterClick = () => {
        setShowAlphabeticalData(true);
        setShowRawData(false); 
        setShowPublishYearData(false);
    };

    const PublishYearFilterClick = () => {
        setShowPublishYearData(true); 
        setShowRawData(false)
        setShowAlphabeticalData(false);
    };
    
    //the cloud platform(vercel) I am using to host the project is returning tests as undefined
    // test('It should not return an error', () => {
    //     const {input} = searchInput;
    //     fireEvent.change(input, {target: {value: ' '}})
    //     expect(input.value).toBe(' ');
    // });

    // test("It should return values", () => {
    //     const {input} = searchInput;
    //     fireEvent.change(input, {target: {value: "testing"}});
    //     expect(input.value).toBe(bookResults);
    // });

    return (
        <Fragment> 
            <h1>Search for a book title</h1> 
            <input 
                required 
                autoFocus type = "text"
                placeholder = "Enter a book"
                aria-required = "true" 
                aria-label = "enter book title"  
                aria-placeholder = "Enter a book" 
                onKeyPress = {e => {handleInput(e)}}
            />
            <button aria-label = "click to sort alphabetically" onClick = {DataFilterClick}> alphabetical order </button>
            <button aria-label = "click to sort by published year" onClick = {PublishYearFilterClick}> recent publish year </button>
            <div className = "book-data">
                {showRawData === true && RawData}
                {showAlphabeticalData === true && AlphabeticalData}
                {showPublishYearData  === true && PublishYearData}
            </div>

            <h1 style = {{display: dataStatus ? "block" : "none"}}> Loading Results </h1>
        </Fragment>
    )
}

export default Search;