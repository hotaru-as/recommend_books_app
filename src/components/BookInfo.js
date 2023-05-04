import React from 'react';

const BookInfo = ({bookInfo}) => {
  return (
    <>
      {
        bookInfo && 
        (<>
          <div>
            <p>タイトル: {bookInfo.title}</p>
            <p>著者: {bookInfo.author}</p>
            <img src={bookInfo.largeImageUrl} />
            <p>{bookInfo.itemCaption}</p>
            <a href={bookInfo.itemUrl} target="_blank">購入する</a>
          </div>
        </>)
      }
    </>
  )
}

export default BookInfo
