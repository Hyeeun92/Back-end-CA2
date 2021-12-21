
import {Link, useNavigate} from 'react-router-dom';
import MemberVirw from './MemberView'
const Member = (props) => {

    let navigate = useNavigate();
    console.log(props);
    let member  = props.member;
    return(
        <div 
        style = {
            {
                border: '2px solid black',
                margin: '5rem',
                marginLeft:'5rem',
                marginRight: '5rem',
                textAlign: 'center', 
                boxShadow: "2px 3px 2px #9E9E9E"} }>
            <p>
            {member.name}
            </p>
            <p>
                <p><Link Link to={"/viewMember?id="+member._id}>View </Link></p>

                <p><Link Link to={`/editMember?id=${member._id}`} >Edit </Link></p>
            </p>
        </div>
  
    )
}

export default Member;