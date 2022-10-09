export const goToHome = (navigate) => {
	navigate('/');
	localStorage.setItem('token', '');
};

export const goToLogin = (navigate) => {
	navigate('/login');
};

export const goToFeed = (navigate) => {
	navigate('/feed');
};

export const goToRegister = (navigate) => {
	navigate('/register');
};

export const goToShoppingList = (navigate) => {
	navigate('/shopping-list');
};

export const goToProfile = (navigate) => {
	navigate('/profile');
};

export const goToAbout = (navigate) => {
	navigate('/about');
};
