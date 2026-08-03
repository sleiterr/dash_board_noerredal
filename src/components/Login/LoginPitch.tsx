const FEATURES = [
  "Team Attendance",
  "Task Calendar",
  "Dark Mode",
  "Real-time Sync",
];

const pitch = [
  {
    title: "Manage your team & schedule",
    titleClass: "font-bold text-secondary text-3xl leading-snug w-[250px]",
  },
  {
    subtitle:
      "Track attendance, assign tasks, and keep your team organised — all in " +
      "one place.",
    subtitleClass: "font-normal text-white/60 text-sm leading-relaxed",
  },
];

const LoginPitch = () => {
  return (
    <>
      <PitchItem />
      <div className="flex flex-wrap gap-2 mt-6">
        {FEATURES.map((i) => (
          <span
            key={i}
            className="font-normal text-[11px] text-white/70 px-3 py-1 rounded-full bg-white/10"
          >
            {i}
          </span>
        ))}
      </div>
    </>
  );
};

const PitchItem = () => {
  return (
    <>
      {pitch.map((item, index) => (
        // use the && for conditional rendering to avoid rendering empty elements
        <div key={index} className="mb-4">
          {item.title && <h4 className={item.titleClass}>{item.title}</h4>}
          {item.subtitle && (
            <p className={item.subtitleClass}>{item.subtitle}</p>
          )}
        </div>
      ))}
    </>
  );
};

export default LoginPitch;
