const urls = {
    registerUrl: `https://nighofoods.onrender.com/users/register`,
    fetchUsersUrl: `https://nighofoods.onrender.com/users`,
    fetchGameCategories: `https://nighofoods.onrender.com/games/category`,
    editUserUrl: (id: string) => `https://nighofoods.onrender.com/users/${id}`,
    deleteUserUrl: (id: string) => `https://nighofoods.onrender.com/users/${id}`,
    createGameUrl: `https://nighofoods.onrender.com/games`,
    fetchGamesUrl: `https://nighofoods.onrender.com/games`,
    editGameUrl: (id: string) => `https://nighofoods.onrender.com/games/${id}`,
    deleteGameUrl: (id: string) => `https://nighofoods.onrender.com/games/${id}`,
};
export default urls;
