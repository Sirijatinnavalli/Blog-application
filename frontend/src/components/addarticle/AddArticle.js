import {useContext} from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import loginContext from '../../contexts/LoginContextProvider'

function AddArticle() {
  let { register, handleSubmit } = useForm();
 // let {currentUserDetails}=useContext(loginContext)
  console.log('user data',useOutletContext())
  let {currentUserDetails}=useOutletContext()
  function onPublish(articleObj){
    articleObj.articleId=Date.now()
    articleObj.dateOfCreation=new Date();
    articleObj.dateOfModification=new Date();
    articleObj.username=currentUserDetails.currentUser.username;
    articleObj.comments=[];
    articleObj.status=true;
    console.log(articleObj)
  }

  return (
    <div>
      <p className="display-3 text-center text-secondary">Add New Article</p>
      <form className="w-50 mx-auto mt-3" onSubmit={handleSubmit(onPublish)}>
        {/* title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            {...register("title")}
          />
        </div>
        {/* category */}
        <div className="mb-3">
          <label htmlFor="category">Select a category</label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
              <option value="programming">Programming</option>
              <option value="AI & ML">AI&ML</option>
              <option value="batabase">Database</option>


          </select>
        </div>
        {/* content */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea {...register('content')} id="content"  rows="10" className="form-control"></textarea>
        </div>
        {/* submit */}
        <button type="submit" className="btn btn-success">Publish</button>
      </form>
    </div>
  );
}

export default AddArticle;