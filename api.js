const API_BASE_URL = "http://localhost:8080/api";

async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`Server status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error [${url}]:`, error);
        throw error;
    }
}

// Helper methods
const apiGet = (endpoint) => apiRequest(endpoint, { method: "GET" });
const apiPost = (endpoint, data) => apiRequest(endpoint, { method: "POST", body: JSON.stringify(data) });
const apiPut = (endpoint, data) => apiRequest(endpoint, { method: "PUT", body: JSON.stringify(data) });
const apiDelete = (endpoint) => apiRequest(endpoint, { method: "DELETE" });

const CityAPI = {
    getAll: async () => {
        const response = await fetch('http://localhost:8080/api/cities');
        return await response.json();
    },
    
   add: async (cityData) => {
    const response = await fetch('http://localhost:8080/api/cities', { // Check karo ki port 8080 sahi hai ya nahi
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cityData)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error (${response.status}): ${errorText || response.statusText}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}
};


const SeatAPI = {
    add: (data) => apiPost("/seats", data),
    getByScreen: (screenId) => apiGet(`/seats/screen/${screenId}`),
    getById: (id) => apiGet(`/seats/${id}`)
};

// Movie API
const MovieAPI = {
    add: (data) => apiPost("/movies", data),
    getAll: () => apiGet("/movies"),
    getById: (id) => apiGet(`/movies/${id}`),
    search: (title) => apiGet(`/movies/search?title=${title}`),
    getByGenre: (genre) => apiGet(`/movies/genre/${genre}`),
    getByLanguage: (lang) => apiGet(`/movies/language/${lang}`),
    update: (id, data) => apiPut(`/movies/${id}`, data),
    delete: (id) => apiDelete(`/movies/${id}`)
};

// Theater API
const TheaterAPI = {
    add: (data) => apiPost("/theaters", data),
    getAll: () => apiGet("/theaters"),
    getById: (id) => apiGet(`/theaters/${id}`),
    getByCity: (cityId) => apiGet(`/theaters/city/${cityId}`)
};

// Show API
const ShowAPI = {
    add: (data) => apiPost("/shows", data),
    getAll: () => apiGet("/shows"),
    getById: (id) => apiGet(`/shows/${id}`),
    getByMovie: (movieId) => apiGet(`/shows/movie/${movieId}`)
};

// ================= USER API =================
const UserAPI = {
    register: (data) => apiPost("/users/register", data),
    login: (data) => apiPost("/users/login", data),
    getAll: () => apiGet("/users"),
    getById: (id) => apiGet(`/users/${id}`)
};



// ================= SCREEN API =================
const ScreenAPI = {
    add: (data) => apiPost("/screens", data),
    getAll: () => apiGet("/screens"),
    getById: (id) => apiGet(`/screens/${id}`),
    getByTheater: (theaterId) => apiGet(`/screens/theater/${theaterId}`)
};



// ================= BOOKING API =================
const BookingAPI = {
    create: (data) => apiPost("/bookings", data),
    getById: (id) => apiGet(`/bookings/${id}`),
    getByUser: (userId) => apiGet(`/bookings/user/${userId}`),
    cancel: (id) => apiPut(`/bookings/${id}/cancel`),
    getAvailableSeats: (showId) =>
        apiGet(`/bookings/show/${showId}/available-seats`)
};