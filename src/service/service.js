import axios from 'axios';

const mainUrl = `http://demo.sibers.com/users`

const requestData = () => axios.get(mainUrl).then(res => res.data)

export default {requestData}