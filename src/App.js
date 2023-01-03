import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from './components/PasswordItem'

import './App.css'

const bgColorsArray = [
  'bg-color-1',
  'bg-color-2',
  'bg-color-3',
  'bg-color-4',
  'bg-color-5',
  'bg-color-6',
  'bg-color-7',
  'bg-color-8',
  'bg-color-9',
  'bg-color-10',
]

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsDetailsList: [],
    showPasswords: false,
    searchInput: '',
  }

  getBgColor = () => {
    const shuffledColorsList = bgColorsArray.sort(() => Math.random() - 0.556)
    console.log(shuffledColorsList)
    return shuffledColorsList[0]
  }

  onWebsiteInput = e => this.setState({website: e.target.value})

  onUsernameInput = e => this.setState({username: e.target.value})

  onPasswordInput = e => this.setState({password: e.target.value})

  onFormSubmit = e => {
    e.preventDefault()
    const {website, username, password, passwordsDetailsList} = this.state
    const newPasswordSet = {
      id: uuidv4(),
      website,
      username,
      password,
      bgColorClassName: this.getBgColor(),
    }
    this.setState({
      passwordsDetailsList: [...passwordsDetailsList, newPasswordSet],
      website: '',
      username: '',
      password: '',
    })
  }

  togglePasswordsDisplay = () =>
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))

  deletePasswordItem = id => {
    this.setState(prevState => ({
      passwordsDetailsList: prevState.passwordsDetailsList.filter(
        eachPasswordItem => eachPasswordItem.id !== id,
      ),
    }))
  }

  onSearchInput = e => this.setState({searchInput: e.target.value})

  getPasswordsList = () => {
    const {passwordsDetailsList, searchInput} = this.state
    const searchedResults = passwordsDetailsList.filter(eachPasswordItem =>
      eachPasswordItem.website
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    return searchedResults
  }

  render() {
    const {showPasswords, website, username, password} = this.state
    const searchedResults = this.getPasswordsList()
    console.log(searchedResults)
    return (
      <div className="home-bg-container">
        <div className="all-items-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="page-logo"
          />
          <div className="form-and-image-container">
            <form onSubmit={this.onFormSubmit} className="form">
              <h3 className="form-main-heading">Add New Password</h3>
              <div className="icon-and-input-container">
                <div className="form-input-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="form-input-icon"
                  />
                </div>
                <input
                  onChange={this.onWebsiteInput}
                  value={website}
                  placeholder="Enter Website"
                  className="form-input"
                  type="text"
                />
              </div>
              <div className="icon-and-input-container">
                <div className="form-input-icon-container">
                  <img
                    alt="username"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="form-input-icon"
                  />
                </div>
                <input
                  onChange={this.onUsernameInput}
                  value={username}
                  placeholder="Enter Username"
                  className="form-input"
                  type="text"
                />
              </div>
              <div className="icon-and-input-container">
                <div className="form-input-icon-container">
                  <img
                    alt="password"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="form-input-icon"
                  />
                </div>
                <input
                  onChange={this.onPasswordInput}
                  value={password}
                  placeholder="Enter Password"
                  className="form-input"
                  type="password"
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="add-password-image"
            />
          </div>
          <div className="bottom-container">
            <div className="your-passwords-text-count-search-box">
              <div className="your-passwords-text-and-count">
                <h3 className="your-passwords-text">Your Passwords</h3>
                <p className="passwords-count">{searchedResults.length}</p>
              </div>
              <div className="search-icon-and-search-bar">
                <div className="search-icon-container">
                  <img
                    alt="search"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    className="search-icon"
                  />
                </div>
                <input
                  onChange={this.onSearchInput}
                  className="search-bar"
                  type="search"
                  placeholder="Search"
                />
              </div>
            </div>
            <hr />
            <div className="checkbox-and-label-container">
              <input
                id="togglePasswordsDisplay"
                className="checkbox"
                type="checkbox"
                onChange={this.togglePasswordsDisplay}
              />
              <label
                htmlFor="togglePasswordsDisplay"
                className="show-password-text"
              >
                Show Passwords
              </label>
            </div>
            {searchedResults.length > 0 ? (
              <ul className="all-passwords-list-container">
                {searchedResults.map(eachPassWordDetails => (
                  <PasswordItem
                    passwordDetails={eachPassWordDetails}
                    deletePasswordItem={this.deletePasswordItem}
                    showPasswords={showPasswords}
                    key={eachPassWordDetails.id}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-passwords-container">
                <img
                  className="no-passwords-image"
                  alt="no passwords"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                />
                <p className="no-passwords-text">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
