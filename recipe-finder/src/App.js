import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const App_ID = "2b744056";
  const App_Key = "aab12acb1b897c852b14b33ab988994a";
  const name = "chicken";

  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const search = () => {
    searchForRecipe(inputRef.current.value);
  };

  const searchForRecipe = (query) => {
    inputRef.current.value = "";
    const url = `https://www.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_Key}`;
    setLoading(true);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log(data.hits);
        await setRecipeList(data.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    searchForRecipe(name);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Input-Wrapper">
          <input ref={inputRef} placeholder="Search for recipe" />
          <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        <div className="Wrapper">
          {recipeList.map(({recipe}) => {
            const {label, image, ingredientLines} = recipe;
            return(
            <div className="Ingredient" key={label}>
              <span>{label}</span>
              <img src={image} height="100px" width="100px" />
              <div className="Step">
                {ingredientLines.map((step, index) => (
                    <p key={index}>{step}</p>
                ))}
              </div>
            </div>)}
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
