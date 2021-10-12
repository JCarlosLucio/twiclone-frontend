import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { Tweet } from './Tweet';
import { getTweets } from '../services/tweets';

export const TweetList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery(
      'tweets',
      ({ pageParam = 1 }) => getTweets(pageParam, 10),
      {
        getNextPageParam: (page) =>
          page.currentPage >= page.lastPage ? undefined : page.currentPage + 1,
      }
    );

  if (isLoading) {
    return (
      <Stack direction="row" justifyContent="center" sx={{ padding: '16px' }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <InfiniteScroll
      dataLength={data.pages.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>LOADING...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {data.pages.map((pageData) => {
        return pageData.tweets.map((tweet) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        });
      })}
    </InfiniteScroll>
  );
};
