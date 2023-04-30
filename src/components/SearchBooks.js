import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
  const [keyword, setKeyword] = useState('')
  const [genres, setGenres] = useState([])
  const [selectGenreId, setSelectGenreId] = useState('001004')
  const [recommendBookInfo, setRecommendBookInfo] = useState({})
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => getBookGenres(), [])

  const getBooks = async () => {
    setRecommendBookInfo({})

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
      return
    }
    setErrMsg('')

    const recommendBookNum = Math.floor( Math.random() * count );
    const page = Math.ceil(recommendBookNum / 30);
    const index = recommendBookNum % 30 === 0 ? 30 : recommendBookNum % 30;

    const detailData = await axios.get(`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404`, {
      params: {
        applicationId: '1097620706195684147',
        booksGenreId: selectGenreId,
        keyword: keyword,
        page: page
      }
    })

    console.log(detailData.data.Items[index])
    const recommendBookInfo = detailData.data.Items[index].Item
    setRecommendBookInfo(recommendBookInfo)
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

  const changeKeyword = (value) => {
    setKeyword(value);
  }

  return (
    <>
      <label htmlFor="keyword">キーワード</label>
      <input id="keyword" type="text" onChange={evt => changeKeyword(evt.target.value)}></input>

      <label htmlFor="genre">ジャンル</label>
      <select id="genre" onChange={evt => setSelectGenreId(evt.target.value)}>
        {genres.map(genre => <option key={genre.booksGenreId} value={genre.booksGenreId}>{genre.booksGenreName}</option>)}
      </select>

      <button onClick={() => getBooks()}>本日のおすすめ本を見る</button>

      {Object.keys(recommendBookInfo).length !== 0 ? 
        (
          <>
            <p>タイトル: {recommendBookInfo.title}</p>
            <p>著者: {recommendBookInfo.author}</p>
            <img src={recommendBookInfo.largeImageUrl} />
            <p>{recommendBookInfo.itemCaption}</p>
            <a href={recommendBookInfo.itemUrl} target="_blank">購入はこちらから</a>
          </>
        )
        : (
          <>
            <p>{errMsg}</p>
          </>
        )
      }
    </>
  )
}

export default SearchBooks
