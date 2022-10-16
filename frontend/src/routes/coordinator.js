export const goToHome = (navigate) => {
	navigate('/');
};

export const goToRegister = (navigate) => {
	navigate('/register');
};

export const goToLogin = (navigate) => {
	navigate('/login');
};

export const goToFeed = (navigate) => {
	navigate('/feed');
};

export const goToShoppingList = (navigate) => {
	navigate('/shopping-list');
};

export const goToProfile = (navigate) => {
	navigate('/profile');
};

export const goToLogout = (navigate) => {
	localStorage.removeItem('token');
	localStorage.removeItem('id');
	navigate('/');
};

export const goToAbout = (navigate) => {
	navigate('/about');
};