import React from 'react';

import axios from 'axios';


class MemberEdit extends React.Component{
    constructor(props){
        super(props);

        let _id = window.location.href.split('=')[1]
        this.state = {
            id : _id,
            name : '',
            gender : '',
            personalTraining: '',
            facility : {
                locker: '',
                poor: '',
                shower: ''
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

        axios.get(`/member/${this.state.id}`)
            .then((response) =>{

                this.setState({
                    name : response.data.name,
                    gender : response.data.gender,
                    yearOfBirth: response.data.breed,
                    personalTraining: response.data.personalTraining,
                    facility: {
                        locker: response.data.locker,
                        poor: response.data.poor,
                        shower: response.data.shower,

                    }
                })
            }).catch(err=>{


            })
    }

    handleInputChange(event){

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
        
      
    }

    handleSubmit(event) {
        
        const params = new URLSearchParams()
        params.append('name', this.state.name);
        params.append('gender', this.state.gender);
        params.append('yearOfBirth', this.state.yearOfBirth);
        params.append('personalTraining', this.state.personalTraining);
        params.append('locker', this.state.locker);
        params.append('poor', this.state.poor);
        params.append('shower', this.state.shower);



        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }

        axios.put(`/member/${this.state.id}`, params, config)
            
            .then((response)=>{

                window.location.href = '/'
            }).catch(()=>{

            })

        event.preventDefault();
    }

    render(){

        return(
            <div>

                <form onSubmit={this.handleSubmit}>
                    <label>
                    Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                    Gender:
                    <input type="text" name="gender" value={this.state.gender} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                    Year of birth:
                    <input type="text" name="yearOfBirth" value={this.state.yearOfBirth} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                    Personal Training:
                    <input 
                        type="checkbox" 
                        name="personalTraining"
                        checked={this.state.personalTraining}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Facility
                    </label>
                    <br />
                    <label>
                    Locker:
                    <input 
                        type="checkbox" 
                        name="locker"
                        checked={this.state.locker}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                    Poor:
                    <input 
                        type="checkbox" 
                        name="poor"
                        checked={this.state.poor}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                    Shower:
                    <input 
                        type="checkbox" 
                        name="shower"
                        checked={this.state.shower}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <input type="submit" value="Edit Member" />
                </form>
            </div>
        )
    }
}

export default MemberEdit;
