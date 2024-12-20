using System;
using System.Runtime.CompilerServices;

namespace Acme.BookStore.EntityFrameworkCore
{
    public static class MyModuleInitializer
    {
        [ModuleInitializer]
        public static void Initializer()
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
    }
}