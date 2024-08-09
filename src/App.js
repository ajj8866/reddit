import './App.css';
import User  from './components/Users/users';

function App() {
  return (
    <div>
      <div id='main-nav'>
        <h1>
          Reddit Snap-It!
        </h1>
        <ul>
          <li>Popular</li>
          <li>Articles</li>
          <li>User Info</li>
        </ul>
      </div>
      <User />
    </div>
  );
};

export default App;
