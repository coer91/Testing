using Microsoft.EntityFrameworkCore;
using Repositories.HWMENMES.Database;
using Repositories.HWMENMES.Interfaces; 
using System.Linq.Expressions; 

namespace Repositories.HWMENMES.Repository
{
    /// <summary>
    /// PAGES
    /// </summary>
    public class ESAAUMM_Repository(HWMENMESContext _context) : IESAAUMM_Repository
    {
        public async Task<ESAAUMM> GetPageBy(Expression<Func<ESAAUMM, bool>> expression)
        {
            List<ESAAUMM> entities = await _context.ESAAUMM
               .Where(expression)
               .AsNoTracking()
               .ToListAsync();

            return entities.FirstOrDefault();
        } 
        

        public async Task<List<ESAAUMM>> GetPageList(Expression<Func<ESAAUMM, bool>> expression)
        {
            return await _context.ESAAUMM
                .Where(expression)
                .AsNoTracking()
                .ToListAsync();
        }


        public async Task<List<ESAAUMM>> GetPagesByUser(string user)
        {
            return await (
                from userRole in _context.ESAAURP
                where userRole.USR_ID == user

                join rolePage in _context.ESAAURF
                on userRole.ROLE_CD equals rolePage.ROLE_CD
                into rolePageJOIN
                from rolePage in rolePageJOIN

                join page in _context.ESAAUMM
                on rolePage.MENU_CD equals page.MENU_CD
                into pageJOIN
                from page in pageJOIN
                where page.USE_YN == "Y"

                select new ESAAUMM
                { 
                    MENU_CD    = page.MENU_CD,
                    UP_MENU_CD = page.UP_MENU_CD,
                    LINK_URL   = page.LINK_URL, 
                    SORT_ORD   = page.SORT_ORD, 
                }
            ).ToListAsync();
        }
    }
}
