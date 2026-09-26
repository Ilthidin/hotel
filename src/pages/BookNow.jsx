import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import { CalendarDays, Users, Mail, Phone, User, MessageSquare, BedDouble } from "lucide-react";

const inputClass =
  "w-full bg-primary/60 border border-white/10 focus:border-accent/60 outline-none px-4 py-3 text-white text-sm transition-colors placeholder:text-white/20";

const today = () => new Date().toISOString().split("T")[0];

export default function BookNow() {
  const { hotelInfo, rooms } = useContent().content;
  const [searchParams] = useSearchParams();
  const presetRoomSlug = searchParams.get("room");
  const presetRoom = rooms.find((r) => r.slug === presetRoomSlug);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    room: presetRoom ? String(presetRoom.id) : "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    requests: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.room) {
      setError("Please choose a room type.");
      return;
    }
    if (form.checkOut && form.checkIn && form.checkOut <= form.checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }
    setError("");
    setStatus("sending");

    const selectedRoom = rooms.find((r) => String(r.id) === String(form.room));
    const payload = new FormData();
    payload.append("_subject", `New Booking Request — ${form.name}`);
    payload.append("_template", "table");
    payload.append("_captcha", "false");
    payload.append("_next", window.location.href);
    payload.append("Guest Name", form.name);
    payload.append("Email", form.email);
    payload.append("Phone", form.phone);
    payload.append("Room", selectedRoom ? `${selectedRoom.name} ($${selectedRoom.price}/night)` : form.room);
    payload.append("Check-In", form.checkIn);
    payload.append("Check-Out", form.checkOut);
    payload.append("Guests", form.guests);
    payload.append("Special Requests", form.requests || "None");

    try {
      const res = await fetch(`https://formsubmit.co/${hotelInfo.email}`, {
        method: "POST",
        body: payload,
      });
      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          room: "",
          checkIn: "",
          checkOut: "",
          guests: 2,
          requests: "",
        });
      } else {
        setStatus("error");
        setError("Something went wrong sending your request. Please try again or email us directly.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again or email us directly at " + hotelInfo.email + ".");
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/terrace-villa-1920.jpg"
            alt="Reserve your stay"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.4em] uppercase text-accent block mb-4"
          >
            Reservations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl text-white"
          >
            Book Your <span className="italic text-accent">Stay</span>
          </motion.h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
              Tell us a little about your stay and our team will confirm availability
              and send you a personalized offer shortly.
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 border border-accent/30 bg-secondary/30 text-center"
            >
              <span className="text-5xl text-accent block mb-6">✦</span>
              <h2 className="font-heading text-3xl text-white mb-4">Request Sent</h2>
              <p className="text-white/50 mb-8">
                Thank you! Our reservations team will get back to you at{" "}
                <span className="text-white">{form.email || "your email"}</span> within 24 hours.
              </p>
              <Link
                to="/rooms"
                className="inline-block px-8 py-3 bg-accent text-primary text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-all duration-300"
              >
                Browse Rooms
              </Link>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="border border-white/5 bg-secondary/10 p-8 md:p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field
                  label="Full Name"
                  icon={<User className="w-4 h-4 text-white/30" />}
                >
                  <input
                    required
                    type="text"
                    className={inputClass}
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={set("name")}
                  />
                </Field>

                <Field
                  label="Email"
                  icon={<Mail className="w-4 h-4 text-white/30" />}
                >
                  <input
                    required
                    type="email"
                    className={inputClass}
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                </Field>

                <Field
                  label="Phone"
                  icon={<Phone className="w-4 h-4 text-white/30" />}
                >
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder="+30 22860 71234"
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </Field>

                <Field
                  label="Room Type"
                  icon={<BedDouble className="w-4 h-4 text-white/30" />}
                >
                  <select
                    required
                    className={`${inputClass} appearance-none`}
                    value={form.room}
                    onChange={set("room")}
                  >
                    <option value="" className="bg-primary">Select a room…</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id} className="bg-primary">
                        {room.name} — ${room.price}/night
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Check-In"
                  icon={<CalendarDays className="w-4 h-4 text-white/30" />}
                >
                  <input
                    required
                    type="date"
                    min={today()}
                    className={`${inputClass} [color-scheme:dark]`}
                    value={form.checkIn}
                    onChange={set("checkIn")}
                  />
                </Field>

                <Field
                  label="Check-Out"
                  icon={<CalendarDays className="w-4 h-4 text-white/30" />}
                >
                  <input
                    required
                    type="date"
                    min={form.checkIn || today()}
                    className={`${inputClass} [color-scheme:dark]`}
                    value={form.checkOut}
                    onChange={set("checkOut")}
                  />
                </Field>

                <Field
                  label="Guests"
                  icon={<Users className="w-4 h-4 text-white/30" />}
                >
                  <input
                    required
                    type="number"
                    min="1"
                    max="8"
                    className={inputClass}
                    value={form.guests}
                    onChange={set("guests")}
                  />
                </Field>
              </div>

              <div className="mt-6">
                <span className="text-xs tracking-[0.2em] uppercase text-white/50 block mb-2">
                  Special Requests
                </span>
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-white/30 mt-3 shrink-0" />
                  <textarea
                    rows={4}
                    className={`${inputClass} resize-y`}
                    placeholder="Arrival time, bed preferences, celebrations, dietary needs…"
                    value={form.requests}
                    onChange={set("requests")}
                  />
                </div>
              </div>

              {error && (
                <p className="mt-6 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-8 w-full py-4 bg-accent text-primary text-sm tracking-[0.25em] uppercase font-medium hover:bg-accent-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending…" : "Submit Booking Request"}
              </button>

              <p className="text-center text-white/30 text-xs mt-6">
                No payment required now — we confirm availability by email first.
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <span className="text-xs tracking-[0.2em] uppercase text-white/50 block mb-2">
        {label}
      </span>
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}