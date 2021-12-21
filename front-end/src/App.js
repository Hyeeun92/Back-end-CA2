
import './App.css';
import Members from './components/Members';
import MemberEdit from './components/MemberEdit';
import MemberView from './components/MemberView';
import MemberAdd from './components/MemberAdd';
import Member from './components/Member';
import {
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Members />} />
        <Route path='/editMember' element={<MemberEdit />} />
        <Route path='/viewMember' element={<MemberView />} />
        <Route path='/addMember' element={<MemberAdd />} />
      </Routes>
    </div>
  );
}

export default App;
