import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Tweet = ({ tweet }) => {
  return (
    <div>
      <Link to={`/${tweet.user.username}`}>
        <h3>
          {tweet.user.name}
          <span>{`@${tweet.user.username}`}</span>
        </h3>
      </Link>
      <img
        style={{ width: '504px' }}
        src={tweet.images[0].url}
        alt="tweet image"
      />
      <p>{tweet.content}</p>
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
