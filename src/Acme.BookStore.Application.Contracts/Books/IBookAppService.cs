using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.BookStore.Books
{
    public interface IBookAppService : ICrudAppService< // Define CRUD Interface
        BookDto, // Used to show books
        Guid, // Primary Key of the book entity
        PagedAndSortedResultRequestDto, // Used for paging/sorting
        CreateUpdateBookDto> // Used to create/update a book
    {

    }
}