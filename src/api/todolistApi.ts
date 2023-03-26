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
  async createCategory(body: TodolistBody) {
    return api
      .post('/api/v1/category/categoryCreate', { ...body })
      .then((res) => console.log(res));
  }
  async modifyCategory(body: TodolistBody) {
    return api
      .put('/api/v1/category/category', { ...body })
      .then((res) => console.log(res));
  }
  async deleteCategory(body: TodolistBody) {
    return api
      .delete('/api/v1/category/category', { data: { ...body } })
      .then((res) => console.log(res));
  }
  async getTodolist(body: TodolistBody) {
    return api
      .post('/api/v1/category/categoryInfo', { ...body })
      .then((res) => res.data.map((item: any) => item.todolist))
      .then((res) => console.log(res));
  }
  async createTodo(body: TodolistBody) {
    return api
      .post('/api/v1/todo/create', { ...body })
      .then((res) => console.log(res));
  }
}