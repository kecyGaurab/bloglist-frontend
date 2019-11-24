import axios from 'axios'
const baseUrl = '/api/blogs'



let token = null

//get the token and adds 'bearer' string
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

// create will take on newObject and add header with authorization property
// that will have token as its key
const create = async(newObj) => {
  const config = {
    headers: { Authorization: token },
  }
  // new object will be posted along with config(with the token that was extracted)
  const response = await axios.post(baseUrl, newObj, config)
  return response.data

}

//update takes in id and newObject to update the blog
const update = async(id, newBlog) => {
  const response  = await axios.put(`${ baseUrl }/${id}`, newBlog)
  return response.data
}

const remove = async(id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response =  await axios.delete(`${baseUrl}/${id}`,config)
  console.log('response', response)
  return response.data

}

export default { getAll, create, update, setToken, remove }