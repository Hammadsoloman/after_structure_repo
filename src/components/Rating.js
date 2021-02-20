import React from 'react';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function RatingScreen(props) {
  console.log('props in Rating', props);

  const [value, setValue] = React.useState(2);
  // if (!props.value) {
  //   return (
  //     <Box component="fieldset" mb={3} borderColor="transparent">
  //       <Typography component="legend">Controlled</Typography>
  //       <Rating
  //         name="simple-controlled"
  //         value={value}
  //         onChange={(event, newValue) => {
  //           setValue(newValue);
  //         }}
  //       />
  //     </Box>
  //   );
  // }

  // if (!props.value) {
  //   return (
  //     <Box component="fieldset" mb={3} borderColor="transparent">
  //       <Typography component="legend">Controlled</Typography>
  //       <Rating
  //         name="simple-controlled"
  //         value={value}
  //         onChange={(event, newValue) => {
  //           setValue(newValue);
  //         }}
  //       />
  //     </Box>
  //   );
  // }

  if (props.value === 1) {
    return (
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Poor</Typography>
        <Rating name="read-only" value={props.value} readOnly />
      </Box>
    );
  }

  if (props.value === 2) {
    return (
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Fair</Typography>
        <Rating name="disabled" value={props.value} disabled />
      </Box>
    );
  }

  if (props.value === 3) {
    return (
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Good</Typography>
        <Rating name="pristine" value={props.value} />
      </Box>
    );
  }

  if (props.value === 4) {
    return (
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Very Good</Typography>
        <Rating name="pristine" value={props.value} />
      </Box>
    );
  }

  if (props.value === 5) {
    return (
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Excelent</Typography>
        <Rating name="pristine" value={null} />
      </Box>
    );
  } else {
    return (
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend" className="colorFont">
          reviews
        </Typography>
        <Rating
          className="colorFont"
          name="simple-controlled"
          value={props.value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
    );
  }

  // return (
  //   <div>

  //   </div>
  // );
}
