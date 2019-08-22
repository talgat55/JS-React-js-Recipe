import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from "./Recipe";
import { API_ID, API_KEY } from "./config/config.json";

const App = () => {


    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('chicken');

    const REQ_URI = `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`;


    useEffect(() => {
        getRecipes();
    }, [query]);
    const getRecipes = async () => {
        const response = await fetch(REQ_URI);
        const data = await response.json();
        setRecipes(data.hits);
    };
    const updateSearch = e => {
        setSearch(e.target.value);
        console.log(search);
    };
    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
    };

    return (
        <div className="App">
            <form className="search-from"  onSubmit={getSearch}>
                <input className="search-bar" type="text" name="q" value={search}   onChange={updateSearch}/>
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
            {recipes.map(recipe => (
                <Recipe
                    key={recipe.recipe.label}
                    title={recipe.recipe.label}
                    calories={recipe.recipe.calories}
                    image={recipe.recipe.image}
                />
            ))}
        </div>
    );
};

export default App;
