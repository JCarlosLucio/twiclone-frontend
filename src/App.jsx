import { Route, Routes } from 'react-router-dom';

import { Auth } from './Auth';
import { ComposeTweet } from './ComposeTweet';
import { Explore } from './Explore';
import { Feed } from './Feed';
import { Home } from './Home';
import { Profile } from './Profile';
import { TweetDetails } from './TweetDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<Feed />} />
        <Route path="home" element={<Feed />} />
        <Route path="/compose/tweet" element={<ComposeTweet />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/:username/status/:tweetId" element={<TweetDetails />} />
        <Route path="/:username" element={<Profile />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default App;
