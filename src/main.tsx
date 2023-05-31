import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import PageThemes from './components/PageThemes';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import store from './redux/store'
import { Provider } from 'react-redux'
import { worker } from './api/server'
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'

async function start() {
  await worker.start({ onUnhandledRequest: 'bypass' })

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="productDetail" element={<ProductDetail />} >
                  <Route path=":productID" element={<ProductDetail />} />
                </Route>
                <Route path="themes" element={<PageThemes />} />
                <Route path="*" element={<h1> Route Not Found</h1>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

start();