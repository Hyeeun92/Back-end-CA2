//component to view all members

import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Member from './Member';

class Members extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          members: [],
          isLoaded: true
        }

    }

 

    componentDidMount(){

        axios.get('/member')
            .then((response) => {
        
                this.setState( {
                    members: response.data,
                    isLoaded: true
                })
                
            })
            .catch((error)=> {

                this.setState({
                    isLoaded:false,
                    error
                })
                
            })
       
           
    }


    render(){

        const { isLoaded, error, members} = this.state;

        if(!isLoaded){
            return(
                <div>The page is loading or the SERVER is down...</div>
            )

        } else {
            return(
                <div style = {{textAlign: 'center',}}>

                        {members.map(m => {
                            return <Member key={m._id} member={m} />
                        })}

                    <p><Link Link to={'/addMember'}>Add</Link></p>
              </div>  
            )
        }
    }
}
    

export default Members;
