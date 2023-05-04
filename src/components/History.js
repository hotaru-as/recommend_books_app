import React, { useState } from "react";
import BookInfo from "./BookInfo";

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
      <dir>
        <h1>おすすめ履歴</h1>
        {[...recommendedBooks].reverse().map((recommendedBook, index) => 
          <div key={recommendedBook.isbn}>
            {/* <BookInfo bookInfo={recommendedBook} /> */}
            <p>{recommendedBook.date}</p>
            <p>タイトル: {recommendedBook.title}</p>
            <p>著者: {recommendedBook.author}</p>
            <img src={recommendedBook.largeImageUrl} />

            {recommendedBook.isOpenDetail ?
              <>
                <p>{recommendedBook.itemCaption}</p>
                <a href={recommendedBook.itemUrl} target="_blank">購入する</a>

                <label htmlFor="thoughts">感想</label>
                <textarea id="thoughts" 
                  onChange={(evt) => setThoughts(evt.target.value)}
                  defaultValue={recommendedBook.thoughts}>
                </textarea>

                {
                  !recommendedBook.thoughts || recommendedBook.thoughts === "" ? 
                  <button onClick={() => registerThoughts(index)}>感想を登録する</button>
                  : <button onClick={() => registerThoughts(index)}>感想を修正する</button>
                }

                <a onClick={() => showOrHideDetail(index ,false)}>詳細を閉じる</a>
              </>
              : <a onClick={() => showOrHideDetail(index, true)}>詳細を表示する</a>
            }
          </div>
        )}
      </dir>
    </>
  )
}

export default History
