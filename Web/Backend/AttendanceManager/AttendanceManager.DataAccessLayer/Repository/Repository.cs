using System;
using System.Linq;
using System.Linq.Expressions;
using AttendanceManager.Core.Interfaces.DAL;
using AttendanceManager.Core.Interfaces.Entities;
using Microsoft.EntityFrameworkCore;

namespace AttendanceManager.DataAccessLayer.Repository
{
    public class Repository<TModel> : IRepository<TModel> where TModel : class, IEntity
    {
        private readonly IAttendanceManagerContext _dbContext;
        public Repository(IAttendanceManagerContext dbContext)
        {
            _dbContext = dbContext;
        }
        public TModel Add(TModel model)
        {
            _dbContext.Set<TModel>().Add(model);
            return model;
        }
        public TModel Delete(TModel model)
        {
            _dbContext.Set<TModel>().Remove(model);
            return model;
        }
        public TModel GetById(int id)
        {
            return _dbContext.Set<TModel>().Find(id);
        }
        public IQueryable<TModel> GetAll()
        {
            return _dbContext.Set<TModel>();
        }
        public IQueryable<TModel> Query(Expression<Func<TModel, bool>> predicate)
        {
            return GetAll().Where(predicate);
        }
        public TModel Update(TModel model)
        {
            _dbContext.Entry(model).State = EntityState.Modified;
            return model;
        }
    }
}
