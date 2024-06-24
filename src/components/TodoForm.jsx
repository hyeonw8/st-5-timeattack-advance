import { useState } from 'react';
import { todoApi } from '../api/todos';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function TodoForm({ fetchData }) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  // TODO: useMutation 으로 리팩터링 하세요.
  const queryClinet = useQueryClient();
  const addMutation = useMutation({
    mutationFn: async (newTodo) => {
      await todoApi.post('/todos', newTodo);
    },
    onSuccess: () => {
      queryClinet.invalidateQueries(['todos']);
    }
  });

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setTitle('');
    setContents('');
  
    const newTodo = {
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      createdAt: Date.now(),
    }

    addMutation.mutate(newTodo);

  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
