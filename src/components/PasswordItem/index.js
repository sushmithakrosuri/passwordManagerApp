import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePasswordItem, showPasswords} = props
  const {id, website, username, password, bgColorClassName} = passwordDetails

  const onDeleteClick = () => deletePasswordItem(id)

  return (
    <li className="each-password-container">
      <div className={`initial-container ${bgColorClassName}`}>
        <p className="initial">{website[0].toUpperCase()}</p>
      </div>
      <div className="website-username-password-display-container">
        <p className="website-display">{website}</p>
        <p className="username-display">{username}</p>
        {showPasswords ? (
          <p className="password-display">{password}</p>
        ) : (
          <img
            className="masked-password-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button onClick={onDeleteClick} type="button" className="delete-button">
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
