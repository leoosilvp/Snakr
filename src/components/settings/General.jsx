import { useUser } from '../../hooks/useUser'

const General = () => {

  const { user } = useUser()

  return (
    <section className="settings-general">
      <h1>Theme</h1>
      <select defaultValue={user?.theme}>
        <option value="System">System</option>
        <option value="Light">Light</option>
        <option value="Dark">Dark</option>
      </select>

      <h1>Language</h1>
      <input type="text" value={'Portugues'} />

      <h2>Personalização</h2>
      <h1>Background</h1>
      <input type="text" defaultValue={user?.background || ''} />

    </section>
  )
}

export default General
