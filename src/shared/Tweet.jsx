import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Tweet = ({ tweet }) => {
  return (
    <div style={{ border: '1px solid blue' }}>
      <Link to={`/${tweet.user.username}`}>
        <h3>
          {tweet.user.name}
          <span>{`@${tweet.user.username}`}</span>
        </h3>
      </Link>
      <p>{tweet.content}</p>
      {tweet.images && tweet.images.length > 0 && (
        <img
          style={{ width: '504px' }}
          src={tweet.images[0].url}
          alt="tweet image"
        />
      )}
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
