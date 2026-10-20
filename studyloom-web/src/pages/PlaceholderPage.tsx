interface Props {
  id: string
  title: string
}

export default function PlaceholderPage({ id, title }: Props) {
  return (
    <section className="app-screen active" id={`screen-${id}`} aria-label={title}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: 8 }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
        Tela em migração a partir do protótipo.
      </p>
    </section>
  )
}