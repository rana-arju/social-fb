import React from 'react';

const PostError = ({error, setError}) => {
    return (
      <div className="postError">
        <div className='postError_error'>{error}</div>
        <button type="" className="blue_btn" onClick={() => setError("")}>
          Try again
        </button>
      </div>
    );
};

export default PostError;