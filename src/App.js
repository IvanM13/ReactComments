import './App.css';
import Comments from './components/CommentsList';

function App() {
  return (
    <div>
      <div className='App'>
      <h1>Отзывы</h1>
      </div>
      <Comments currentUserId="1"/>
    </div>
  );
}

export default App;
