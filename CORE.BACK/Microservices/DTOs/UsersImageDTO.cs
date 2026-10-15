namespace Microservices.DTOs
{
	public class UsersImageDTO
	{
		public int Id { get; set; }

		public int UserId { get; set; }

		public string Name { get; set; }

		public string Extension { get; set; }

		public bool IsMain { get; set; }

		public byte[] Image { get; set; }

		//public virtual TblUser User { get; set; }

	}
}