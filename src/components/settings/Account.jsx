import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useUpdateUser } from '../../hooks/useUpdateUser'

const DEFAULT_ACCOUNT = {
  profile: {
    username: '',
    name: '',
    bio: '',
    gender: 'male',
    photo: null
  }
}

const Account = () => {
  const { user } = useUser()
  const { updateUser } = useUpdateUser()

  const [account, setAccount] = useState(null)

  useEffect(() => {
    if (!user) return

    setAccount({
      ...DEFAULT_ACCOUNT,
      ...user,
      profile: {
        ...DEFAULT_ACCOUNT.profile,
        ...user.profile
      }
    })
  }, [user])

  if (!account) return null

  const updateSetting = (path, value) => {
    setAccount(prev => {
      const clone = structuredClone(prev)
      const keys = path.split('.')
      let ref = clone

      keys.slice(0, -1).forEach(k => {
        ref[k] ??= {}
        ref = ref[k]
      })

      ref[keys[keys.length - 1]] = value
      return clone
    })

    updateUser(path, value)
  }

  return (
    <section className="settings-account">
      <div className="settings-account-left">
        <h1>Username</h1>
        <input
          type="text"
          value={account.profile.username}
          onChange={e => updateSetting('profile.username', e.target.value)}
        />
        <p>Your primary identifier. Use it so your friends can find you.</p>

        <h1>Name</h1>
        <input
          type="text"
          value={account.profile.name}
          onChange={e => updateSetting('profile.name', e.target.value)}
        />

        <h1>Bio</h1>
        <textarea
          value={account.profile.bio}
          maxLength={295}
          onChange={e => updateSetting('profile.bio', e.target.value)}
        />

        <h1>Gender</h1>
        <select
          value={account.profile.gender}
          onChange={e => updateSetting('profile.gender', e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <section className='delete-account-content'>
          <h1>DANGER AREA!</h1>
          <hr />
          <div className='delete-account'>
            <h2>Delete account</h2>
            <button>Delete</button>
          </div>
          <p>Ao excluir sua conta, todos os seus dados serão permanentemente removidos, incluindo perfil, configurações, biblioteca, histórico e integrações associadas.</p>
          <p>Esta ação não poderá ser desfeita. Após a exclusão, não será possível recuperar sua conta ou qualquer informação vinculada a ela.</p>
        </section>
      </div>

      <div className="settings-account-right">
        <h1>Profile picture</h1>

        {account.profile.photo && (
          <img src={account.profile.photo} alt="Profile picture" />
        )}

        <button>
          <i className="fa-solid fa-pencil" /> Edit
        </button>
      </div>
    </section>
  )
}

export default Account