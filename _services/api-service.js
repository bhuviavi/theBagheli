import axios from "axios";
const API_URL = "https://55u.598.myftpupload.com/wp-json/wp/v2/";

const getCategories = async () => {
	return axios.get(API_URL + "categories", {});
};

async function getPost(postSlug) {
	let loading = true;
	let post = null;
	let error = null;

	try {
		const response = await axios.get(API_URL + "posts?slug=" + postSlug);
		post = response.data[0];
		loading = false;
	} catch (err) {
		error = err;
		loading = false;
	}

	return { loading, post, error };
}

const getAccountInfo = async () => {
	return axios.get("https://netive-backend.herokuapp.com/api-info/account/", {
		headers: authHeader(),
	});
};

const getIcon = async () => {
	return axios.get(
		"https://api.github.com/repos/FortAwesome/Font-Awesome/contents/svgs/solid"
	);
};

const apiService = {
	getPost,
	getAccountInfo,
	getIcon,
	API_URL,
};

export default apiService;
