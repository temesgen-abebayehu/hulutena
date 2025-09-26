import React from "react";
import {
  FaCalendarCheck,
  FaLanguage,
  FaInfoCircle,
  FaBook,
  FaHeadphones,
  FaVideo,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background image layer (decorative) */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/homeimage.jpeg)' }}
            role="presentation"
            aria-hidden="true"
          />
        </div>
        {/* Gradient overlay for brand coloring and readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-800/75 to-teal-700/70" />
        {/* Subtle highlight holographic pattern */}
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.45), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.35), transparent 60%)'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-32 text-center text-white">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 drop-shadow">
            {t.welcome}
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-4 opacity-95">{t.subtitle}</p>
          <p className="text-xl md:text-2xl font-medium mb-10 opacity-90">{t.commitment}</p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="/appointment" className="px-8 py-4 rounded-full bg-white text-blue-700 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition transform">
              {t.bookAppointment}
            </a>
            <a href="/resources" className="px-8 py-4 rounded-full bg-blue-600/30 backdrop-blur text-white font-semibold border border-white/30 hover:bg-white/15 transition">
              {t.resourcesTitle}
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            icon: <FaCalendarCheck className="text-4xl text-blue-600 mb-4" />,
            title: t.effortlessAppointments,
            desc: t.effortlessAppointmentsDesc
          }, {
            icon: <FaLanguage className="text-5xl text-indigo-600 mb-4" />,
            title: t.multilingualSearch,
            desc: t.multilingualSearchDesc
          }, {
            icon: <FaInfoCircle className="text-4xl text-teal-600 mb-4" />,
            title: t.accessibleInfo,
            desc: t.accessibleInfoDesc
          }].map((f, i) => (
            <div key={i} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500" />
              {f.icon}
              <h3 className="text-xl font-bold text-gray-800 mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources Teaser */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-4">{t.healthcareResources}</h2>
          <p className="text-lg text-gray-600">{t.resourcesDesc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[{
            icon: <FaHeadphones className="text-5xl text-blue-600 mb-6" />, title: t.audioResources, desc: t.audioResourcesDesc, cta: t.exploreAudio, color: 'blue'
          }, {
            icon: <FaVideo className="text-5xl text-green-600 mb-6" />, title: t.videoResources, desc: t.videoResourcesDesc, cta: t.exploreVideos, color: 'green'
          }, {
            icon: <FaBook className="text-5xl text-yellow-500 mb-6" />, title: t.writtenResources, desc: t.writtenResourcesDesc, cta: t.exploreArticles, color: 'yellow'
          }].map((r, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition p-8 flex flex-col items-center text-center border border-gray-100 group">
              {r.icon}
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{r.title}</h3>
              <p className="text-gray-600 mb-6 text-sm md:text-base">{r.desc}</p>
              <a href="/resources" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:shadow-lg hover:scale-105 transition">{r.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-cyan-50 to-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{t.testimonials}</h2>
            <p className="text-lg text-gray-600">{t.testimonialsDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[{
              img: '/patient3.jpg', title: t.lifesaver, desc: t.lifesaverDesc
            }, {
              img: '/patient1.jpg', title: t.understandingHealth, desc: t.understandingHealthDesc
            }, {
              img: '/patient2.jpg', title: t.breakingBarriers, desc: t.breakingBarriersDesc
            }].map((ts, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition flex flex-col items-center text-center border border-gray-100">
                <img src={ts.img} alt="Testimonial" className="w-24 h-24 rounded-full object-cover mb-5 shadow" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{ts.title}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{ts.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,.5), transparent 60%), radial-gradient(circle at 70% 50%, rgba(255,255,255,.4), transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 text-white">
          {/* Heading block centered */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight mb-6">{t.joinCommunity}</h2>
            <p className="text-lg opacity-95 leading-relaxed">{t.joinCommunityDesc}</p>
          </div>
          {/* Full-width responsive card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[{
              title: t.downloadApp, desc: t.downloadAppDesc, href: '#'
            }, {
              title: t.exploreFeatures, desc: t.exploreFeaturesDesc, href: '/resources'
            }, {
              title: t.connectProfessionals, desc: t.connectProfessionalsDesc, href: '/appointment'
            }].map((c, i) => (
              <div key={i} className="flex flex-col bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition shadow-sm hover:shadow-md min-h-[260px]">
                <h3 className="text-2xl font-semibold mb-4">{c.title}</h3>
                <p className="text-sm md:text-base mb-6 leading-relaxed opacity-90 flex-1">{c.desc}</p>
                <a href={c.href} className="inline-block text-sm font-semibold px-6 py-3 rounded-full bg-white text-blue-700 shadow hover:shadow-lg hover:scale-105 transition">
                  {c.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
