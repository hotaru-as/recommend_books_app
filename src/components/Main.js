import React, { useState } from 'react';
import Recommend from './Recommend';
import History from './History';
import './Main.css'

const Main = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([])

  return (
    <>
      <header>
        <h1 className='header-title'>本紹介ツール</h1>
        <p>読みたい本のキーワードを入力すると、一日一回おすすめの本を紹介します。</p>
      </header>

      <main>
        <Recommend recommendedBooks={recommendedBooks} setRecommendedBooks={setRecommendedBooks} />

        <History recommendedBooks={recommendedBooks} setRecommendedBooks={setRecommendedBooks}/>
      </main>
    </>
  )
}

export default Main
