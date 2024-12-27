using Acme.BookStore.Authors;
using Acme.BookStore.Books;
using AutoMapper;

namespace Acme.BookStore;

public class BookStoreApplicationAutoMapperProfile : Profile
{
    public BookStoreApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
        // Books
        CreateMap<Book, BookDto>(); // Map from Book to BookDto
        CreateMap<CreateUpdateBookDto, Book>(); // Map from UpdateBookDto to Book
        CreateMap<Author, AuthorLookupDto>(); // Map from Author to AuthorLookupDto

        // Authors
        // Because we only Map Author -> AuthorDto, so we don't need to map UpdateAuthorDto -> AuthorDto or CreateAuthorDto -> AuthorDto
        // The References are in BookStoreAppService.cs in Acme.BookStore.Application/Authors folder
        CreateMap<Author, AuthorDto>(); // Map from Author to AuthorDto
    }
}
