using Microsoft.AspNetCore.Mvc.Filters; 
using Microsoft.AspNetCore.Http; 

namespace HWMX.DotNet
{
    public static class HttpRequest
    { 
        #region ToHttpRequest   

        public static HttpRequestDTO ToHttpRequest(ActionExecutingContext context)
            => ToHttpRequest(context?.HttpContext);


        public static HttpRequestDTO ToHttpRequest(ActionExecutedContext context)
            => ToHttpRequest(context?.HttpContext);


        public static HttpRequestDTO ToHttpRequest(ExceptionContext context)
            => ToHttpRequest(context?.HttpContext);


        public static HttpRequestDTO ToHttpRequest(IHttpContextAccessor httpContextAccessor)
            => ToHttpRequest(httpContextAccessor?.HttpContext);


        public static HttpRequestDTO ToHttpRequest(HttpContext context)
        {
            try
            {
                return context is not null ? new HttpRequestDTO()
                {
                    Project       = Security.ProjectName,
                    Controller    = context.Request.RouteValues.TryGetValue("controller", out var controller) ? controller.ToString() : string.Empty,
                    Method        = context.Request.RouteValues.TryGetValue("action", out var action) ? action.ToString() : string.Empty,
                    UserId        = int.TryParse(Security.GetClaimValue("UserId", context), out var userId) ? userId : 0,
                    User          = context.Request.Headers.TryGetValue("Clien-User", out var user) ? user : Security.GetClaimValue("User", context),
                    RoleId        = int.TryParse(Security.GetClaimValue("RoleId", context), out var roleId) ? roleId : 0,
                    Role          = Security.GetClaimValue("Role", context),
                    PartnerId     = int.TryParse(Security.GetClaimValue("PartnerId", context), out var partnerId) ? partnerId : 0,
                    Partner       = Security.GetClaimValue("Partner", context),
                    Language      = Security.GetClaimValue("Language", context),
                    Factory       = Security.GetClaimValue("Factory", context),
                    UtcOffset     = context.Request.Headers.TryGetValue("Utc-Offset", out var utcOffset) && int.TryParse(utcOffset, out int utcOffsetInteger) ? utcOffsetInteger : 0,
                    JWTExpiration = Security.GetClaimValue("ExpirationDate", context).ToDateTime()
                } : null;
            }

            catch
            {
                return null;
            }
        }

        #endregion 
    }
}