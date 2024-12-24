using System;
using System.Threading.Tasks;
using Acme.BookStore.Books;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.MultiTenancy;

namespace Acme.BookStore;

public class BookStoreTestDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly ICurrentTenant _currentTenant;
    private readonly IRepository<Book, Guid> _bookRepository;

    public BookStoreTestDataSeedContributor(ICurrentTenant currentTenant, IRepository<Book, Guid> bookRepository)
    {
        _currentTenant = currentTenant;
        _bookRepository = bookRepository;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        /* Seed additional test data... */

        using (_currentTenant.Change(context?.TenantId))
        {
            // Example of seeding data
            // You can inject repositories or other services to add data to the database
            // var bookRepository = ...;
            // await bookRepository.InsertAsync(new Book { Title = "Sample Book", Author = "Author Name" });
            if (await _bookRepository.CountAsync<Book>() > 3)
            {
                return;
            }
            var testBooks = new[]
            {
                new Book { Name = "Pride and Prejudice", Type = BookType.Undefined, PublishDate = new DateTime(1813, 1, 28) },
                new Book { Name = "To Kill a Mockingbird", Type = BookType.Undefined, PublishDate = new DateTime(1960, 7, 11) },
                new Book { Name = "Wuthering Heights", Type = BookType.Undefined, PublishDate = new DateTime(1847, 12, 19) }
            };
            _bookRepository?.InsertManyAsync(testBooks, autoSave: true);

            return;
        }
    }
}
