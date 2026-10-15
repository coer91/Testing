using HWMX.DotNet;
using Microservices.DTOs;
using Microservices.Interfaces;
using Microsoft.AspNetCore.Http;
using Repositories.Database;
using Repositories.Interfaces;

namespace Microservices.Services
{
	public class UsersImageService(
		IUsersImageRepository _repository,
        IUsersRepository _usersRepository
	) : IUsersImageService { 

        public async Task<ResponseDTO<ImageDTO>> GetUserImage(string user)
		{
			ResponseDTO<ImageDTO> response = new();

			try
			{
                TblUsersImage tblUserImage = await _repository.GetUserImageBy(x => x.User.User.Equals(user));

                if (tblUserImage is null)
                	return response.NotFound();							 

                //Response
                response.Data = new ImageDTO
                {
                    Id = tblUserImage.Id,
                    UserId = tblUserImage.UserId,
                    Name = tblUserImage.Name,
                    Extension = tblUserImage.Extension, 
                    Image = null,
                    Base64 = Files.ToImageBase64(tblUserImage.Image, tblUserImage.Extension)
                };
            }

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


		public async Task<ResponseDTO<ImageDTO>> UploadUserImage(string user, IFormFileCollection fileCollection)
		{
			ResponseDTO<ImageDTO> response = new();

			try
			{
				//Get File
                if (!fileCollection.Any())
                    return response.NotAcceptable($"Image no selected");

				IFormFile image = fileCollection[0];
                string imageName = image.FileName.CleanUpBlanks().ToLower();
                string imageExtension = Files.GetExtension(image);

                if (string.IsNullOrWhiteSpace(imageName))
                    return response.BadRequest();

                //Get User
                TblUser tblUser = await _usersRepository.GetUserBy(x => x.User.Equals(user));

				if (tblUser is null)
					return response.NotFound();

                //Get image
                TblUsersImage tblUserImage = await _repository.GetUserImageBy(x => x.UserId == tblUser.Id); 

                //Create
                if (tblUserImage is null)
				{ 
					tblUserImage = new TblUsersImage
					{
						Id = 0,
						UserId = tblUser.Id,
						Name = imageName,
						Extension = imageExtension,
						Image = Files.ToImageBytes(image) 
					};

                    tblUserImage = Clean.NoNesting(tblUserImage, ["Image"]);
                    tblUserImage = await _repository.CreateUserImage(tblUserImage);
                }

				//Update
				else 
				{ 
                    tblUserImage.Extension = imageExtension;
                    tblUserImage.Image = Files.ToImageBytes(image); 

                    tblUserImage = Clean.NoNesting(tblUserImage, ["Image"]);
                    await _repository.UpdateUserImage(tblUserImage);
                }  

				//Response
				response.Data = new ImageDTO 
				{ 
					Id = tblUserImage.Id,
                    UserId = tblUserImage.UserId,
                    Name = tblUserImage.Name,
                    Extension = tblUserImage.Extension, 
					Image = image,
                    Base64 = Files.ToImageBase64(tblUserImage.Image, tblUserImage.Extension)
                };
            }

			catch (Exception ex)
			{
				return response.Exception(ex);
			}

			return response;
		}


        public async Task<ResponseDTO<string>> DeleteUserImage(string user)
        {
            ResponseDTO<string> response = new();

            try
            { 
                //Get User
                TblUser tblUser = await _usersRepository.GetUserBy(x => x.User.Equals(user));

                if (tblUser is null)
                    return response.NotFound("User not found");

                //Get image
                TblUsersImage tblUserImage = await _repository.GetUserImageBy(x => x.UserId == tblUser.Id);

                if (tblUserImage is null)
                    return response.NotFound($"Image not found");

                //Delete image
                tblUserImage = Clean.NoNesting(tblUserImage, ["Image"]);
                await _repository.DeleteUserImage(tblUserImage);

                response.Data = $"Image deleted successfully";
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        }
    }
}