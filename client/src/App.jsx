import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ChangePassword from './pages/ChangePassword'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostsDetails from './pages/PostsDetails'
import SavedPost from './pages/SavedPost'
import EditYourPost from './pages/EditYourPost'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
        <Route path='/postdetails/:id' element={<PostsDetails/>}/>
        <Route path='/savedpost/:id' element={<SavedPost/>}/>
        <Route path='/editPost/:id' element={<EditYourPost/>}/>
      </Routes>
    </div>
  )
}

export default App