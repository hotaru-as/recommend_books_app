import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
  const [keyword, setKeyword] = useState('')

  const getBooks = () => {
    axios.get(`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404`, {
      params: {
        applicationId: '1097620706195684147',
        keyword: 'typescript'
      }
    })
    .then(res => console.log(res.data))
  }

  return (
    <>
      キーワード
      <input type="text" onChange="{}"></input>
      <button onClick={() => getBooks()}>本日のおすすめ本を見る</button>
    </>
  )
}

export default SearchBooks
