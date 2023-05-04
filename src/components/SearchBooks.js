import React, { useState } from 'react';
import axios from 'axios';
import word from './word.js';

const SearchBooks = (props) => {
  const genres = props.genres
  const setRecommendBookInfo = props.setRecommendBookInfo
  const setResultVisibility = props.setResultVisibility
  const setErrMsg = props.setErrMsg

  const [keyword, setKeyword] = useState('')
  const [selectGenreId, setSelectGenreId] = useState('001004')

  const getBooks = async () => {
    console.log("word", word())
    setErrMsg('')
    setResultVisibility(false)

    if (keyword === "")
    {
      setErrMsg('キーワードを入力してください')
      return
    }

    const count = await getInitialInfo(keyword, selectGenreId)
    if (count <= 0)
    {
      return
    }

    var readbooks = JSON.parse(localStorage.getItem("readBooks")) || []
    var recommendedBooks = JSON.parse(localStorage.getItem("recommendedBooks")) || []
    recommendedBooks = recommendedBooks.map(recommendedBook => recommendedBook.isbn)

    var recommendBookInfo = await getRecommendBookInfo(count, keyword, selectGenreId)
    while(recommendBookInfo && (readbooks.indexOf(recommendBookInfo.isbn) >= 0 || recommendedBooks.indexOf(recommendedBooks.isbn) >= 0))
    {
      recommendBookInfo = await getRecommendBookInfo(count, keyword, selectGenreId)
    }

    if (!recommendBookInfo)
    {
      return
    }

    setRecommendBookInfo(recommendBookInfo)
    setResultVisibility(true)
  }

  const getInitialInfo = async (keyword, selectGenreId) =>
  {
    try{
      const firstData = await axios.get(`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404`, {
        params: {
          applicationId: '1097620706195684147',
          booksGenreId: selectGenreId,
          keyword: keyword
        }
      })

      const count = firstData.data.count <= 30*100 ? firstData.data.count : 30*100
      if (count === 0)
      {
        setErrMsg("条件に合う本が見つかりませんでした")
      }

      return count
    }
    catch(e){
      console.log(e.response.status)
      setErrMsg("しばらく待ってから再度実行してください")
      return -1
    }
  }

  const getRecommendBookInfo = async (count, keyword, selectGenreId) =>
  {
    const recommendBookNum = Math.floor( Math.random() * count );
    const page = Math.ceil((recommendBookNum + 1) / 30);
    const index = recommendBookNum % 30;

    try{
      const detailData = await axios.get(`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404`, {
        params: {
          applicationId: '1097620706195684147',
          booksGenreId: selectGenreId,
          keyword: keyword,
          page: page
        }
      })
      const recommendBookInfo = detailData.data.Items[index].Item
      return recommendBookInfo
    }
    catch(e) {
      setErrMsg("しばらく待ってから再度実行してください")
      return null
    }
  }

  return (
    <>
      <p>おすすめしてほしい本のキーワードとジャンルを入力してください</p>
      <label htmlFor="keyword">キーワード</label>
      <input id="keyword" type="text" onChange={evt => setKeyword(evt.target.value)}></input>

      <label htmlFor="genre">ジャンル</label>
      <select id="genre" onChange={evt => setSelectGenreId(evt.target.value)}>
        {genres.map(genre =>
          <option key={genre.booksGenreId} value={genre.booksGenreId}>
            {genre.booksGenreId === '001004'
              ? "全てのジャンル"
              : genre.booksGenreName}
          </option>
        )}
      </select>

      <button onClick={() => getBooks()}>本日のおすすめ本を見る</button>
    </>
  )
}

export default SearchBooks
