import { Link } from 'react-router-dom';

const continents = [
  {
    name: 'Asia',
    image:
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80',
    query: 'asia',
  },
  {
    name: 'Europe',
    image:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80',
    query: 'europe',
  },
  {
    name: 'Africa',
    image:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80',
    query: 'africa',
  },
  {
    name: 'North America',
    image:
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=600&q=80',
    query: 'north-america',
  },
  {
    name: 'South America',
    image:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80',
    query: 'south-america',
  },
  {
    name: 'Australia & Oceania',
    image:
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=600&q=80',
    query: 'australia-oceania',
  },
  {
    name: 'Antarctica',
    image:
      'https://images.unsplash.com/photo-1551009175-15bdf9dcb580?auto=format&fit=crop&w=600&q=80',
    query: 'antarctica',
  },
];

export default function CountryFlags() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-400 text-sm font-medium mb-5">
            Global Destinations
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Explore the World</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From tropical paradises to ancient wonders, we connect you to destinations
            across every continent.
          </p>
        </div>

        {/* Continent Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {continents.map((continent) => (
            <Link
              key={continent.name}
              to={`/#tours?continent=${continent.query}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
            >
              <img
                src={continent.image}
                alt={continent.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              <div className="absolute inset-0 flex items-end p-4">
                <h3 className="font-semibold text-white text-base sm:text-lg">
                  {continent.name}
                </h3>
              </div>
              <div className="absolute inset-0 border border-white/0 group-hover:border-sky-500/60 rounded-2xl transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
