import React from 'react';

const BookInfo = ({bookInfo}) => {
  return (
    <>
      {
        bookInfo && 
        (<>
          <div>
            <div className='book-main-info'>
              <img src={bookInfo.largeImageUrl} />
              <div className='book-title-author'>
                <h3>{bookInfo.title}</h3>
                <p>{bookInfo.author} 著</p>
              </div>
            </div>
            <p>{bookInfo.itemCaption}</p>
            <a href={bookInfo.itemUrl} target="_blank">購入する</a>
          </div>
        </>)
      }
    </>
  )
}

export default BookInfo
