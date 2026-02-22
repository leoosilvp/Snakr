import '../../css/skeleton.css'

const HeaderSkeleton = () => {
  return (
    <header className="header-main header-skeleton">
      <section className="header-content">
        <article className="header-content-left">
          <div className="skeleton-logo shimmer" />

          <span className="breadcrumb">
            <div className="skeleton-breadcrumb shimmer" />
          </span>
        </article>

        <article className="header-content-right">
          <div className="skeleton-search shimmer" />

          <div className="skeleton-icon shimmer" />
          <div className="skeleton-icon shimmer" />

          <div className="skeleton-avatar-header shimmer" />
        </article>
      </section>

      <nav>
        <ul>
          {Array.from({ length: 7 }).map((_, i) => (
            <li key={i}>
              <div className="skeleton-nav-item shimmer" />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default HeaderSkeleton