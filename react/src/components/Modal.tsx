import React from "react";
import { Book } from "../types/entity";
import { BookType } from "../shared/enums/BookType";

type Props = {
  book: Book | null;
  books: Book[];
  handleEditBook: (event: React.FormEvent<HTMLFormElement>) => void;
  authors: any[];
  handleCloseModal: () => void;
};

function Modal({ book, handleEditBook, authors, handleCloseModal }: Props) {
  const bookTypes = Object.values(BookType)
    .filter((type) => typeof type === "string")
    .map((type, index) => [type, index]);

  const bookPublishDate = new Date(book?.publishDate || "");
  const formattedPublishDate = `${bookPublishDate.getFullYear()}-${(
    bookPublishDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${bookPublishDate
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  return (
    <>
      {!book || !authors ? null : (
        <div id="bookModal" className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Modal Form</h2>
            <form onSubmit={handleEditBook}>
              <input type="hidden" name="bookId" value={book?.id} />
              <div>
                <label htmlFor="name">Book Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={book?.name}
                />
              </div>
              <div>
                <label htmlFor="type">Book Type:</label>
                <select name="type" id="type" defaultValue={book?.type}>
                  {bookTypes.map(([type, index]) => (
                    <option key={index} value={index}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date">Publish Date:</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  defaultValue={formattedPublishDate}
                />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  defaultValue={book?.price}
                />
              </div>
              <div>
                <label htmlFor="author">Author:</label>
                <select
                  name="authorId"
                  id="author"
                  defaultValue={book?.authorId}
                >
                  {authors.map((author: any) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit">Edit Book</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
