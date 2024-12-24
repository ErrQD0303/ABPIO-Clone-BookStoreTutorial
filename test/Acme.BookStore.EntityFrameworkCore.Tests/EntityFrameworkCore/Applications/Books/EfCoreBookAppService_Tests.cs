using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Acme.BookStore.Books;
using Xunit;

namespace Acme.BookStore.EntityFrameworkCore.Applications.Books
{
    [Collection(BookStoreTestConsts.CollectionDefinitionName)]
    public class EfCoreBookAppService_Tests : BookAppService_Tests<BookStoreEntityFrameworkCoreTestModule>  // Implementations of the BookAppService_Tests abstract class
    {

    }
}