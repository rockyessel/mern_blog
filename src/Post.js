import React from 'react';

const Post = () => {
  return (
    <div className='post'>
      <div className='image'>
        <img
          src='https://esselr.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F40to7ztv%2Fproduction%2F4e652cfb2da97b8c124806161f0828cee3bd62f6-1617x919.png&w=1080&q=75'
          alt=''
        />
      </div>
      <div className='text'>
        <h2>How To Calculate The Mean Of An Array In Rust</h2>
        <p className='info'>
          <a className='author' href=''>
            Dawid Paszko
          </a>
          <time>2023-01-06 16:45</time>
        </p>
        <p className='summary'>
          To be able to calculate the mean of an array or any data, you first
          have to know how the mean is been calculated. So to simply obtain the
          value of a mean, you have to add all the values in the data set, then
          divide the summation of the data set by the number of the data items,
          inside the data set.
        </p>
      </div>
    </div>
  );
};

export default Post;
