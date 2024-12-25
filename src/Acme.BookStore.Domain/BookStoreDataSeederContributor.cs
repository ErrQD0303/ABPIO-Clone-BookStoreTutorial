using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Acme.BookStore.Authors;
using Acme.BookStore.Books;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore
{
    // Run DbMigrator to apply the seed data to the database
    public class BookStoreDataSeederContributor : IDataSeedContributor, ITransientDependency
    {
        // For the Book entity, we use the IRepository<Book, Guid> interface
        private readonly IRepository<Book, Guid> _bookRepository;

        // For the Author entity, we use the IAuthorRepository interface and AuthorManager class to use additional methods
        private readonly IAuthorRepository _authorRepository;
        private readonly AuthorManager _authorManager;

        public BookStoreDataSeederContributor(IRepository<Book, Guid> bookRepository, IAuthorRepository authorRepository, AuthorManager authorManager)
        {
            _bookRepository = bookRepository;
            _authorRepository = authorRepository;
            _authorManager = authorManager;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            // Data seeding for the Book entity
            if (await _bookRepository.GetCountAsync() <= 0)
            {

                var seedingBooks = new List<Book> {

                new Book
                {
                    Name = "1984",
                    Type = BookType.Dystopia,
                    PublishDate = new DateTime(1949, 6, 8),
                    Price = 19.84f
                },
                new Book
                {
                    Name = "The Hitchhiker's Guide to the Galaxy",
                    Type = BookType.ScienceFiction,
                    PublishDate = new DateTime(1995, 9, 27),
                    Price = 42.0f
                }
                };

                await _bookRepository.InsertManyAsync(
                    seedingBooks,
                    autoSave: true);
            }

            // Data seeding for the Author entity
            if (await _authorRepository.GetCountAsync() <= 0)
            {
                await _authorRepository.InsertAsync(
                    await _authorManager.CreateAsync(
                        "George Orwell",
                        new DateTime(1903, 06, 25),
                        "Orwell produced literary criticism and poetry, fiction and polemical journalism; and is best known for the allegorical novella Animal Farm (1945) and the dystopian novel Nineteen Eighty-Four (1949)."
                    )
                );

                await _authorRepository.InsertAsync(
                    await _authorManager.CreateAsync(
                        "Douglas Adams",
                        new DateTime(1952, 03, 11),
                        "Douglas Adams was an English author, screenwriter, essayist, humorist, satirist and dramatist. Adams was an advocate for environmentalism and conservation, a lover of fast cars, technological innovation and the Apple Macintosh, and a self-proclaimed 'radical atheist'."
                    )
                );
            }

            // After seeding run the Acme.BookStore.DbMigrator application to apply the seed data to the database
            // Always remember to run the DbMigrator application after adding new seed data instead of migrating the database with Entity Framework Core Update-Database command because that command will not apply the seed data
        }
    }
}