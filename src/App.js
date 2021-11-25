import { Routes, Route } from 'react-router-dom';
import { Auth } from './Auth';
import { Feed } from './Feed';
import { Profile } from './Profile';
import { TweetDetails } from './TweetDetails';
import { Home } from './Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<Feed />} />
        <Route path="home" element={<Feed />} />
        <Route path="/:username/status/:tweetId" element={<TweetDetails />} />
        <Route path="/:username" element={<Profile />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default App;
