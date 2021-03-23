import React, { useEffect,useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
const axios = require('axios');


export default function ListModel() {
    
    const [models, setModels] = useState(null);
    
    function UpdateModels(){

        if(models === null){
            return (<ListItem button key = {"default"}>
                        <ListItemText primary="" />
                    </ListItem>)
        }
        return models.map((model) => (
          <ListItem button key = {model.name} id = {model.name} onClick= {(e) => clickMe(e)}>
              <ListItemText primary={model.name} secondary={model.date}/>
          </ListItem>
        ))
  }

  function clickMe(e) {
      console.log("Click")
  }

    useEffect(() => {
        axios.get('/models').then(response => setModels(response.data));
    }, []);

    return(
    <List component="nav" aria-label="model list">
        <UpdateModels /> 
    </List>
    );
}