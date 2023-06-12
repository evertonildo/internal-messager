import logo from './logo.svg';
import './App.css';


function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Mensageiro interno
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className='internal'>
        <div className='photo-column'>
          <span class="material-symbols-outlined photo">
            account_circle
          </span> <span class="material-symbols-outlined photo">
            account_circle
          </span> <span class="material-symbols-outlined photo">
            account_circle
          </span> <span class="material-symbols-outlined photo">
            account_circle
          </span> <span class="material-symbols-outlined photo">
            account_circle
          </span> <span class="material-symbols-outlined photo">
            account_circle
          </span> <span class="material-symbols-outlined photo">
            account_circle
          </span> <span class="material-symbols-outlined photo">
            account_circle
          </span> <span class="material-symbols-outlined photo">
            account_circle
          </span> <span class="material-symbols-outlined photo">
            account_circle
          </span>
        </div>
        <div className='internal-body'>
          <div className='div-my-message'>

            <label>&nbsp;</label>
            <label className='my-message'>
              Oi bom dia, Precisamos conversar sobre o novo aplicativo de mensagem interna
              <span className='display-time'>13:17</span></label>


          </div>
          <div className='div-other-message'>
            <label>&nbsp;</label>
            <label className='other-message'>
              Ok, podemos falar sobre isso às 17:00?
            </label>
          </div>
          <div className='div-other-message'>
            <label>&nbsp;</label>
            <label className='other-message'>
              Ok, podemos falar sobre isso às 17:00?
            </label>
          </div>
          <div className='div-other-message'>
            <label>&nbsp;</label>
            <label className='other-message'>
              Ok, podemos falar sobre isso às 17:00?
            </label>
          </div>
          <div className='div-other-message'>
            <label>&nbsp;</label>
            <label className='other-message'>
              Ok, podemos falar sobre isso às 17:00?
            </label>
          </div>
          <div className='div-my-message'>
            <label>&nbsp;</label>
            <label className='my-message'>
              Oi bom dia, Precisamos conversar sobre o novo aplicativo de mensagem interna
            </label>
          </div>
          <div className='div-other-message'>
            <label>&nbsp;</label>
            <label className='other-message'>
              Ok, podemos falar sobre isso às 17:00?
            </label>
          </div>
          <div className='div-my-message'>
            <label>&nbsp;</label>
            <label className='my-message'>
              Oi bom dia, Precisamos conversar sobre o novo aplicativo de mensagem interna
            </label>
          </div>
          <div className='div-other-message'>
            <label>&nbsp;</label>
            <label className='other-message'>
              Ok, podemos falar sobre isso às 17:00?
            </label>
          </div>
          <div className='div-other-message'>
            <label>&nbsp;</label>
            <label className='other-message'>
              Ok, podemos falar sobre isso às 17:00?
            </label>
          </div>
          <div className='div-other-message'>
            <label>&nbsp;</label>
            <label className='other-message'>
              Ok, podemos falar sobre isso às 17:00?
            </label>
          </div>
          <div className='div-other-message'>
            <label>&nbsp;</label>
            <label className='other-message'>
              Ok, podemos falar sobre isso às 17:00?
            </label>
          </div>
          <div className='div-my-message'>
            <label>&nbsp;</label>
            <label className='my-message'>
              Oi bom dia,
            </label>
          </div>
          <div className='div-other-message'>
            <label>&nbsp;</label>
            <label className='other-message'>
              Ok, podemos falar s?
            </label>
          </div>
        </div>
      </div>
      <div className='button-line'>
        <div className='div-button-rigth'>

        </div>
        <input type='text' id='message' placeholder='sua mensagem...'></input>
        <div className='div-button-left'>
          <span class="material-symbols-outlined pointer">
            arrow_right_alt
          </span></div>
      </div>
    </div>
  );
}

export default App;
