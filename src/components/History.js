import React, { useState } from "react";
import './History.css'

const History = ({recommendedBooks, setRecommendedBooks}) => {
  const [thoughts, setThoughts] = useState('')

  const registerThoughts = (index) =>
  {
    var modifiedRecommendBooks = [...recommendedBooks]
    modifiedRecommendBooks[index].thoughts = thoughts
    setRecommendedBooks(modifiedRecommendBooks)
    localStorage.setItem("recommendedBooks", JSON.stringify(modifiedRecommendBooks))
    setThoughts('')
  }

  const showOrHideDetail = (reverseIndex, isShown) => {
    const index = (recommendedBooks.length - 1) - reverseIndex
    var modifiedRecommendBooks = [...recommendedBooks]
    modifiedRecommendBooks[index].isOpenDetail = isShown
    setRecommendedBooks(modifiedRecommendBooks)
  }

  return (
    <>
      <dir className='contents'>
        <h2>おすすめ履歴</h2>
        {[...recommendedBooks].reverse().map((recommendedBook, index) => 
          <div key={recommendedBook.isbn}>
            {/* <BookInfo bookInfo={recommendedBook} /> */}
            <p>{recommendedBook.date}</p>

            <div className='book-main-info'>
              <img src={recommendedBook.largeImageUrl} />
              <div className='book-title-author'>
                <h3>{recommendedBook.title}</h3>
                <p>{recommendedBook.author} 著</p>
              </div>
            </div>

            {recommendedBook.isOpenDetail ?
              <>
                <p>{recommendedBook.itemCaption}</p>
                <a href={recommendedBook.itemUrl} target="_blank">購入する</a>

                <div className="thoughts">
                  <label id="thoughts-label" htmlFor="thoughts-form">感想を記入する</label>
                  <textarea id="thoughts-form" 
                    onChange={(evt) => setThoughts(evt.target.value)}
                    defaultValue={recommendedBook.thoughts}>
                  </textarea>

                  {
                    !recommendedBook.thoughts || recommendedBook.thoughts === "" ? 
                    <button onClick={() => registerThoughts(index)}>感想を登録する</button>
                    : <button onClick={() => registerThoughts(index)}>感想を修正する</button>
                  }
                </div>

                <a className="detail-btn" onClick={() => showOrHideDetail(index ,false)}>詳細を閉じる</a>
              </>
              : <a className="detail-btn" onClick={() => showOrHideDetail(index, true)}>詳細を表示する</a>
            }
          </div>
        )}
      </dir>
    </>
  )
}

export default History
