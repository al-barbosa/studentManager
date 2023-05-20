export default interface IRequest {
  id: number;
  category_id: number;
  user_id: number;
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    total_time: number;
  };
  category: {
    id: number;
    name: string;
  };
}
