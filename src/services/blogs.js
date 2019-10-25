import axios from 'axios'
const baseUrl = '/api/blogs'



let token = null

//get the token and adds 'bearer' string
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// create will take on newObject and add header with authorization property
// that will have token as its key
const create = newObj => {
  const config = {
    headers: { Authorization: token },
  }
  // new object will be posted along with config(with the token that was extracted)
  const request =  axios.post(baseUrl, newObj, config)
  console.log(newObj)
  return request.then(response => response.data)
  
}

//update takes in id and newObject to update the blog 
const update = async (id, newBlog) => {
  const response =  await axios.put(`${ baseUrl } /${id}`, newBlog)
  return response.data

}

export default { getAll, create, update, setToken }