import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, filterPosts } from './store';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  const posts = useSelector(state => state.posts.filteredPosts);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => dispatch(setPosts(data)));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(filterPosts(searchTerm));
  };

  return (
    <div>
      <h1>Поиск по постам</h1>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Введите заголовок или содержимое"
      />
      <button onClick={handleSearch}>Найти</button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;