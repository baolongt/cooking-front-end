/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Rating } from '@mui/material';

const Review = (props) => {
  const {
    accountID,
    account: { userName },
    reviewContent,
    rating,
  } = props.data;
  return (
    <Box py={2} display="flex" alignItems="center">
      <Box>
        <Typography variant="subtitle1" component="div">
          <Link to={`/users/${accountID}`} style={{ textDecoration: 'none' }}>
            {userName}
          </Link>
        </Typography>
        <Typography variant="body1">{reviewContent}</Typography>
        <Rating value={rating} precision={0.5} readOnly />
      </Box>
    </Box>
  );
};

export default Review;
