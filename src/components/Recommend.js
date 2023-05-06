import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBooks from './SearchBooks';
import BookInfo from './BookInfo';

const Recommend = (props) => {
  const recommendedBooks = props.recommendedBooks
  const setRecommendedBooks = props.setRecommendedBooks

  const [genres, setGenres] = useState([])
  const [recommendBookInfo, setRecommendBookInfo] = useState({})
  const [errMsg, setErrMsg] = useState('')
  const [isDoneSelection, setIsDoneSelection] = useState(false)
  const [resultVisibility, setResultVisibility] = useState(false)
  const [todayBookInfo, setTodayBookInfo] = useState({})
  const [readBooks, setReadBooks] = useState([])

  useEffect(() => setInitialRecommendArea(), [])

  const setInitialRecommendArea = () =>
  {
    const recommendedBooks = JSON.parse(localStorage.getItem("recommendedBooks")) || []
    setRecommendedBooks(recommendedBooks)

    const today = getTodayString()
    if(today === recommendedBooks[recommendedBooks.length - 1].date)
    // if(false)
    {
      setIsDoneSelection(true)
      setTodayBookInfo(recommendedBooks[recommendedBooks.length - 1])
    }
    else{
      getBookGenres()
      setIsDoneSelection(false)
    }
  }

  const getBookGenres = () => {
    axios.get(`https://app.rakuten.co.jp/services/api/BooksGenre/Search/20121128`, {
      params: {
        applicationId: '1097620706195684147',
        booksGenreId: '001004',
        formatVersion: '2'
      }
    })
    .then(res => {
      const current = res.data.current
      setGenres([current, ...res.data.children])
    })
  }

  const registerToReadBooks = (bookInfo) => 
  {
    const addedReadBooks = [...readBooks, bookInfo.isbn]
    setReadBooks(addedReadBooks)
    localStorage.setItem("readBooks", JSON.stringify(addedReadBooks))
  }

  const registerToRecommendBooks = () =>
  {
    const latestRecomendBookInfo = {
      ...recommendBookInfo,
      date: getTodayString()
    }

    const newRecommendedBooks = [...recommendedBooks, latestRecomendBookInfo]
    setRecommendedBooks(newRecommendedBooks)
    localStorage.setItem("recommendedBooks", JSON.stringify(newRecommendedBooks))
  }
  
  const getTodayString = () =>
  {
    return (new Date()).toDateString()
  }

  return (
    <>
      <div className='contents'>
        {
          isDoneSelection
          ? (
            <>
              <h2>本日のおすすめ本</h2>
              <p>{todayBookInfo.date}</p>
              <BookInfo bookInfo={todayBookInfo} />
            </>
          )
          : (
            <>
              <h2>本日のおすすめ本を探す</h2>
              <SearchBooks genres={genres} 
              setRecommendBookInfo={setRecommendBookInfo} 
              setResultVisibility={setResultVisibility}
              setErrMsg={setErrMsg} />
            </>
          )
        }

        {
          resultVisibility &&
          (
            <>
              <BookInfo bookInfo={recommendBookInfo} />
              <button onClick={() => registerToReadBooks(recommendBookInfo)}>読んだことがある</button>
              <button onClick={registerToRecommendBooks}>これに決定する</button>
            </>
          )
        }

        <p>{errMsg}</p>
      </div>
    </>
  )
}

export default Recommend
