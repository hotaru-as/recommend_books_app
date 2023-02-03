import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
  const [keyword, setKeyword] = useState('')

  const getBooks = () => {
    axios.get(`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404`, {
      params: {
        applicationId: '1097620706195684147',
        keyword: keyword
      }
    })
    .then(res => console.log(res.data))
  }

  const changeKeyword = (value) => {
    setKeyword(value);
    console.log(keyword);
  }

  return (
    <>
    <div>
      <p>キーワード</p>
      <input type="text" onChange={evt => changeKeyword(evt.target.value)}></input>
    </div>
    <div>
      <p>ジャンル</p>
      <input type="text" onChange={evt => changeKeyword(evt.target.value)}></input>
    </div>
    <div>
      <p>金額</p>
      <input type="text" onChange={evt => changeKeyword(evt.target.value)}></input>円
      ～
      <input type="text" onChange={evt => changeKeyword(evt.target.value)}></input>円
    </div>
    <button onClick={() => getBooks()}>本日のおすすめ本を見る</button>
    </>
  )
}

export default SearchBooks
