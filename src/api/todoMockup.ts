import axios from 'axios';

export default class FakeTodoApi {
  constructor() {}

  //카테고리 조회
  async getCategory() {
    return axios
      .get('/data/categoryMock.json')
      .then((res) =>
        res.data.map(({ memberSeq, todoList, ...item }: any) => item),
      );
  }
  //투두 리스트 조회 (카테고리별)
  async getTodolist() {
    return axios.get('/data/todolistMock.json').then((res) => res.data);
  }
}
