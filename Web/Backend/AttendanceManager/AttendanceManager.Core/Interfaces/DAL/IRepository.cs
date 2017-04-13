using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace AttendanceManager.Core.Interfaces.DAL
{
    public interface IRepository<TModel> where TModel : class
    {
        TModel GetById(long id);
        IQueryable<TModel> GetAll();
        IQueryable<TModel> Query(Expression<Func<TModel, bool>> predicate);
        TModel Add(TModel model);
        TModel Update(TModel model);
        TModel Delete(TModel model);
    }
}
