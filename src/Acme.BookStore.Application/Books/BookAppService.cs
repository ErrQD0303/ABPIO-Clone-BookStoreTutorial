using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore.Books
{
    public class BookAppService :
        CrudAppService<
            Book,
            BookDto, // Used to show books
            Guid, // Primary Key of the book entity
            PagedAndSortedResultRequestDto, // Used for paging/sorting
            CreateUpdateBookDto>, // Used to create/update a book
        IBookAppService
    {
        public BookAppService(IRepository<Book, Guid> repository) : base(repository)
        {

        }
    }
}