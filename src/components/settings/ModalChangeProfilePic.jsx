import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useUpdateUser } from '../../hooks/useUpdateUser'

const ModalChangeProfilePic = ({ open, onClose }) => {
  const { user } = useUser()
  const { updateUser } = useUpdateUser()

  const [url, setUrl] = useState(() => user?.profile?.photo || '')

  if (!open) return null

  const handleConfirm = () => {
    if (!url) return
    updateUser('profile.photo', url)
    onClose()
  }

  const handleCancel = () => {
    setUrl(user?.profile?.photo || '')
    onClose()
  }

  return (
    <section className="change-profile-picture">
      <article className="modal-change-profile-picture">
        <header className="modal-change-profile-picture-header">
          <h1>Change Profile Picture</h1>
        </header>

        <section className="modal-change-profile-picture-content">
          <p>
            To update your profile picture, enter the URL of a new image and click
            “Confirm”. If you do not want to make any changes, click “Cancel”.
          </p>

          <ul>
            <li><p>Accepted formats:</p> PNG, JPG, JPEG or GIF</li>
            <li><p>Recommended size:</p> 500 × 500 pixels</li>
          </ul>

          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com/avatar.png"
          />

          <section className="modal-change-profile-picture-btn">
            <button onClick={handleCancel}>Cancel</button>
            <button className="active" onClick={handleConfirm}>
              Confirm
            </button>
          </section>
        </section>
      </article>
    </section>
  )
}

export default ModalChangeProfilePic
