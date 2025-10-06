import { iconMenus } from '../lib/data'

export default function IconGrid() {
  return (
    <section className="section-container" aria-label="주요 서비스">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {iconMenus.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="card-netflix card-hover p-6 flex flex-col items-center justify-center text-center group"
            aria-label={item.label}
          >
            <div className="text-4xl lg:text-5xl mb-3 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <span className="text-sm lg:text-base font-medium text-neutral-300 group-hover:text-white transition-colors">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
