import { AlertTriangle, CheckCircle, HelpCircle, Info, Send, X } from "@geist-ui/icons"

const icons = {
  AlertTriangle,
  HelpCircle,
  Info,
  Send,
  CheckCircle
}

const AlertModal = ({ icon, title }) => {
  const IconComponent = icons[icon]

  return (
    <article className="alert-modal">
      {IconComponent && <IconComponent size={16} />}
      <h1>{title}</h1>
    </article>
  )
}

export default AlertModal