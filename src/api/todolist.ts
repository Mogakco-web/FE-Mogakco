import api from './ApiController';

export interface TodolistBody {
  oauthId: string;
  todoTitle?: string;
  categoryName?: string;
  categoryOwn?: string;
  categoryGeu?: string;
  category_name?: string;
}

export default class TodolistApi {
  constructor() {}

  //카테고리 조회
  async getCategory(body: TodolistBody) {
    return api
      .post('/api/v1/category/categoryInfo', { ...body })
      .then((res) =>
        res.data.map(({ memberSeq, todoList, ...item }: any) => item),
      );
  }
  //카테고리 생성
  async createCategory(body: TodolistBody) {
    return api.post('/api/v1/category/categoryCreate', { ...body });
  }
  //카테고리 수정
  async modifyCategory(body: TodolistBody) {
    return api.put('/api/v1/category', { ...body });
  }
  //카테고리 삭제
  async deleteCategory(body: TodolistBody) {
    return api.delete('/api/v1/category', { data: { ...body } });
  }
  //투두 리스트 조회 (카테고리별)
  async getTodolist(id: number) {
    return api
      .get('/api/v1/todo', {
        params: { categorySeq: id },
      })
      .then((res) => res.data);
  }
  //투두 생성
  async createTodo(body: TodolistBody) {
    return api.post('/api/v1/todo/create', { ...body });
  }
  //투두 타이틀 수정
  async modifyTodo(body: TodolistBody) {
    return api.put('/api/v1/todo', { ...body });
  }
  //투두 삭제
  async deleteTodo(body: TodolistBody) {
    return api.delete('/api/v1/todo', { data: { ...body } });
  }
}
