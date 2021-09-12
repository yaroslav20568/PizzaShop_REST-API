import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
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

    const { isAuth } = useSelector(({ user }) => user);

    useEffect(() => {
        dispatch(fetchPizzas(activeCategorie, activeSortBy));
    }, [activeCategorie, activeSortBy]);

    const publicRoutes = [
        {path: '/', component: Auth},
        {path: '/login', component: Login},
        {path: '/register', component: Register}
    ];

    const privateRoutes = [
        {path: '/home', 
            component: 
                <Home 
                    pizzas={pizzas} 
                    isLoaded={isLoaded} 
                    activeCategorie={activeCategorie} 
                    activeSortBy={activeSortBy}  
                />},
        {
            path: '/cart', 
            component: 
                <Cart 
                    items={items} 
                    totalPrice={totalPrice} 
                    totalPizzas={totalPizzas}
                />
        }
    ];
    return (
        <div className="wrapper">
            {
                !isAuth ?
                    <>
                        <div>Пожалуйста зарегестрируйтесь и войдите</div>
                        <Switch>
                            {
                                publicRoutes.map(({ path, component }, index) => 
                                    <Route 
                                        path={path} 
                                        component={component} 
                                        exact 
                                        key={`publicRoutes_${index}`} 
                                    />)
                            }
                            <Redirect to="/" />
                        </Switch>
                    </> :
                    <>
                        <Header totalPrice={totalPrice} totalPizzas={totalPizzas} />
                        <div className="content">
                            <Switch>
                                {
                                    privateRoutes.map(({ path, component }, index) => 
                                    <Route 
                                        path={path} 
                                        exact 
                                        key={`publicRoutes_${index}`} 
                                    >
                                        {component}
                                    </Route>)
                                }
                                <Redirect to="/home" />
                                <Route path="*" exact>
                                    <PageNotFound />
                                </Route>
                            </Switch>
                        </div>
                    </>
            }
        </div>
    );
}

export default App;
