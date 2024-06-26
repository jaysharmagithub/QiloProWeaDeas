import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField
} from "@mui/material";
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import List from '@mui/material/List';


const Notepad = () => {
  const [listElement, setListElement] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [alert, setAlert] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setListElement([...listElement, inputValue]);
    setInputValue(""); // Clear the input after submission
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addElement = () => {
    if(!inputValue ){
      setAlert("text must be entered");
      setListElement(inputValue)
      return;
    }
    setListElement([...listElement, inputValue]);
    setInputValue(""); // Clear the input after adding an element
    setAlert("");
  };

  const deleteElement = () => {
    if(!listElement.length){
      setAlert("the array's been emptied");
      return;
    }
    console.log(listElement.length)
    listElement.shift();
    setListElement(listElement); // Remove the last element
    setAlert("");
  };

  return (
      <Box sx={{ width: '100%', maxWidth: { lg: '33%', xs: '100%' }, margin: 'auto', marginBottom: '0rem' }}>
        <form onSubmit={handleFormSubmit}>
          {<p>{listElement.length}</p>}
          {alert && <p>{alert}</p>}
          <FormControl fullWidth>
            <TextField
                size="medium"
                id="fullWidth"
                label="Enter an element"
                type="text"
                name="inputValue"
                value={inputValue}
                onChange={handleInputChange}
                fullWidth
            />
            <FormHelperText id="my-helper-text">an element can be a number or a word</FormHelperText>
            <Button color="primary" variant="outlined" type="submit" onClick={addElement} size="medium">
              <AddBoxSharpIcon></AddBoxSharpIcon>   Add
            </Button>
            <Button color="primary" variant="outlined" type="submit" onClick={deleteElement} size="medium">
              <DeleteSharpIcon></DeleteSharpIcon>  Delete
            </Button>
          </FormControl>
        </form>
        <List>{listElement.map((value, index) => (<ListItem key={index} component="div" disablePadding> <ListItemButton>

          <ListItemText primary={value} />
        </ListItemButton></ListItem>))} </List>
          </Box>
    );
};
 export default Notepad;
