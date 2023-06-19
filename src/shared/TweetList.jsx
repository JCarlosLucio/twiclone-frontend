import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useInfiniteTweets } from './hooks/useInfiniteTweets';
import { Loading } from './Loading';
import { Tweet } from './Tweet';

export const TweetList = ({ id }) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteTweets(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <InfiniteScroll
      dataLength={data.pages.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Loading />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      style={{ overflow: 'clip' }}
    >
      {data.pages.map((pageData) => {
        return pageData.tweets.map((tweet) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        });
      })}
    </InfiniteScroll>
  );
};

TweetList.propTypes = {
  id: PropTypes.string,
};
