import React, { FormEventHandler } from "react";
import { useSelector } from "react-redux";
import { getAccessToken, getIdToken } from "../store/authSlice";
import axios from "axios";
import { Book } from "../types/entity";
import { BookType } from "../shared/enums/BookType";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

function Home() {
  const accessToken = useSelector(getAccessToken);
  const [books, setBooks] = React.useState([]);
  const [currentBook, setCurrentBook] = React.useState<Book | null>(null);
  const idToken = useSelector(getIdToken);
  const isModalOpen = currentBook !== null;
  const bookTypes = Object.values(BookType)
    .filter((type) => typeof type === "string")
    .map((type, index) => [type, index]);

  const [authors, setAuthors] = React.useState([]);

  const getBook = React.useCallback(
    async (bookId: string): Promise<Book | null> => {
      try {
        const response = await axios.get(
          `https://localhost:44378/api/app/book/${bookId}`,
          {
            headers: {
              Authorization: accessToken,
              withCredentials: true,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    [accessToken]
  );

  const getBooks = React.useCallback(async () => {
    try {
      const response = await axios.get("https://localhost:44378/api/app/book", {
        headers: {
          Authorization: accessToken,
          withCredentials: true,
        },
      });
      setBooks(response.data.items);
    } catch (error) {
      console.error(error);
    }
  }, [accessToken]);

  const addBook = React.useCallback(
    async (
      name: string,
      type: number,
      publishDate: string,
      price: number,
      authorId: string
    ) => {
      try {
        const response = await axios.post(
          "https://localhost:44378/api/app/book",
          {
            name,
            type,
            publishDate,
            price,
            authorId,
          },
          {
            headers: {
              Authorization: accessToken,
              withCredentials: true,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [accessToken]
  );

  const editBook = React.useCallback(
    async (
      bookId: string,
      name: string,
      type: number,
      publishDate: string,
      price: number,
      authorId: string
    ) => {
      try {
        const response = await axios.put(
          `https://localhost:44378/api/app/book/${bookId}`,
          {
            name,
            type,
            publishDate,
            price,
            authorId,
          },
          {
            headers: {
              Authorization: accessToken,
              withCredentials: true,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    [accessToken]
  );

  const deleteBook = React.useCallback(
    async (bookId: string) => {
      try {
        const response = await axios.delete(
          `https://localhost:44378/api/app/book/${bookId}`,
          {
            headers: {
              Authorization: accessToken,
              withCredentials: true,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [accessToken]
  );

  const onOpenModal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const bookId = button.dataset.bookid;
    if (!bookId) {
      console.error("Book ID is required.");
      return;
    }

    const book = await getBook(bookId);
    setCurrentBook(book);
  };

  const handleDeleteBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const bookId = button.dataset.bookid;
    if (!bookId) {
      console.error("Book ID is required.");
      return;
    }
    await deleteBook(bookId);
    getBooks();
  };

  const onEditBook: FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Extract form fields
    const bookId = formData.get("bookId") as string;
    const name = formData.get("name") as string;
    const type = parseInt(formData.get("type") as string, 10);
    const publishDate = formData.get("date") as string;
    const price = parseFloat(formData.get("price") as string);
    const authorId = formData.get("authorId") as string;

    console.log(bookId, name, type, publishDate, price, authorId);

    // Validate form data
    if (
      !bookId ||
      !name ||
      type === null ||
      type === undefined ||
      type < 0 ||
      !publishDate ||
      !price ||
      !authorId
    ) {
      console.error("All fields are required.");
      return;
    }

    await editBook(bookId, name, type, publishDate, price, authorId);
    setCurrentBook(null);
    getBooks();
  };

  const handleAddBook: FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Extract form fields
    const name = formData.get("name") as string;
    const type = parseInt(formData.get("type") as string, 10);
    const publishDate = formData.get("date") as string;
    const price = parseFloat(formData.get("price") as string);
    const authorId = formData.get("authorId") as string;

    // Validate form data
    if (
      !name ||
      type === null ||
      type === undefined ||
      type < 0 ||
      !publishDate ||
      !price ||
      !authorId
    ) {
      console.error("All fields are required.");
      return;
    }

    await addBook(name, type, publishDate, price, authorId);
    getBooks();
  };

  const onCloseModal = React.useCallback(() => {
    setCurrentBook(null);
  }, []);

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }

    async function getAuthors() {
      try {
        const response = await axios.get(
          "https://localhost:44378/api/app/author",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        setAuthors(response.data.items);
      } catch (error) {
        console.error(error);
      }
    }
    getAuthors();
  }, [accessToken]);

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    // postBooks();
    getBooks();
  }, [accessToken, getBooks]);

  return (
    <div>
      {!accessToken ? (
        <a href="https://localhost:44378/connect/authorize?response_type=code&client_id=React_App&state=a1JJd29jTkxOWWEzU09QQUM0dnRPU0NOX3lySzZMWlh4WUlrLnhzcld3aXhD&redirect_uri=http://localhost:5173/callback&scope=openid offline_access BookStore&code_challenge=oW8HUcYgQXuLytbNVc5L7Sn1AcjTfoPWavn5h5K7Fd4&code_challenge_method=S256&nonce=a1JJd29jTkxOWWEzU09QQUM0dnRPU0NOX3lySzZMWlh4WUlrLnhzcld3aXhD&culture=en&ui-culture=en">
          Account Login
        </a>
      ) : (
        <>
          <div>
            <a
              href={`https://localhost:44378/connect/logout?id_token_hint=${idToken}&post_logout_redirect_uri=http://localhost:5173&culture=en&ui-culture=en`}
            >
              Logout
            </a>
          </div>
          <Link to="/role">Set Role</Link>
          <form onSubmit={handleAddBook}>
            <div>
              <label htmlFor="name">Book Name:</label>
              <input type="text" name="name" id="name" />
            </div>
            <div>
              <label htmlFor="type">Book Type:</label>
              <select name="type" id="type">
                {bookTypes.map(([type, index]) => (
                  <option key={index} value={index}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date">Publish Date:</label>
              <input type="date" name="date" id="date" />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input type="text" name="price" id="price" />
            </div>
            <div>
              <label htmlFor="author">Author:</label>
              <select name="authorId" id="author">
                {authors.map((author: any) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Add New Book</button>
          </form>
        </>
      )}
      {books && books.length > 0 && (
        <>
          <div>-------------------</div>
          <div>Book Collection:</div>
          <div>-------------------</div>
        </>
      )}

      {books && books.length > 0 ? (
        books.map((book: Book) => (
          <div key={book.id}>
            <div>Book Name: {book.name}</div>
            <div>Book Type: {book.type}</div>
            <div>Publish Date: {book.publishDate}</div>
            <div>Book Price: {book.price}</div>
            <div>Author: {book.authorName}</div>
            <button data-bookId={book.id} onClick={onOpenModal}>
              Edit
            </button>
            <button data-bookId={book.id} onClick={handleDeleteBook}>
              Delete
            </button>
            <div>-------------------</div>
            <div>-------------------</div>
          </div>
        ))
      ) : (
        <>
          <div>Home Page</div>
        </>
      )}

      {isModalOpen && (
        <Modal
          key={currentBook?.id}
          book={currentBook}
          books={books}
          handleEditBook={onEditBook}
          authors={authors}
          handleCloseModal={onCloseModal}
        ></Modal>
      )}
    </div>
  );
}

export default Home;
