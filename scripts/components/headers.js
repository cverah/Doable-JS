import { tokenKey } from "../config.js";

export function header() {
  const token = sessionStorage.getItem(tokenKey);
  return `
  <header class="section-xs bg-gray-200">
    <div class="container header">
      <div class="logo">
        <a href="#">
        <p class="black">{do</p>
        <p class="primary-500">able</p>
        <p class="black">}</p>
        </a>
      </div>
      ${
        token
          ? `<div class="logout">
      <a href="#" class="js-logout"><img src="./assets/icons/ban.svg" alt="aqui-img-logout"></a>
    </div> `
          : ""
      }
      
    </div>
    
  </header>
 
  `;
}
