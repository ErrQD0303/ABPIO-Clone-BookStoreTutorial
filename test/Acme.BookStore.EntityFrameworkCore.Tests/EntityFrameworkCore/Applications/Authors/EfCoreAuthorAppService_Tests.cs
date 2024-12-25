using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Acme.BookStore.Authors;
using Xunit;

namespace Acme.BookStore.EntityFrameworkCore.Applications.Authors;

[Collection(BookStoreTestConsts.CollectionDefinitionName)] // Collection attribute is used to share the same database for all tests in the class which has the same collection name passed to the attribute
public class EfCoreAuthorAppService_Tests : AuthorAppService_Tests<BookStoreEntityFrameworkCoreTestModule> // Implementations of the AuthorAppService_Tests abstract class and declare the BookStoreEntityFrameworkCoreTestModule as the module which will be used to run the tests
{

}