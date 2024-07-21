// import { ThemeContext } from '@emotion/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import { base } from './constants';
import Home from './pages/Home';
const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={`${base}/*`} element={<Home />} />
                    <Route path={`${base}/home`} element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers

