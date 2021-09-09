import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { fetchPizzas } from './redux/actions/importActions';
import { Header } from './components/importComponents';
import { Home, Cart, PageNotFound, Auth, Login, Register } from './pages/importPages';

function App() {
    const dispatch = useDispatch();
    const { pizzas, isLoaded, activeCategorie, activeSortBy, items, totalPrice, totalPizzas } = useSelector(({ pizzas, filter, cart }) => ({
        pizzas: pizzas.pizzas,
        isLoaded: pizzas.isLoaded,

        activeCategorie: filter.categorie,
        activeSortBy: filter.sortBy,
        
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalPizzas: cart.totalPizzas
    }));

    useEffect(() => {
        dispatch(fetchPizzas(activeCategorie, activeSortBy));
    }, [activeCategorie, activeSortBy]);

    return (
        <div className="wrapper">
            <Switch>
                    <Route path="/" exact>
                        <Auth />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route> 
                    <Route path="/register" exact>
                        <Register />   
                    </Route>
                    <Route path="/home" exact>
                        <Header totalPrice={totalPrice} totalPizzas={totalPizzas} />
                        <div className="content">
                            <Home
                                pizzas={pizzas}
                                isLoaded={isLoaded}
                                activeCategorie={activeCategorie} 
                                activeSortBy={activeSortBy} 
                            />
                        </div>
                    </Route>
                    <Route path="/cart" exact>
                        <Header totalPrice={totalPrice} totalPizzas={totalPizzas} />
                        <div className="content">
                            <Cart 
                                items={items} 
                                totalPrice={totalPrice} 
                                totalPizzas={totalPizzas} 
                            />
                        </div>
                    </Route>
                    <Route path="*" exact>
                        <Header totalPrice={totalPrice} totalPizzas={totalPizzas} />
                        <div className="content">
                            <PageNotFound />
                        </div>
                    </Route>
            </Switch>
        </div>
    );
}

export default App;
