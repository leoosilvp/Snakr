import { useUser } from '../../hooks/useUser'

const Account = () => {

  const { user } = useUser();

  return (
    <section className="settings-account">
      <div className="settings-account-left" >
        <h1>Username</h1>
        <input type="text" value={user?.username} />
        <p>Your primary identifier. Use it so your friends can find you.</p>

        <h1>Name</h1>
        <input type="text" value={user?.name} />
        <p>Your name will be visible to everyone who follows you.</p>

        <h1>Bio</h1>
        <textarea value={user?.bio} maxLength={295} />

        <h1>Country</h1>
        <input type="text" value={user?.country} />
        <p>We use this to recommend events near you.</p>

        <h1>Gender</h1>
        <select value={user?.gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button>Save changes</button>
      </div>
      <div className="settings-account-right">
        <h1>Profile picture</h1>
        <img src={user?.photo} alt="Profile picture" />
        <button><i className="fa-solid fa-pencil" /> Edit</button>
      </div>
    </section>
  )
}

export default Account
