export default interface ICreateCategoryDTO {
  name: string;
  slug: string;
  is_menu?: boolean;
  redirect_page?: string;
  category_parent_id?: string;
}
