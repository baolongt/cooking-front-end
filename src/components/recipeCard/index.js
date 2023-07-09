/* eslint-disable react/prop-types */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { convert } from 'html-to-text';

export default function RecipeCard({
  recipe: { recipeName, recipeImage, description, recipeID },
}) {
  return (
    <Link to={`/recipes/${recipeID}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          cursor: 'pointer',
        }}
      >
        <CardMedia
          component="img"
          alt={recipeName}
          height="140"
          image={recipeImage}
        />
        <CardContent
          sx={{
            minHeight: '10rem',
            maxHeight: '10rem',
            maxWidth: '20rem',
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {recipeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {convert(description)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
