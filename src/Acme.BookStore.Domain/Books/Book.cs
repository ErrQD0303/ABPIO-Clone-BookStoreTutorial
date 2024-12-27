using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Acme.BookStore.Books
{
    public class Book : AuditedAggregateRoot<Guid> // Add Audit Loging Properties like (CreationTime, CreatorId, LastModificationTime, LastModifierId) and Default AggregateRoot Guid
    {
        public string Name { get; set; } = string.Empty;
        public BookType Type { get; set; }
        public DateTime PublishDate { get; set; }
        public float Price { get; set; }

        // many to one relationship
        public Guid AuthorId { get; set; } // DDD best practice: Do not use Navigation Properties in Aggregates
        /* After adding this property, we will need to fix the database's Book data. There are 3 solutions you can do:
        1. If you haven't published your application to the production yet, you can just delete existing books in the database, or you can even delete the entire database in your development environment
        2. You can update the existing data programmatically on data migration or seed phase
        3. You can manuallyhandle it on the database
        => Prefer DROP THE DATABASE */
    }
}