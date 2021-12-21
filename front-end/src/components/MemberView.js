// component to view 1 single member
import React from 'react';

import axios from 'axios';

class MemberView extends React.Component {
    constructor(props) {
        super(props);
        let _id = window.location.href.split('=')[1]
        this.state = {
            id: _id,
            isLoaded: false
        }
        this.handleDelete = this.handleDelete.bind(this)

    }

    handleDelete(event){
        axios.delete(`/member/${this.state.id}`)
            .then(response=>{
                    // 
                    if(response){
                        window.location.href ='/'
                    }
            }).catch(err=>{

            })
       
    }

    componentDidMount() {
        axios.get(`/member/${this.state.id}`)
            .then(response => { 
                this.setState({
                    name: response.data.name,
                    gender: response.data.gender,
                    yearOfBirth: response.data.yearOfBirth,
                    personalTraining: response.data.personalTraining,
                    facility: {
                        locker: response.data.locker,
                        poor: response.data.poor,
                        shower: response.data.shower
                    },
                    isLoaded: true
                })

            }).catch(err => {


        })
    }

    render() {

            return(
                <div style={{
                    margin: '2rem',
                    textAlign: 'center'
                    
                }}>
                    <p>Name: {this.state.name}</p>
                    <p>Gender: {this.state.gender}</p>
                    <p>Year of birth: {this.state.yearOfBirth}</p>
                    <p>P.T: {this.state.personalTraining ===true? 'Yes' : 'No'}</p>
                    <p>Locker: {this.state.locker ===true? 'Yes' : 'No'}</p>
                    <p>Poor: {this.state.poor ===true? 'Yes' : 'No'}</p>
                    <p>Shower: {this.state.shower ===true? 'Yes' : 'No'}</p>
                    <br />
                    <button onClick={this.handleDelete}>Delete</button>

                </div>
            )
        }

    }


export default MemberView;
