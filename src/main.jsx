
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import ValueProviderComponent from './components/Context/ValueProviderComponent.jsx';
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById('root')).render(
  <ValueProviderComponent>
    <Provider store={store}>
      <App />
    </Provider>
  </ValueProviderComponent>
);
