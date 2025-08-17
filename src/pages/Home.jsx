  import { useEffect, useState } from "react";
  import Modal from "../components/Modal";
  import { motion, useReducedMotion } from "framer-motion";
  import hero from "/hero.jpg";
  import PropTypes from "prop-types";

  export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null); // "tips" | "help" | null
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
      if (showModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [showModal]);

    const fadeUp = {
      initial: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const fade = {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.6 } },
    };

    return (
      <main>
        <section
          aria-label="Hero"
          className="relative min-h-[90vh] md:h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${hero})` }}
          role="img"
          aria-roledescription="decorative background"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

          <div className="relative z-10 px-4 sm:px-6 lg:px-8 w-full">
            <div className="mx-auto max-w-3xl text-center text-white">
              <motion.h1
                {...fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
              >
                Shape Your Future with{" "}
                <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  Expert Career Advice
                </span>
              </motion.h1>

              <motion.p
                {...fade}
                transition={{ delay: 0.2 }}
                className="mt-4 md:mt-5 text-base sm:text-lg md:text-xl text-white/90"
              >
                Connecting students with top mentors and guidance bots for{" "}
                <span className="font-semibold">Madhya Pradesh Govt.</span> opportunities—faster, clearer, and tailored to goals.
              </motion.p>

              <motion.div
                {...fade}
                transition={{ delay: 0.35 }}
                className="mt-6 md:mt-8 flex items-center justify-center gap-3 sm:gap-4"
              >
                <button
                  onClick={() => { setModalType("tips"); setShowModal(true); }}
                  disabled={showModal}
                  className="px-6 py-1 rounded-full bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-emerald-600 active:bg-emerald-400 text-black shadow-lg shadow-blue-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-black transition"
                  aria-haspopup="dialog"
                  aria-expanded={showModal}
                >
                  Get Quick Tips
                </button>

                <a
                  href="#how-it-works"
                  className="px-6 py-1 rounded-full bg-blue-500 hover:bg-blue-700 text-black border border-white/20 backdrop-blur-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60 focus-visible:ring-offset-black"
                >
                  How it works
                </a>
              </motion.div>

              <motion.div
                {...fade}
                transition={{ delay: 0.5 }}
                className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left sm:text-center"
              >
                <Stat label="Mentors" value="120+" />
                <Stat label="Govt. Schemes Covered" value="250+" />
                <Stat label="Avg. Response" value="<24h" className="hidden sm:block" />
              </motion.div>

              <div className="flex justify-center gap-3">
                <div className="mt-6 justify-center">
                  <a
                    href="/Guidance" // change this to your target page/route
                    className="px-9 py-1 rounded-full bg-yellow-600 hover:bg-yellow-800 text-white shadow-lg shadow-blue-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-black transition"
                  >
                    Explore Career Guidance
                  </a>
                </div>
                <div className="mt-6 justify-center">
                  <a
                    href="/Doubt" // change this to your target page/route
                    className="px-9 py-1 rounded-full bg-yellow-600 hover:bg-yellow-800 text-white shadow-lg shadow-blue-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-black transition"
                  >
                    Explore Doubt
                  </a>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            {...fade}
            transition={{ delay: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm"
          >
            
          </motion.div>
        </section>

        <section
          id="highlights"
          className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-white"
          aria-label="Highlights"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6">
              <Feature
                title="Personalized Guidance"
                desc="AI-driven suggestions plus human mentor review tuned for MP exams, jobs, and scholarships."
                icon="🎯"
              />
              <Feature
                title="Actionable Steps"
                desc="Clear next-step plans—eligibility checks, timelines, and document lists."
                icon="✅"
              />
              <Feature
                title="Local Insights"
                desc="Updated with state-level notifications and real timelines from past applicants."
                icon="📍"
              />
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-gray-50"
          aria-label="How it works"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-4 gap-6">
              <Step num="1" title="Tell us your goal" desc="Select exam, role, or scheme interest." />
              <Step num="2" title="Get a quick plan" desc="Receive steps, resources, and mock tests." />
              <Step num="3" title="Talk to a mentor" desc="Clarify doubts with verified experts." />
              <Step num="4" title="Track progress" desc="Milestones and reminders to stay on target." />
            </div>
          </div>
        </section>

        <button
          onClick={() => { setModalType("help"); setShowModal(true); }}
          disabled={showModal}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white shadow-xl px-5 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label="Open help"
        >
          Need Help?
        </button>

        {showModal && (
          <Modal
            onClose={() => { setShowModal(false); setModalType(null); }}
            title={modalType === "help" ? "Need Help" : "Quick Guidance Tip"}
          >
            {modalType === "help" ? (
              <div className="space-y-3">
                <p className="text-gray-700">For assistance contact :</p>
                <p className="text-gray-900 font-semibold break-all">
                  www.AIcareerguidance.com
                </p>
                <p className="text-gray-900 font-semibold">
                  Phone: +112 99461 48167 0383
                </p>
                <a
                  href=""
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Visit Website
                </a>
                {/* Optional clickable phone link */}
                <a
                  href=""
                  className="inline-block mt-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Call now
                </a>
              </div>
            ) : (
              <>
                <p className="font-semibold text-lg text-cyan-600">Career Advice</p>
                <p className="mt-2 text-gray-700">
                  Focus on your strengths, stay informed about MP Govt. opportunities, and believe in your journey.
                </p>
              </>
            )}
          </Modal>
        )}

      </main>
    );
  }

  /* Subcomponents (JSX, no TypeScript) */

  function Stat({ value, label, className = "" }) {
    return (
      <div className={`rounded-xl bg-white/5 border border-white/10 p-4 text-white ${className}`}>
        <div className="text-2xl font-semibold">{value}</div>
        <div className="text-sm text-white/80">{label}</div>
      </div>
    );
  }
  Stat.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  function Feature({ icon, title, desc }) {
    return (
      <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition bg-white">
        <div className="text-2xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{desc}</p>
      </div>
    );
  }
  Feature.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  };

  function Step({ num, title, desc }) {
    return (
      <div className="rounded-2xl bg-white p-6 border border-gray-200">
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {num}
        </div>
        <h4 className="mt-4 font-semibold">{title}</h4>
        <p className="mt-2 text-gray-600">{desc}</p>
      </div>
    );
  }
  Step.propTypes = {
    num: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  };
